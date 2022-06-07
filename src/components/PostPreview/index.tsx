import { useRouter } from "next/router";
import { ReactElement } from "react";

import styles from "./post-preview.module.scss";

type PostPreviewProps = {
  post: {
    slug: string;
    title: string;
    subtitle: string;
    author: string;
    publicationDate: string;
  };
};

export const PostPreview = ({ post }: PostPreviewProps): ReactElement => {
  const router = useRouter();

  const { slug, title, subtitle, author, publicationDate } = post;

  return (
    <div className={styles["post-preview-container"]}>
      <button type="button" onClick={() => router.push(`/post/${slug}`)}>
        <h3>{title}</h3>
      </button>
      <p>{subtitle}</p>
      <footer>
        <span>
          <img src="/icons/calendar.svg" alt="calendar icon" />
          {publicationDate}
        </span>
        <span>
          <img src="/icons/user.svg" alt="user icon" />
          {author}
        </span>
      </footer>
    </div>
  );
};
