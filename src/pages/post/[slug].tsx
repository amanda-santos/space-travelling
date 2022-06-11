import { GetStaticPaths, GetStaticProps } from "next";
import { ReactElement } from "react";

import { Post as PostComponent } from "../../components";
import Header from "../../components/Header";

import { getPrismicClient } from "../../services/prismic";
import { Post as PostType } from "../../types";

interface PostProps {
  post: PostType;
}

const formatPost = (post): PostType => {
  return {
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: {
      title: post.data.title,
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
      <PostComponent post={post} />
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
    pageSize: 2,
  });

  return {
    // PATHS: here we add all the pages paths we want to be preloaded for the user;
    // e.g: most accessed pages, trending pages
    // paths: [{ params: { slug: "jamstack-geleia-de-javascript-api-e-markup" } }],
    paths: [],

    // FALLBACK: if page isn't already statically loaded, do this...
    // true = page makes request to server on client-side, after user opens it; causes layout shift; it's not good for SEO.
    // false = don't do anything, don't send request to server, just show a 404 error.
    // blocking = page makes request to server inside getStaticProps, and only after it renders page for user; doesn't cause layout shift; good for SEO.
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
