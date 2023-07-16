import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </>
  );
};
export const getStaticPaths = async () => {
  const client = MongoClient.connect(process.env.MONGO_CON_URL_CLOUD);

  const db = (await client).db();

  const meetupsCollection = db.collection(process.env.MONGO_DB_NAME);
  const result = await meetupsCollection
    .find({}, { _id: 1, title: 0, image: 0, address: 0, description: 0 })
    .toArray();
  // console.log("resp from mongo PATHS", result);

  (await client).close();
  return {
    fallback: true,
    paths: result.map((each) => {
      return {
        params: {
          meetupId: each._id.toString(),
        },
      };
    }),
  };
};

export const getStaticProps = async (context) => {
  const params = context.params.meetupId;
  // console.log(params);

  const client = MongoClient.connect(process.env.MONGO_CON_URL_CLOUD);

  const db = (await client).db();

  const meetupsCollection = db.collection(process.env.MONGO_DB_NAME);
  const result = await meetupsCollection.findOne({ _id: new ObjectId(params) });
  // console.log("resp from mongo MongoDetail", result);

  (await client).close();

  return {
    props: {
      image: result.image,
      title: result.title,
      address: result.address,
      description: result.description,
    },
  };
};

export default MeetupDetails;
