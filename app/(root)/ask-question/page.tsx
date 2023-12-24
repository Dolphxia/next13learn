import React from "react";
import Questions from "@/components/forms/Questions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

const AskQuestion = async () => {
  // const { userId } = auth();

  // if (!userId) redirect("/sign-in");

  // const mongoUser = await getUserById({ userId });

  // console.log("mongoUser:", mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        {/* <Questions mongoUserId={JSON.stringify(mongoUser._id)} /> */}
        <Questions mongoUserId={JSON.stringify(34343434)} />
      </div>
    </div>
  );
};

export default AskQuestion;
