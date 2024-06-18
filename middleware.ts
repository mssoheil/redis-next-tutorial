import { NextResponse } from "next/server";
// Utilities
import { nanoid } from "nanoid";
// Types
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const userId = req.cookies.get("userId");

	const res = NextResponse.next();

	if (!userId) {
		res.cookies.set("userId", nanoid());
	}

	return res;
}

export const config = {
	matcher: ["/((?!api|static|_next/img|favicon.ico).*)"],
};
