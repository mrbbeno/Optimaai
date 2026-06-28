import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const host = request.headers.get("host") || "";
    const isCue = host.includes("cue.optimaai.eu");
    
    // Choose the right file based on the domain
    const fileName = isCue ? "llms-cue.txt" : "llms-optimaai.txt";
    const filePath = path.join(process.cwd(), "public", fileName);
    
    const content = await fs.readFile(filePath, "utf-8");
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error reading llms.txt:", error);
    return new NextResponse("LLMs file not found.", { status: 404 });
  }
}
