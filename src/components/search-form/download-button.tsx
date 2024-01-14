import { downloadUrlAtom, statusAtom } from "@/atoms/search-form-atoms";
import { useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";

export const DownloadButton = () => {
  const status = useAtomValue(statusAtom);
  const downloadUrl = useAtomValue(downloadUrlAtom);

  return (
    <Button
      asChild={true}
      className={`${
        status.type === "success"
          ? "border border-lime-950/10 bg-lime-400 text-lime-950 shadow shadow-lime-950/10"
          : "cursor-no-drop border border-zinc-950/10 bg-zinc-300 text-zinc-600 opacity-75"
      }`}
    >
      <a href={downloadUrl} target="_blank">
        Download Filtered File
      </a>
    </Button>
  );
};
