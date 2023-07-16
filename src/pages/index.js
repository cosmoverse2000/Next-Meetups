import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A first Meetup",
//     image:
//       "https://images.hindustantimes.com/tech/img/2020/09/24/960x540/Untitled_design_(12)_1600925482551_1600925492949.png",
//     address: "some address 10, 375732some city",
//     description: "This is second desc",
//   },
//   {
//     id: "m2",
//     title: "A first Meetup",
//     image:
//       "https://images.hindustantimes.com/tech/img/2020/09/24/960x540/Untitled_design_(12)_1600925482551_1600925492949.png",
//     address: "some address 10, 375732some city",
//     description: "This is second desc",
//   },
// ];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="This ia s meetup app you should explore this you would know things"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  const client = MongoClient.connect(process.env.MONGO_CON_URL_CLOUD);

  const db = (await client).db();

  const meetupsCollection = db.collection(process.env.MONGO_DB_NAME);
  const result = await meetupsCollection.find().toArray();
  // console.log("resp from mongo List", result);

  (await client).close();

  return {
    props: {
      meetups: result.map((each) => {
        return {
          id: each._id.toString(),
          title: each.title,
          image: each.image,
          address: each.address,
        };
      }),
    },
    revalidate: 1,
  };
};
// export const getServerSideProps = async (context) => {
//   // const res = context.res;
//   // const req = context.req;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default HomePage;
