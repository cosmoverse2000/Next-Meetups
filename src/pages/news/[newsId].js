import { useRouter } from "next/router";

const Newsdetail = () => {
  const router = useRouter();

  const newsId = router.query.newsId;
  return <div>newsdetail: {newsId}</div>;
};

export default Newsdetail;
