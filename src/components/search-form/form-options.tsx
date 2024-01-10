"use client";

import { CustomMaxLength } from "@/components/search-form/custom-max-length";
import { SuccessMessage } from "@/components/search-form/success-message";
import { CustomNameOption } from "@/components/search-form/custom-name-option";
import { CustomCalendarOption } from "@/components/search-form/custom-calendar-option";
import { WarningMessage } from "@/components/search-form/warning-message";

export const FormOptions = () => {
  return (
    <div className="mx-auto flex w-fit flex-col gap-4 px-4">
      <h1 className="text-lg font-semibold tracking-wide text-gray-800">
        Options.
      </h1>
      <div className="flex w-fit flex-wrap items-start justify-start gap-12">
        <div className={"flex flex-col flex-wrap gap-4"}>
          <CustomMaxLength />
          <SuccessMessage />
        </div>
        <div className={"flex flex-col flex-wrap gap-4"}>
          <div className={"flex flex-col flex-wrap gap-4"}>
            <CustomNameOption />
            <SuccessMessage />
          </div>
          <div className={"flex flex-col flex-wrap gap-4"}>
            <CustomCalendarOption />
            <WarningMessage />
          </div>
        </div>
      </div>
    </div>
  );
};
