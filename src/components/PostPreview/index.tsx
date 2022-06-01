import { ReactElement } from "react";

import styles from "./post-preview.module.scss";

type PostPreviewProps = {
  post: {
    title: string;
    subtitle: string;
    author: string;
    publicationDate: string;
  };
};

export const PostPreview = ({ post }: PostPreviewProps): ReactElement => {
  const { title, subtitle, author, publicationDate } = post;

  return (
    <div className={styles["post-preview-container"]}>
      <a href="/">{title}</a>
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
