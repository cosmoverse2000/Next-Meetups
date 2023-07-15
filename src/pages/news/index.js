import Link from "next/link";

const news = () => {
  return (
    <>
      <ul>
        <div>NEWS</div>
        <li>
          <Link href="/news/news1">News 1</Link>
        </li>
        <li>
          <Link href="/news/news2">News 2</Link>
        </li>
        <li>
          <Link href="/news/news3">News 3</Link>
        </li>
      </ul>
    </>
  );
};

export default news;
