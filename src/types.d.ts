type PostData = {
  title: string;
  author: string;
  subtitle: string;
  banner: {
    url: string;
  };
  content: {
    heading: string;
    body: {
      text: string;
    }[];
  }[];
};

export type Post = {
  uid: string;
  first_publication_date: string | null;
  reading_time: number;
  data: PostData;
};

export type PostPreview = {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
};
