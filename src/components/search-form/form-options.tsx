"use client";

import { CustomMaxLength } from "@/components/search-form/radio-options/custom-max-length";
import { SuccessMessage } from "@/components/search-form/messages/success-message";
import { CustomNameOption } from "@/components/search-form/radio-options/custom-name-option";
import { CustomCalendarOption } from "@/components/search-form/radio-options/custom-calendar-option";
import { CustomFilterOption } from "@/components/search-form/radio-options/custom-filter-option";
import { CustomDatetimeOption } from "@/components/search-form/radio-options/custom-datetime-option";

export const FormOptions = () => {
  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-6 px-4 sm:items-start sm:px-0">
      <h1 className="text-lg font-semibold tracking-wide text-gray-800">
        Options.
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:flex-nowrap sm:items-start sm:justify-start">
        <div className="flex w-fit flex-col flex-wrap items-start justify-start gap-8">
          <CustomCalendarOption />
          <CustomDatetimeOption />
          <CustomMaxLength />
        </div>
        <div className="flex w-fit flex-col flex-wrap items-start justify-start gap-8">
          <CustomNameOption />
          <CustomFilterOption />
        </div>
      </div>
    </div>
  );
};
