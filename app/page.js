"use client";

import React from "react";
import Link from "next/link";
// Utilities
import axios from "axios";

const Home = () => {
	async function comment() {
		const { data } = await axios.post("/api/comment", {
			text: "hello",
			tags: ["typescript"],
		});
		console.log("Debug ~ file: page.js:12 ~ comment ~ data:", data);
	}

	return (
		<div className="flex flex-col gap-8 items-start">
			<Link href="/comments" prefetch={false}>
				See comments
			</Link>
			<button onClick={comment}>make comment</button>
		</div>
	);
};

export default Home;
