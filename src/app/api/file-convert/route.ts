import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

  const fileName = () => {
    const type = file.name.split(".").at(-1);

    if (nameOption === "custom") {
      return `${customName}.${type}`;
    }

    return `filtered.${type}`;
  };

  fs.writeFileSync(`./public/${fileName()}`, join);

  return NextResponse.json({ success: true, fileName: fileName() });
}
