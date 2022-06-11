import Link from "next/link";
import { ReactElement } from "react";

import { PostPreview as PostPreviewType } from "../../types";
import { formatDate } from "../../utils/formatDate";

import styles from "./post-preview.module.scss";

type PostPreviewProps = {
  post: PostPreviewType;
};

export const PostPreview = ({ post }: PostPreviewProps): ReactElement => {
  const { uid, data, first_publication_date } = post;

  return (
    <article className={styles["post-preview-container"]}>
      <Link href={`/post/${uid}`}>
        <h3>{data.title}</h3>
      </Link>
      <p>{data.subtitle}</p>
      <footer>
        <span>
          <img src="/icons/calendar.svg" alt="calendar icon" />
          {formatDate(new Date(first_publication_date))}
        </span>
        <span>
          <img src="/icons/user.svg" alt="user icon" />
          {data.author}
        </span>
      </footer>
    </article>
  );
};
