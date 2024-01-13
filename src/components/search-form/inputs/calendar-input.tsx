"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
// prettier-ignore
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAtomValue, useAtom } from "jotai";
// prettier-ignore
import { dateValueAtom, dateOptionAtom, dateValuesAtom} from "@/atoms/search-form-atoms";
import { Separator } from "@/components/ui/separator";

export function CalendarInput() {
  const dateOption = useAtomValue(dateOptionAtom);

  if (dateOption === "target") return <TargetDateCalendarInput />;
  else if (dateOption === "between") return <BetweenDateCalendarInput />;
  else return;
}

const TargetDateCalendarInput = () => {
  const [customDate, setDate] = useAtom(dateValueAtom);

  return (
    <>
      <Separator />
      <div className={"flex flex-col gap-4"}>
        <Label>
          Customize Date with{" "}
          <span className={"text-amber-600 underline underline-offset-4"}>
            Target
          </span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !customDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {customDate ? (
                format(customDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={customDate}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

const BetweenDateCalendarInput = () => {
  const [customDates, setDates] = useAtom(dateValuesAtom);
  const inputName = () => {
    if (customDates?.from === undefined && customDates?.to === undefined) {
      return "Pick a date";
    } else if (customDates.from && customDates.to === undefined) {
      return `${format(customDates?.from, "PPP")} between ...`;
    } else {
      return `${format(customDates?.from, "PPP")} ~ ${format(
        customDates?.to,
        "PPP"
      )}`;
    }
  };

  return (
    <>
      <Separator />
      <div className={"flex flex-col gap-4"}>
        <Label>
          Customize Date with{" "}
          <span className={"text-amber-600 underline underline-offset-4"}>
            Between
          </span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !customDates && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {inputName()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              toDate={customDates?.to}
              fromDate={customDates?.from}
              selected={customDates}
              onSelect={setDates as any}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
