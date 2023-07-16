//api/new-meetup
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    // console.log(data);

    const client = MongoClient.connect(process.env.MONGO_CON_URL_CLOUD);

    const db = (await client).db();

    const meetupsCollection = db.collection(process.env.MONGO_DB_NAME);
    const result = await meetupsCollection.insertOne(data);
    // console.log("resp from mongo", result);

    (await client).close();
    res.status(201).json({ message: "Meetup Inserted" });
  }
};

export default handler;
