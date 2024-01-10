import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { keywordsSplitWithRegex } from "@/helpers/keyword-regex";
import { createFileName } from "@/helpers/create-file-name";
import { TLengthOption } from "@/atoms/search-form-atoms";

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const file: File | null = data.get("file") as unknown as File;
    const keywords: string | null = data.get("keywords") as string;

    const nameOption: string | null = data.get("nameOption") as string;
    const customName: string | null = data.get("customName") as string;
    const fileName = createFileName(file.name, nameOption, customName);

    const lengthOption = data.get("lengthOption") as TLengthOption;
    const customLength: string | null = data.get("customLength") as string;

    if (!file && !keywords) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const value = buffer.toString("utf8").split("\n");

    let resultFile;

    resultFile = value.filter((item) => {
      for (const keyToCheck of keywordsSplitWithRegex(keywords)) {
        if (item.includes(keyToCheck)) return true;
      }
    });

    if (lengthOption === "find-first") {
      resultFile = resultFile.slice(0, 1);
    } else if (lengthOption === "find-last") {
      resultFile = resultFile.slice(-1);
    } else if (lengthOption === "first-custom") {
      resultFile = resultFile.slice(0, Number(customLength));
    } else if (lengthOption === "last-custom") {
      resultFile = resultFile.slice(Number(customLength) * -1);
    }

    resultFile = resultFile.join("\n");

    if (resultFile.length === 0) {
      return NextResponse.json({ success: false });
    }

    const { url } = await put(fileName, resultFile, { access: "public" });
    return NextResponse.json({ success: true, url });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
