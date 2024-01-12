import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAtomValue } from "jotai";
import { useSetAtom } from "jotai/index";
import {
  dateTimeOptionAtom,
  dateTimeValueAtom,
} from "@/atoms/search-form-atoms";

export const CustomDateTimeInput = () => {
  const setDateTime = useSetAtom(dateTimeValueAtom);
  const dateTimeOption = useAtomValue(dateTimeOptionAtom);

  return (
    dateTimeOption === "custom" && (
      <div className={"flex flex-col gap-4"}>
        <div className="flex w-full items-center justify-between gap-4">
          <div className={"flex w-[188px] items-center justify-between"}>
            <Label
              className={"max-w-[320px] leading-4 tracking-wider"}
              htmlFor="hour-from"
            >
              Hour From
            </Label>
            <Input
              type="number"
              id="hour-from"
              placeholder="0"
              onChange={(e) => {
                setDateTime((prev) => ({
                  ...prev,
                  from: {
                    ...prev.from,
                    hour: Number(e.target.value),
                  },
                }));
              }}
              className={"-mt-1 max-w-[80px]"}
            />
          </div>
          <div className={"flex w-[188px] items-center justify-between"}>
            <Label
              className={"max-w-[320px] leading-4 tracking-wider"}
              htmlFor="minute-from"
            >
              Minute From
            </Label>
            <Input
              type="number"
              id="minute-from"
              placeholder="0"
              onChange={(e) => {
                setDateTime((prev) => ({
                  ...prev,
                  from: {
                    ...prev.from,
                    minute: Number(e.target.value),
                  },
                }));
              }}
              className={"-mt-1 max-w-[80px]"}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <div className={"flex w-[188px] items-center justify-between"}>
            <Label
              className={"max-w-[320px] leading-4 tracking-wider"}
              htmlFor="hour-to"
            >
              Hour To
            </Label>
            <Input
              type="number"
              id="hour-to"
              placeholder="0"
              onChange={(e) => {
                setDateTime((prev) => ({
                  ...prev,
                  to: {
                    ...prev.to,
                    hour: Number(e.target.value),
                  },
                }));
              }}
              className={"-mt-1 max-w-[80px]"}
            />
          </div>

          <div className={"flex w-[188px] items-center justify-between"}>
            <Label
              className={"max-w-[320px] leading-4 tracking-wider"}
              htmlFor="minute-to"
            >
              Minute To
            </Label>
            <Input
              type="number"
              id="minute-to"
              placeholder="0"
              onChange={(e) => {
                setDateTime((prev) => ({
                  ...prev,
                  to: {
                    ...prev.to,
                    minute: Number(e.target.value),
                  },
                }));
              }}
              className={"-mt-1 max-w-[80px]"}
            />
          </div>
        </div>
      </div>
    )
  );
};
