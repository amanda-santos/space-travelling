import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { PostPreview } from "../components";
import Header from "../components/Header";

import { getPrismicClient } from "../services/prismic";

import commonStyles from "../styles/common.module.scss";
import { Post } from "../types";
import { formatDate } from "../utils/formatDate";
import styles from "./home.module.scss";

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): ReactElement {
  const { next_page, results } = postsPagination;

  console.log(next_page, results);

  return (
    <>
      <Header />
      <div className={commonStyles.container}>
        <div className={styles["posts-container"]}>
          {results.map(post => (
            <PostPreview key={post.uid} post={post} />
          ))}
          <button type="button">Carregar mais posts</button>
        </div>
      </div>
    </>
  );
}

const formatPosts = (posts): Post[] => {
  return posts.map(post => {
    return {
      uid: post.uid,
      first_publication_date: formatDate(new Date(post.first_publication_date)),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType("post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    pageSize: 5,
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: formatPosts(postsResponse.results),
      },
    },
  };
};
