import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { PostPreview } from "../components";
import Header from "../components/Header";

import { getPrismicClient } from "../services/prismic";

import commonStyles from "../styles/common.module.scss";
import styles from "./home.module.scss";

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): ReactElement {
  const post = {
    title: "Como utilizar Hooks",
    subtitle: "Pensando em sincronização em vez de ciclos de vida.",
    author: "John Doe",
    publicationDate: "15 Mar 2021",
  };

  return (
    <>
      <Header />
      <div className={commonStyles.container}>
        <div className={styles["posts-container"]}>
          <PostPreview post={post} />
          <PostPreview post={post} />
          <PostPreview post={post} />
          <PostPreview post={post} />
          <button type="button">Carregar mais posts</button>
        </div>
      </div>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
