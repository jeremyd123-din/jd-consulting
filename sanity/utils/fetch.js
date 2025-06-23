import clientConfig from "../config/clientConfig";
import { createClient } from "next-sanity";
import { dev } from "./helpers";
import { draftMode } from "next/headers";

export { default as groq } from "groq";

export function fetchSanity(query, params, nextOptions = {}) {
  const preview = dev || draftMode().isEnabled;
  const fetchId = Math.random().toString(36).substring(7);

  // console.log(`🚀 [${fetchId}] fetchSanity called:`, {
  //   timestamp: new Date().toISOString(),
  //   tags: nextOptions.tags,
  //   preview,
  // });

  const config = preview
    ? {
        stega: true,
        perspective: "previewDrafts",
        useCdn: false,
        token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
        next: {
          revalidate: 0,
          ...nextOptions,
        },
      }
    : {
        perspective: "published",
        useCdn: false,
        next: {
          revalidate: 15000,
          ...nextOptions,
        },
      };

  console.log(`🏷️  [${fetchId}] Cache config:`, {
    tags: config.next?.tags,
    revalidate: config.next?.revalidate,
    preview,
  });

  return createClient(clientConfig).fetch(query, params, config);
}
