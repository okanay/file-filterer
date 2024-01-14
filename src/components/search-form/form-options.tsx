"use client";

import { LengthOption } from "@/components/search-form/radio-options/length-option";
import { SuccessMessage } from "@/components/search-form/messages/success-message";
import { NameOption } from "@/components/search-form/radio-options/name-option";
import { CalendarOption } from "@/components/search-form/radio-options/calendar-option";
import { FilterOption } from "@/components/search-form/radio-options/filter-option";
import { DatetimeOption } from "@/components/search-form/radio-options/datetime-option";
import { SpaceOption } from "@/components/search-form/radio-options/space-option";
import { EarlyAccessMessage } from "@/components/search-form/messages/early-access-message";
import { LineOption } from "@/components/search-form/radio-options/line-option";
import { FormRequirement } from "@/components/search-form/form-requirement";

export const FormOptions = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-y-4">
      <h1 className="text-lg font-semibold tracking-wide text-gray-800">
        Options.
      </h1>
      <div className="flex flex-col items-start justify-start gap-16 sm:flex-row sm:items-start">
        <div className="flex w-fit flex-col flex-wrap items-start justify-start gap-6">
          <FilterOption />
          <CalendarOption />
          <DatetimeOption />
          <SpaceOption />
        </div>
        <div className="flex w-fit flex-col flex-wrap items-start justify-start gap-6">
          <LengthOption />
          <NameOption />
          <LineOption />
        </div>
      </div>
    </div>
  );
};
