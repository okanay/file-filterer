"use client";

import { LengthOption } from "@/components/search-form/radio-options/length-option";
import { SuccessMessage } from "@/components/search-form/messages/success-message";
import { NameOption } from "@/components/search-form/radio-options/name-option";
import { CalendarOption } from "@/components/search-form/radio-options/calendar-option";
import { FilterOption } from "@/components/search-form/radio-options/filter-option";
import { DatetimeOption } from "@/components/search-form/radio-options/datetime-option";
import { SpaceOption } from "@/components/search-form/radio-options/space-option";
import { EarlyAccessMessage } from "@/components/search-form/messages/early-access-message";

export const FormOptions = () => {
  return (
    <div className="mx-auto flex w-fit flex-col items-start gap-6 px-4 sm:px-0">
      <h1 className="text-lg font-semibold tracking-wide text-gray-800 [@media(min-width:380px)]:translate-x-[-30%]">
        Options.
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-12 sm:flex-nowrap sm:items-start sm:justify-start">
        <div className="flex w-fit flex-col flex-wrap items-start justify-start gap-8">
          <CalendarOption />
          <DatetimeOption />
          <LengthOption />
        </div>
        <div className="flex w-fit flex-col flex-wrap items-start justify-start gap-8">
          <NameOption />
          <FilterOption />
          <div className={"flex flex-col gap-3"}>
            <SpaceOption />
            <SuccessMessage />
          </div>
        </div>
      </div>
    </div>
  );
};
