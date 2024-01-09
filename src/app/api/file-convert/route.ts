import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const keywords: string | null = data.get("keywords") as string;
    const nameOption: string | null = data.get("nameOption") as string;
    const customName: string | null = data.get("customName") as string;

    if (!file && !keywords) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const value = buffer.toString("utf8").split("\n");
    const filter = value.filter((item) => item.includes(keywords));
    const join = filter.join("\n");
    const fileName = createFileName(file.name, nameOption, customName);

    if (join.length === 0) {
      return NextResponse.json({ success: false });
    }

    const { url } = await put(fileName, join, { access: "public" });
    return NextResponse.json({ success: true, url });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
}

const createFileName = (
  name: string,
  nameOption: string,
  customName: string
) => {
  const type = name.split(".").at(-1);

  if (nameOption === "custom") {
    return `${customName}.${type}`;
  }

  return `filtered.${type}`;
};
