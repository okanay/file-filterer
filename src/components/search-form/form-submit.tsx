import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { useAtom, useSetAtom } from "jotai/index";
import { MAX_BYTE } from "@/constants";
import { formValidation } from "@/validations/form-validation";
import {
  customLengthAtom,
  customNameAtom,
  dateOptionAtom,
  dateValueAtom,
  downloadUrlAtom,
  fileAtom,
  keywordAtom,
  lengthOptionAtom,
  nameOptionAtom,
  statusAtom,
} from "@/atoms/search-form-atoms";
import { keywordsSplitWithRegex } from "@/helpers/keyword-regex";
import { parseDateToString } from "@/helpers/parse-date-toString";
import { NextResponse } from "next/server";
import { createFileName } from "@/helpers/create-file-name";

export const FormSubmit = () => {
  const [status, setStatus] = useAtom(statusAtom);

  const file = useAtomValue(fileAtom);
  const keywords = useAtomValue(keywordAtom);

  const nameOption = useAtomValue(nameOptionAtom);
  const customName = useAtomValue(customNameAtom);

  const lengthOption = useAtomValue(lengthOptionAtom);
  const customLength = useAtomValue(customLengthAtom);

  const dateOption = useAtomValue(dateOptionAtom);
  const customDate = useAtomValue(dateValueAtom);

  const setDownloadUrl = useSetAtom(downloadUrlAtom);

  const handleFormSubmit = async () => {
    // Form Validation Here
    const validation = formValidation.safeParse({
      file,
      keywords,
      nameOption,
      customName,
      lengthOption,
      customLength,
      dateOption,
      customDate: customDate?.toDateString(),
    });

    // If Form Not Valid Return.
    if (!validation.success) {
      setStatus({
        type: "error",
        message: validation.error.errors.at(0)?.message,
      });
      return;
    }

    // Create S3 Bucket PUT URL
    setStatus({ type: "loading" });
    setDownloadUrl(undefined);

    try {
      const fileName = createFileName(file!.name, nameOption, customName!);

      const data = new FormData();
      data.set("file-name", fileName);

      const res = await fetch("/api/s3-put-url-create", {
        method: "POST",
        body: data,
      });

      const awsPutUrlFetchResponseJSON = await res.json();

      if (!awsPutUrlFetchResponseJSON.success) {
        setStatus({
          type: "error",
          message: "System not working as usual.",
        });
        return;
      }

      // Filter file with options.
      let resultFile;

      const bytes = await file!.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const bufferToString = buffer.toString("utf8").split("\n");

      const customDateFormat = new Date(customDate!);
      const customDay = customDateFormat.getDate();
      const customMonth = customDateFormat.getMonth();
      const customYear = customDateFormat.getFullYear();

      resultFile = bufferToString.filter((item) => {
        for (const keyToCheck of keywordsSplitWithRegex(keywords!)) {
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
        setStatus({
          type: "error",
          message: "There is no row return. Please change your options.",
        });
        return;
      }

      const filteredFileBuffer = new Blob([resultFile], {
        type: "text/csv",
      });

      const signedUrl = awsPutUrlFetchResponseJSON.signedUrl;

      await fetch(signedUrl, {
        method: "PUT",
        body: filteredFileBuffer,
        headers: {
          "Content-Type": "text/csv",
        },
      });

      const url = `https://file-filter-local-bucket.s3.eu-central-1.amazonaws.com/${fileName}`;

      setDownloadUrl(url);
      setStatus({ type: "success" });
    } catch (e: any) {
      setStatus({
        type: "error",
        message: "System not working as usual. (FUCK)",
      });
    }
  };

  return (
    <Button
      onClick={handleFormSubmit}
      type={"button"}
      disabled={status.type === "loading"}
    >
      Filter File By Keywords.
    </Button>
  );
};
