import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetup = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredData) => {
    // console.log(enteredData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log("response from back", data);

    // router.push("/");
  };
  return (
    <>
      <Head>
        <title>Add new meetups</title>
        <meta
          name="description"
          content="This form is to add new meetup, exoore of nextapp it functionality etc on the same page"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
