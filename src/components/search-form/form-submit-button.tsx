import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { useAtom, useSetAtom } from "jotai/index";
import { keywordsSplitWithRegex } from "@/helpers/keyword-regex";
import { parseDateToString, parseLogDate } from "@/helpers/parse-date-toString";
import { createFileName } from "@/helpers/create-file-name";
import { formValidation } from "@/validations/form-validation";
import {
  customLengthAtom,
  customNameAtom,
  dateOptionAtom,
  dateTimeOptionAtom,
  dateTimeValueAtom,
  dateValueAtom,
  downloadUrlAtom,
  fileAtom,
  filterOptionAtom,
  keywordAtom,
  lengthOptionAtom,
  nameOptionAtom,
  statusAtom,
  TDateOption,
  TDateTimeOption,
  TDateTimeValue,
  TFilterOption,
  TLengthOption,
} from "@/atoms/search-form-atoms";

export const FormSubmitButton = () => {
  const [status, setStatus] = useAtom(statusAtom);

  const file = useAtomValue(fileAtom);
  const keywords = useAtomValue(keywordAtom);

  const nameOption = useAtomValue(nameOptionAtom);
  const customName = useAtomValue(customNameAtom);

  const lengthOption = useAtomValue(lengthOptionAtom);
  const customLength = useAtomValue(customLengthAtom);

  const dateOption = useAtomValue(dateOptionAtom);
  const customDate = useAtomValue(dateValueAtom);

  const filterOption = useAtomValue(filterOptionAtom);

  const dateTimeOption = useAtomValue(dateTimeOptionAtom);
  const dateTimeValue = useAtomValue(dateTimeValueAtom);

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
      dateTimeOption,
      dateTimeValue,
    });

    // If Form Not Valid Return.
    if (!validation.success) {
      setStatus({
        type: "error",
        message: validation.error.errors.at(0)?.message,
      });
      return;
    }

    try {
      setStatus({ type: "loading" });
      setDownloadUrl(undefined);

      // Create S3 Bucket PUT URL
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
      const fileToStringArray = buffer.toString("utf8").split("\n");

      resultFile = FilterWithKeywords(
        fileToStringArray,
        keywords as string,
        filterOption
      );

      resultFile = FilterWithDate(resultFile, dateOption, customDate as Date);

      resultFile = FilterWithDateTimeValue(
        resultFile,
        dateTimeValue,
        dateTimeOption
      );

      resultFile = FilterWithCustomLength(
        resultFile,
        lengthOption,
        customLength!
      );

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
      });

      const url = `https://file-filter-local-bucket.s3.eu-central-1.amazonaws.com/${fileName}`;
      setDownloadUrl(url);
      setStatus({ type: "success" });
      //
      //
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

function FilterWithCustomLength(
  resultFile: string[],
  lengthOption: TLengthOption,
  customLength: number
) {
  switch (lengthOption) {
    case "all":
      return resultFile;
    case "find-first": {
      return resultFile.slice(0, 1);
    }
    case "find-last": {
      return resultFile.slice(-1);
    }
    case "first-custom": {
      return resultFile.slice(0, Number(customLength));
    }
    case "last-custom": {
      return resultFile.slice(Number(customLength) * -1);
    }
  }
}

function FilterWithKeywords(
  fileToStringArray: string[],
  keywords: string,
  filterOption: TFilterOption
) {
  return fileToStringArray.filter((item) => {
    if (filterOption === "match all") {
      for (const keyToCheck of keywordsSplitWithRegex(keywords!)) {
        if (!item.includes(keyToCheck)) {
          return false;
        }
      }
    }

    for (const keyToCheck of keywordsSplitWithRegex(keywords!)) {
      if (item.includes(keyToCheck)) {
        return true;
      }
    }
  });
}

function FilterWithDate(
  fileToStringArray: string[],
  dateOption: TDateOption,
  customDate: Date
) {
  const customDateFormat = new Date(customDate!);
  const customDay = customDateFormat.getDate();
  const customMonth = customDateFormat.getMonth();
  const customYear = customDateFormat.getFullYear();

  return fileToStringArray.filter((item) => {
    if (dateOption === "select") {
      const lineDate = parseLogDate(item);

      if (lineDate) {
        const lineDay = lineDate.getDate();
        const lineMonth = lineDate.getMonth();
        const lineYear = lineDate.getFullYear();

        return (
          lineDay === customDay &&
          lineMonth === customMonth &&
          lineYear === customYear
        );
      } else return false;
    }
    return true;
  });
}

function FilterWithDateTimeValue(
  fileToStringArray: string[],
  dateFilterValue: TDateTimeValue,
  dateFilterOption: TDateTimeOption
) {
  const customFrom =
    dateFilterValue.from.hour * 60 + dateFilterValue.from.minute;
  const customTo = dateFilterValue.to.hour * 60 + dateFilterValue.to.minute;

  return fileToStringArray.filter((item) => {
    if (dateFilterOption === "custom") {
      const lineDate = parseLogDate(item);

      if (lineDate) {
        const lineHour = lineDate.getHours();
        const lineMin = lineDate.getMinutes();

        const lineTime = lineHour * 60 + lineMin;

        if (customFrom <= lineTime && customTo >= lineTime) {
          return true;
        }
      }
    } else return true;
  });
}