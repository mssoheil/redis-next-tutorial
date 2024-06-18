"use client";

import React, { useEffect, useRef } from "react";
import { redis } from "../lib/redis";
import Link from "next/link";

const Page = () => {
	const comments = useRef();

	useEffect(() => {
		let commentIds;
		(async () => {
			commentIds = await redis.lrange("comments", 0, 3);
		})();

		(async () => {
			const comments = await Promise.all([
				commentIds.map(async (commentId) => {
					const details = await redis.hgetall(`comment_details:${commentId}`);
					const tags = await redis.smembers(`tags:${commentId}`);

					return {
						commentId,
						details,
						tags,
					};
				}),
			]);
			comments.current = comments;
		})();
	}, []);

	return (
		<div className="flex flex-col gap-8">
			<Link href="/">Home page</Link>
			{comments.current?.map((comment) => {
				<div className="flex flex-col gap-2">
					<h1>{comment.details.author}</h1>
				</div>;
			})}
		</div>
	);
};

export default Page;
