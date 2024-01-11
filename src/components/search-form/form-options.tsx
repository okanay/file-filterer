"use client";

import { CustomMaxLength } from "@/components/search-form/custom-max-length";
import { SuccessMessage } from "@/components/search-form/success-message";
import { CustomNameOption } from "@/components/search-form/custom-name-option";
import { CustomCalendarOption } from "@/components/search-form/custom-calendar-option";
import { Label } from "@/components/ui/label";
import { WarningMessage } from "@/components/search-form/warning-message";

export const FormOptions = () => {
  return (
    <div className="mx-auto flex w-fit flex-col gap-6 px-4 sm:px-0">
      <h1 className="text-lg font-semibold tracking-wide text-gray-800">
        Options.
      </h1>
      <div className={"flex flex-col gap-2"}>
        <Label>Customize Filter Type.</Label>
        <WarningMessage />
      </div>
      <div className="flex w-fit flex-col flex-wrap items-start justify-start gap-8">
        <CustomNameOption />
        <CustomMaxLength />
        <CustomCalendarOption />
        <div className={"flex flex-col gap-2"}>
          <Label>Customize Time.</Label>
          <WarningMessage />
        </div>
      </div>
    </div>
  );
};
