"use server";
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";
import { GetQuestionsParams } from "./shared.types";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    // const { searchQuery, filter, page = 1, pageSize = 20 } = params;

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const createQuestion = async (params: any) => {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        // 没有找到就创建tag,字段name是tag变量，同时tag的questions数组中加入question的id
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        // upsert:true,表示没有找到就创建
        // new：true，表示返回更新后的文档，而不是查询条件匹配的原始文档
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    //   给question中加入tag
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    console.log("path:", path);
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};
