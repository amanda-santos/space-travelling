import Image from "next/image";
import { ReactElement } from "react";
import { FiClock, FiUser, FiCalendar } from "react-icons/fi";

import { Post as PostType } from "../../types";
import { formatDate } from "../../utils/formatDate";

import styles from "./post.module.scss";

type PostPreviewProps = {
  post: PostType;
};

export const Post = ({ post }: PostPreviewProps): ReactElement => {
  const { data, first_publication_date, reading_time } = post;

  return (
    <article>
      <Image
        src={data.banner.url}
        width={1440}
        height={400}
        objectFit="cover"
        layout="responsive"
      />

      <div className={styles["post-container"]}>
        <h1>{data.title}</h1>
        <div className={styles["metadata-container"]}>
          <span>
            <FiCalendar size={20} title="calendar icon" />
            {formatDate(new Date(first_publication_date))}
          </span>
          <span>
            <FiUser size={20} title="user icon" />
            {data.author}
          </span>
          <span>
            <FiClock size={20} title="clock icon" />
            {reading_time} min
          </span>
        </div>

        <div className={styles["content-container"]}>
          {data.content.map(content => (
            <div key={content.heading}>
              <h2>{content.heading}</h2>
              <div>
                {content.body.map(body => (
                  <p key={body.text}>{body.text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
