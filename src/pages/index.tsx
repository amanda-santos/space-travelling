import { GetStaticProps } from "next";
import { ReactElement, useState } from "react";
import { PostPreview } from "../components";
import Header from "../components/Header";

import { getPrismicClient } from "../services/prismic";

import commonStyles from "../styles/common.module.scss";
import { PostPreview as PostPreviewType } from "../types";
import styles from "./home.module.scss";

interface PostPagination {
  next_page: string;
  results: PostPreviewType[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const formatPosts = (posts): PostPreviewType[] => {
  return posts.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
};

export default function Home({ postsPagination }: HomeProps): ReactElement {
  const { next_page, results } = postsPagination;

  const [nextPageURL, setNextPageURL] = useState(next_page);
  const [posts, setPosts] = useState(results);

  const handleLoadMorePosts = async (url: string): Promise<void> => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setNextPageURL(data.next_page);
      setPosts([...posts, ...formatPosts(data.results)]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className={commonStyles.container}>
        <div className={styles["posts-container"]}>
          {posts.map(post => (
            <PostPreview key={post.uid} post={post} />
          ))}
          {nextPageURL && (
            <button
              type="button"
              onClick={() => handleLoadMorePosts(nextPageURL)}
            >
              Load more posts
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType("post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    pageSize: 2,
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
