import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_ID } from "@env";

const client = sanityClient({
  projectId: SANITY_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// run this to add exception for localhost 3000 CORS policy
//sanity cors add http://localhost:3000

export default client;
