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
import * as fs from "fs";

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

    const fileName = data.get("file-name") as string;

    // S3 Operation.
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: fileName,
      ContentType: ".log",
    });

    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 60,
    });

    return NextResponse.json({ success: true, signedUrl });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
}
