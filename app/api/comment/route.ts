import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { redis } from "../../lib/redis";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { text, tags } = body;

		const commentId = nanoid();

		await redis.rpush("comments", commentId);

		await redis.sadd(`tags:${commentId}`, tags);

		const author = req.cookies.get("userId")?.value;

		const comment = {
			text,
			timestamp: new Date(),
			author: author ?? "me",
		};

		await redis.hset(`comment_details:${commentId}`, comment);

		return new Response("Ok");
	} catch (error) {
		console.log("error", error);
	}
}
