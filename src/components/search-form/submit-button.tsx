import { useAtomValue } from "jotai";
import { statusAtom } from "@/atoms/form-atoms";
import { Button } from "@/components/ui/button";

export const SubmitButton = () => {
  const status = useAtomValue(statusAtom);

  return (
    <Button type={"submit"} disabled={status.type === "loading"}>
      Filter File By Keywords.
    </Button>
  );
};
