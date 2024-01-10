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
    //
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

    // Send all form input to server.
    setStatus({ type: "loading" });
    setDownloadUrl(undefined);

    try {
      const data = new FormData();
      data.set("file", file as File);
      data.set("keywords", keywords as string);
      data.set("nameOption", nameOption);
      data.set("customName", customName as string);
      data.set("lengthOption", lengthOption);
      data.set("customLength", String(customLength));
      data.set("dateOption", dateOption);
      data.set("customDate", String(customDate?.toDateString()));

      const res = await fetch("/api/file-convert", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (!json.success) {
        setStatus({
          type: "error",
          message:
            "The filtering based on the searched keyword could not be performed.",
        });
        return;
      }

      setDownloadUrl(json.url);
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
