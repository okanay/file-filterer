"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAtomValue, useAtom } from "jotai";
import {
  dateValueAtom,
  dateOptionAtom,
  dateValuesAtom,
} from "@/atoms/search-form-atoms";
import { WarningMessage } from "@/components/search-form/messages/warning-message";
import { Label } from "@/components/ui/label";
import { SetStateAction } from "react";
import { EarlyAccessMessage } from "@/components/search-form/messages/early-access-message";

export function CalendarInput() {
  const dateOption = useAtomValue(dateOptionAtom);
  const [customDate, setDate] = useAtom(dateValueAtom);
  const [customDates, setDates] = useAtom(dateValuesAtom);

  const inputName = () => {
    if (customDates?.from === undefined && customDates?.to === undefined) {
      return "Pick a date";
    } else if (customDates.from && customDates.to === undefined) {
      return `${format(customDates?.from, "PPP")} with ...`;
    } else {
      return `${format(customDates?.from, "PPP")} with ${format(
        customDates?.to,
        "PPP"
      )}`;
    }
  };

  if (dateOption === "default") return;

  if (dateOption === "between-one") {
    return (
      <div className={"flex flex-col gap-2"}>
        <Label>
          Date{" "}
          <span className={"text-amber-600 underline underline-offset-4"}>
            Select
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
    );
  }

  if (dateOption === "between-two")
    return (
      <>
        <div className={"flex flex-col gap-2"}>
          <Label>
            Date{" "}
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
}
