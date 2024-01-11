import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  TDateOption,
  TLengthOption,
  TNameOption,
} from "@/atoms/search-form-atoms";
import { createFileName } from "@/helpers/create-file-name";
import { keywordsSplitWithRegex } from "@/helpers/keyword-regex";
import { parseDateToString } from "@/helpers/parse-date-toString";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const file: File | null = data.get("file") as unknown as File;
    const keywords: string | null = data.get("keywords") as string;

    const nameOption = data.get("nameOption") as TNameOption;
    const customName = data.get("customName") as string;
    const fileName = createFileName(file.name, nameOption, customName);

    const lengthOption = data.get("lengthOption") as TLengthOption;
    const customLength = data.get("customLength") as string;

    const dateOption = data.get("dateOption") as TDateOption;
    const customDate = data.get("customDate") as string;

    const customDateFormat = new Date(customDate);
    const customDay = customDateFormat.getDate();
    const customMonth = customDateFormat.getMonth();
    const customYear = customDateFormat.getFullYear();

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const bufferToString = buffer.toString("utf8").split("\n");

    let resultFile;

    resultFile = bufferToString.filter((item) => {
      for (const keyToCheck of keywordsSplitWithRegex(keywords)) {
        if (item.includes(keyToCheck)) {
          //prettier-ignore
          if (dateOption === "select")
          {
            const lineDate = parseDateToString(item)

            if (lineDate)
            {
              const lineDay = lineDate.getDate();
              const lineMonth = lineDate.getMonth();
              const lineYear = lineDate.getFullYear();

              if (lineDay === customDay && lineMonth === customMonth && lineYear === customYear) {
                return true
              }
            }
          }
          else
          {
            return true;
          }
        }
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

    const filteredFileBuffer = Buffer.from(resultFile, "utf8");

    // S3 Operation.
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: fileName,
    });

    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 60,
    });

    await fetch(signedUrl, {
      method: "PUT",
      body: filteredFileBuffer,
      headers: {
        "Content-Type": file.type,
      },
    });

    const url = `https://file-filter-local-bucket.s3.eu-central-1.amazonaws.com/${fileName}`;

    return NextResponse.json({ success: true, url });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
}