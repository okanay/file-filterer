"use client";

import { CustomNameInput } from "@/components/search-form/custom-name-input";
import { DownloadButton } from "@/components/search-form/download-button";
import { StatusMessages } from "@/components/search-form/status-message";
import { KeywordInput } from "@/components/search-form/keyword-input";
import { CustomNameOption } from "@/components/search-form/custom-name-option";
import { FileInput } from "@/components/search-form/file-input";
import { FormSubmit } from "@/components/search-form/form-submit";
import { CustomMaxLength } from "@/components/search-form/custom-max-length";
import { CustomLengthInput } from "@/components/search-form/custom-length-input";
import { CalendarInput } from "@/components/search-form/calendar-input";
import { Warning } from "postcss";
import { WarningMessage } from "@/components/search-form/warning-message";
import { CustomCalendarOption } from "@/components/search-form/custom-calendar-option";
import { SuccessMessage } from "@/components/search-form/success-message";

export const Form = () => {
  return (
    <div className="flex h-full flex-col justify-center gap-12">
      <div className={"flex w-full items-center justify-center "}>
        <div className="flex w-fit flex-wrap items-center justify-center gap-8">
          <div className="flex w-full flex-wrap items-start justify-center gap-12 px-4 sm:w-[440px]">
            <div className="flex w-full max-w-[440px] flex-col gap-4">
              <h1 className="text-lg font-semibold tracking-wide text-gray-800">
                Requirements.
              </h1>
              <form className="flex w-full flex-col gap-4">
                <FileInput />
                <KeywordInput />
                <CustomNameInput />
                <CustomLengthInput />
                <FormSubmit />
              </form>
              <DownloadButton />
              <StatusMessages />
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};
