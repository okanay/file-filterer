import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAtomValue } from "jotai";
import { useSetAtom } from "jotai/index";
import { customLengthAtom, lengthOptionAtom } from "@/atoms/search-form-atoms";

export const CustomLengthInput = () => {
  const setLength = useSetAtom(customLengthAtom);
  const lengthOption = useAtomValue(lengthOptionAtom);

  const isMatch =
    lengthOption === "first-custom" || lengthOption === "last-custom" || false;
  const inputName = lengthOption === "first-custom" ? "first" : "last";

  return (
    isMatch && (
      <div className={"flex w-full items-center justify-between gap-4"}>
        <Label
          className={"max-w-[320px] leading-4 tracking-wider"}
          htmlFor="customLength"
        >
          How many{" "}
          <span className={"text-amber-600 underline underline-offset-4"}>
            {inputName}
          </span>{" "}
          lines should be get?
        </Label>
        <Input
          type="number"
          id="customLength"
          placeholder="0"
          onChange={(e) => setLength(Number(e.target?.value))}
          className={"-mt-1 max-w-[80px]"}
        />
      </div>
    )
  );
};
