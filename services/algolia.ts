import algoliasearch from "algoliasearch";

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID || "",
  process.env.ALGOLIA_API_KEY || ""
);

export default algolia;
