import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
	const filename = request.nextUrl.pathname.split('/').pop();
	if (!filename) {
		return new Response("File name is required", { status: 400 });
	}

	// TODO: Here you would typically fetch the file from your storage or database
	// For demonstration, we'll just return a placeholder response
	return new Response(`Requested file: ${filename}`, {
		headers: { "Content-Type": "text/plain" },
	});
}