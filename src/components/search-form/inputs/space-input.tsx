import { useAtom, useSetAtom } from "jotai/index";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAtomValue } from "jotai";
import { spaceOptionAtom, spaceValuesAtom } from "@/atoms/search-form-atoms";
import { Separator } from "@/components/ui/separator";

export const SpaceInput = () => {
  const [spaceValues, setSpaceValues] = useAtom(spaceValuesAtom);
  const spaceOption = useAtomValue(spaceOptionAtom);

  if (spaceOption === "default") return;

  return (
    <div className={"flex flex-col gap-4"}>
      <Label>
        Add{" "}
        <span className={"text-amber-500 underline underline-offset-4"}>
          {spaceValues?.space}
        </span>{" "}
        spaces every{" "}
        <span className={"text-amber-500 underline underline-offset-4"}>
          {spaceValues?.line}
        </span>{" "}
        lines.
      </Label>
      <div className="flex w-full items-center justify-between gap-4">
        <div className={"flex w-[188px] items-center justify-between"}>
          <Label
            className={"max-w-[320px] text-end leading-4 tracking-wider"}
            htmlFor="space-2-input"
          >
            Space
          </Label>
          <Input
            type="number"
            id="space-2-input"
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
        <div className={"flex w-[188px] items-center justify-between"}>
          <Label
            className={"max-w-[320px] text-end leading-4 tracking-wider"}
            htmlFor="space-1-input"
          >
            Line
          </Label>
          <Input
            min={1}
            type="number"
            id="space-1-input"
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
      </div>
    </div>
  );
};
