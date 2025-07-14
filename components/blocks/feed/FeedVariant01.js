import { getPosts } from "@/sanity/utils/queries";
import FeedVariant01Client from "./client/FeedVariant01Client";

const FeedVariant01 = async ({ data = {} }) => {
  const feedData = await getPosts(0, 3);
  return (
    <>
      <FeedVariant01Client feedData={feedData} data={data} />
    </>
  );
};

export default FeedVariant01;
