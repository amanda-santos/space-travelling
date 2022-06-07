import * as prismic from "@prismicio/client";
import { HttpRequestLike } from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";

import sm from "../../sm.json";

export interface PrismicConfig {
  req?: HttpRequestLike;
}

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc): string {
  switch (doc.type) {
    case "homepage":
      return "/";
    case "page":
      return `/${doc.uid}`;
    default:
      return null;
  }
}

export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT);

  enableAutoPreviews({
    client,
    req: config.req,
  });

  return client;
}
