import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { useAtom, useSetAtom } from "jotai/index";
import { MAX_BYTE } from "@/constants";
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

    if (!file) {
      setStatus({
        type: "error",
        message: "Please add your file.",
      });
      return;
    }
    if (file.size > MAX_BYTE) {
      setStatus({
        type: "error",
        message: "Maximum File Size is 4.4 MB.",
      });
      return;
    }
    if (!keywords) {
      setStatus({
        type: "error",
        message: "Please add some keywords.",
      });
      return;
    }
    if (nameOption === "custom" && customName === "") {
      setStatus({
        type: "error",
        message: "Please add your custom file name.",
      });
      return;
    }

    try {
      setStatus({ type: "loading" });

      const data = new FormData();

      data.set("file", file);
      data.set("keywords", keywords);
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
