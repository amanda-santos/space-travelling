import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Post } from "../../types";

import styles from "./post-preview.module.scss";

type PostPreviewProps = {
  post: Post;
};

export const PostPreview = ({ post }: PostPreviewProps): ReactElement => {
  const router = useRouter();

  const { uid, data, first_publication_date } = post;

  return (
    <div className={styles["post-preview-container"]}>
      <button type="button" onClick={() => router.push(`/post/${uid}`)}>
        <h3>{data.title}</h3>
      </button>
      <p>{data.subtitle}</p>
      <footer>
        <span>
          <img src="/icons/calendar.svg" alt="calendar icon" />
          {first_publication_date}
        </span>
        <span>
          <img src="/icons/user.svg" alt="user icon" />
          {data.author}
        </span>
      </footer>
    </div>
  );
};
