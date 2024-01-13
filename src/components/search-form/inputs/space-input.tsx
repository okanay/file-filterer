import { useSetAtom } from "jotai/index";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAtomValue } from "jotai";
import { spaceOptionAtom, spaceValuesAtom } from "@/atoms/search-form-atoms";

export const SpaceInput = () => {
  const setSpaceValues = useSetAtom(spaceValuesAtom);
  const spaceOption = useAtomValue(spaceOptionAtom);

  if (spaceOption === "default") return;

  return (
    <div className={"flex flex-col gap-4"}>
      <div className="flex w-full items-center justify-between gap-4">
        <div className={"flex w-[188px] items-center justify-between"}>
          <Label
            className={"max-w-[320px] text-end leading-4 tracking-wider"}
            htmlFor="space-1"
          >
            Line Count:
          </Label>
          <Input
            min={1}
            type="number"
            id="space-1"
            placeholder="1"
            onChange={(e) => {
              setSpaceValues((prev) => ({
                line: Number(e.target.value),
                space: Number(prev?.space),
              }));
            }}
            className={"-mt-1 max-w-[80px]"}
          />
        </div>
        <div className={"flex w-[188px] items-center justify-between"}>
          <Label
            className={"max-w-[320px] text-end leading-4 tracking-wider"}
            htmlFor="space-2"
          >
            Space Count
          </Label>
          <Input
            type="number"
            id="space-2"
            min={1}
            placeholder="1"
            onChange={(e) => {
              setSpaceValues((prev) => ({
                line: Number(prev?.line),
                space: Number(e.target.value),
              }));
            }}
            className={"-mt-1 max-w-[80px]"}
          />
        </div>
      </div>
    </div>
  );
};
