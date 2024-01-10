"use client";

import { CustomMaxLength } from "@/components/search-form/custom-max-length";
import { SuccessMessage } from "@/components/search-form/success-message";
import { CustomNameOption } from "@/components/search-form/custom-name-option";
import { CustomCalendarOption } from "@/components/search-form/custom-calendar-option";

export const FormOptions = () => {
  return (
    <div className="mx-auto flex w-fit flex-col gap-6">
      <h1 className="text-lg font-semibold tracking-wide text-gray-800">
        Options.
      </h1>
      <div className="flex w-fit flex-wrap items-start justify-start gap-12">
        <div className={"flex flex-col flex-wrap gap-4"}>
          <CustomMaxLength />
        </div>
        <div className={"flex flex-col flex-wrap gap-6"}>
          <div className={"flex flex-col flex-wrap gap-4"}>
            <CustomNameOption />
          </div>
          <div className={"flex flex-col flex-wrap gap-4"}>
            <CustomCalendarOption />
            <SuccessMessage />
          </div>
        </div>
      </div>
    </div>
  );
};
