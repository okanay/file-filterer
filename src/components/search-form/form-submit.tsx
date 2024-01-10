import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { useAtom, useSetAtom } from "jotai/index";
import { MAX_BYTE } from "@/constants";
import { formValidation } from "@/validations/form-validation";
import {
  customNameAtom,
  downloadUrlAtom,
  fileAtom,
  keywordAtom,
  nameOptionAtom,
  statusAtom,
} from "@/atoms/search-form-atoms";

export const FormSubmit = () => {
  const [status, setStatus] = useAtom(statusAtom);
  const file = useAtomValue(fileAtom);
  const nameOption = useAtomValue(nameOptionAtom);
  const keywords = useAtomValue(keywordAtom);
  const customName = useAtomValue(customNameAtom);
  const setDownloadUrl = useSetAtom(downloadUrlAtom);

  const handleFormSubmit = async () => {
    setStatus({ type: "initial" });
    setDownloadUrl(undefined);

    const isValid = formValidation.safeParse({
      file,
      keywords,
      nameOption,
      customName,
    });

    if (!isValid.success) {
      setStatus({
        type: "error",
        message: isValid.error.errors.at(0)?.message,
      });
      return;
    }

    try {
      setStatus({ type: "loading" });
      const data = new FormData();

      data.set("file", file as File);
      data.set("keywords", keywords as string);
      data.set("nameOption", nameOption);
      data.set("customName", customName as string);

      const res = await fetch("/api/file-convert", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
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
