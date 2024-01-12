import { useAtomValue } from "jotai/index";
import { statusAtom } from "@/atoms/search-form-atoms";

export const StatusMessages = () => {
  const status = useAtomValue(statusAtom);

  return (
    <>
      {status.type === "loading" && (
        <p className="rounded border border-amber-950/10 bg-amber-50 px-2 py-1 text-sm text-amber-500 shadow shadow-amber-950/10">
          In progres..
        </p>
      )}

      {status.type === "success" && (
        <p className="rounded border border-lime-950/10 bg-lime-50 px-2 py-1 text-sm text-lime-500 shadow shadow-lime-950/10">
          Your new file is ready to download.
        </p>
      )}

      {status.type === "error" && (
        <p className="rounded border border-rose-950/10 bg-rose-50 px-2 py-1 text-sm text-rose-500 shadow shadow-rose-950/10">
          {status.message}
        </p>
      )}
    </>
  );
};
