import { useAtomValue } from "jotai";
import { downloadUrlAtom, statusAtom } from "../../atoms/search-form-atoms";
import { Button } from "@/components/ui/button";

export const DownloadButton = () => {
  const status = useAtomValue(statusAtom);
  const downloadUrl = useAtomValue(downloadUrlAtom);

  return (
    <Button
      asChild={true}
      className={`${
        status.type !== "success" && "cursor-no-drop bg-zinc-700 opacity-75"
      }`}
    >
      <a className={"my-4 cursor-pointer"} href={downloadUrl} target={"_blank"}>
        Download File.
      </a>
    </Button>
  );
};
