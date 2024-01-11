// import { put } from "@vercel/blob";
//
// import { NextResponse } from "next/server";
// import {
//   TDateOption,
//   TLengthOption,
//   TNameOption,
// } from "@/atoms/search-form-atoms";
//
// import { keywordsSplitWithRegex } from "@/helpers/keyword-regex";
// import { createFileName } from "@/helpers/create-file-name";
// import { parseDateToString } from "@/helpers/parse-date-toString";
//
// export async function POST(request: Request) {
//   try {
//     const data = await request.formData();
//
//     const file: File | null = data.get("file") as unknown as File;
//     const keywords: string | null = data.get("keywords") as string;
//
//     const nameOption = data.get("nameOption") as TNameOption;
//     const customName = data.get("customName") as string;
//     const fileName = createFileName(file.name, nameOption, customName);
//
//     const lengthOption = data.get("lengthOption") as TLengthOption;
//     const customLength = data.get("customLength") as string;
//
//     const dateOption = data.get("dateOption") as TDateOption;
//     const customDate = data.get("customDate") as string;
//
//     if (!file && !keywords) {
//       return NextResponse.json({ success: false });
//     }
//
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const value = buffer.toString("utf8").split("\n");
//
//     let resultFile;
//
//     const customDateFormat = new Date(customDate);
//     const customDay = customDateFormat.getDate();
//     const customMonth = customDateFormat.getMonth();
//     const customYear = customDateFormat.getFullYear();
//
//     resultFile = value.filter((item) => {
//       for (const keyToCheck of keywordsSplitWithRegex(keywords)) {
//         if (item.includes(keyToCheck)) {
//           //prettier-ignore
//           if (dateOption === "select")
//           {
//             const lineDate = parseDateToString(item)
//
//             if (lineDate)
//             {
//               const lineDay = lineDate.getDate();
//               const lineMonth = lineDate.getMonth();
//               const lineYear = lineDate.getFullYear();
//
//               if (lineDay === customDay && lineMonth === customMonth && lineYear === customYear) {
//                 return true
//               }
//             }
//           }
//           else
//           {
//             return true;
//           }
//         }
//       }
//     });
//
//     if (lengthOption === "find-first") {
//       resultFile = resultFile.slice(0, 1);
//     } else if (lengthOption === "find-last") {
//       resultFile = resultFile.slice(-1);
//     } else if (lengthOption === "first-custom") {
//       resultFile = resultFile.slice(0, Number(customLength));
//     } else if (lengthOption === "last-custom") {
//       resultFile = resultFile.slice(Number(customLength) * -1);
//     }
//
//     resultFile = resultFile.join("\n");
//
//     if (resultFile.length === 0) {
//       return NextResponse.json({ success: false });
//     }
//
//     const { url } = await put(fileName, resultFile, { access: "public" });
//     return NextResponse.json({ success: true, url });
//   } catch (e) {
//     console.log(e);
//     return NextResponse.json({ success: false });
//   }
// }
