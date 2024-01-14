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
          ? "border border-zinc-950 bg-white text-zinc-950"
          : "cursor-no-drop border border-gray-950/10 bg-gray-400 text-zinc-600 opacity-75"
      }`}
    >
      <a href={downloadUrl} target="_blank">
        Download Filtered File
      </a>
    </Button>
  );
};
