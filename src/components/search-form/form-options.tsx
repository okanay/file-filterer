"use client";

import { CustomMaxLength } from "@/components/search-form/radio-options/custom-max-length";
import { SuccessMessage } from "@/components/search-form/messages/success-message";
import { CustomNameOption } from "@/components/search-form/radio-options/custom-name-option";
import { CustomCalendarOption } from "@/components/search-form/radio-options/custom-calendar-option";
import { Label } from "@/components/ui/label";
import { WarningMessage } from "@/components/search-form/messages/warning-message";
import { CustomFilterOption } from "@/components/search-form/radio-options/custom-filter-option";
import { CustomDatetimeOption } from "@/components/search-form/radio-options/custom-datetime-option";

export const FormOptions = () => {
  return (
    <div className="mx-auto flex w-fit flex-col gap-6 px-4 sm:px-0">
      <h1 className="text-lg font-semibold tracking-wide text-gray-800">
        Options.
      </h1>
      <div className="flex w-fit flex-col flex-wrap items-start justify-start gap-8">
        <CustomNameOption />
        <div className={"flex flex-col gap-2"}>
          <CustomFilterOption />
          <SuccessMessage />
        </div>
        <CustomMaxLength />
        <CustomCalendarOption />
        <div className={"flex flex-col gap-2"}>
          <CustomDatetimeOption />
          <SuccessMessage />
        </div>
      </div>
    </div>
  );
};
