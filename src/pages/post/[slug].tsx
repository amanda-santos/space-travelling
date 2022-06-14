import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "prismic-dom";
import { ReactElement } from "react";

import { Post as PostComponent } from "../../components";
import Header from "../../components/Header";

import { getPrismicClient } from "../../services/prismic";
import { Post as PostType } from "../../types";

interface PostProps {
  post: PostType;
}

const getReadingTime = (content: PostType["data"]["content"]): number => {
  const totalPostWords = content.reduce(
    (
      total: number,
      currentValue: {
        heading: string;
        body: {
          text: string;
        }[];
      }
    ) => {
      const totalHeadWords = currentValue.heading.split(" ").length;
      const totalBodyWords = RichText.asText(currentValue.body).split(
        " "
      ).length;

      return total + totalHeadWords + totalBodyWords;
    },
    0
  );

  const AVERAGE_WORDS_READ_BY_MINUTE = 200;

  const readingTime = Math.ceil(totalPostWords / AVERAGE_WORDS_READ_BY_MINUTE);

  return readingTime;
};

const formatPost = post => {
  return {
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    // reading_time: getReadingTime(post.data.content),
    data: {
      title: post.data.title,
      subtitle: post.data.subtitle,
      banner: {
        url: post.data.banner.url,
      },
      author: post.data.author,
      content: post.data.content,
    },
  };
};

export default function Post({ post }: PostProps): ReactElement {
  return (
    <>
      <Header />
      <PostComponent
        post={{ ...post, reading_time: getReadingTime(post.data.content) }}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType("post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    pageSize: 1,
  });

  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID("post", String(slug), {});

  const post = formatPost(response);

  return {
    props: { post },
    revalidate: 60 * 30, // 30 minutes
  };
};
