// prettier-ignore
import {dateTimeOptionAtom, dateTimeValueAtom,} from "@/atoms/search-form-atoms";
import { useSetAtom } from "jotai/index";
import { useAtomValue } from "jotai";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const DatetimeInput = () => {
  const dateTimeOption = useAtomValue(dateTimeOptionAtom);

  if (dateTimeOption === "target") return <DateTimeTargetInputs />;
  else if (dateTimeOption === "between") return <DateTimeBetweenInputs />;
  else return;
};

const DateTimeBetweenInputs = () => {
  const setDateTime = useSetAtom(dateTimeValueAtom);

  return (
    <div className={"flex flex-col gap-4"}>
      <Label>
        Customize Time with{" "}
        <span className={"text-amber-600 underline underline-offset-4"}>
          Between
        </span>
      </Label>
      <div className={"flex flex-col gap-4"}>
        <div className="flex w-full items-center justify-between gap-4">
          <div className={"flex w-[188px] items-center justify-between"}>
            <Label
              className={"max-w-[320px] text-end leading-4 tracking-wider"}
              htmlFor="hour-from"
            >
              Hour From
            </Label>
            <Input
              min={0}
              max={24}
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
              className={"max-w-[320px] text-end leading-4 tracking-wider"}
              htmlFor="hour-to"
            >
              Hour To
            </Label>
            <Input
              type="number"
              id="hour-to"
              min={0}
              max={24}
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
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <div className={"flex w-[188px] items-center justify-between"}>
            <Label
              className={"max-w-[320px] text-end leading-4 tracking-wider"}
              htmlFor="minute-from"
            >
              Minute From
            </Label>
            <Input
              min={0}
              max={60}
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
          <div className={"flex w-[188px] items-center justify-between"}>
            <Label
              className="max-w-[320px] text-end leading-4 tracking-wider"
              htmlFor="minute-to"
            >
              Minute To
            </Label>
            <Input
              min={0}
              max={60}
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
    </div>
  );
};

const DateTimeTargetInputs = () => {
  const setDateTime = useSetAtom(dateTimeValueAtom);

  return (
    <div className={"flex flex-col gap-4"}>
      <Label>
        Customize Time with{" "}
        <span className={"text-amber-600 underline underline-offset-4"}>
          Target
        </span>
      </Label>
      <div className="flex w-full items-center justify-between gap-4">
        <div className={"flex w-[188px] items-center justify-between"}>
          <Label
            className={"max-w-[320px] text-end leading-4 tracking-wider"}
            htmlFor="target-5"
          >
            Target Hour
          </Label>
          <Input
            min={0}
            max={24}
            type="number"
            id="target-5"
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
            className={"max-w-[320px] text-end leading-4 tracking-wider"}
            htmlFor="target-6"
          >
            Target Minute
          </Label>
          <Input
            min={0}
            max={60}
            type="number"
            id="target-6"
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
    </div>
  );
};
