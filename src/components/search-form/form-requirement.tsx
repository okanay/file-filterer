"use client";

import { FileInput } from "@/components/search-form/file-input";
import { KeywordInput } from "@/components/search-form/keyword-input";
import { CustomNameInput } from "@/components/search-form/custom-name-input";
import { CustomLengthInput } from "@/components/search-form/custom-length-input";
import { FormSubmit } from "@/components/search-form/form-submit";
import { DownloadButton } from "@/components/search-form/download-button";
import { StatusMessages } from "@/components/search-form/status-message";
import { CalendarInput } from "@/components/search-form/calendar-input";

export const FormRequirement = () => {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-12 px-4 sm:w-[440px]">
      <div className="flex w-full max-w-[440px] flex-col gap-4">
        <h1 className="text-lg font-semibold tracking-wide text-gray-800">
          Requirements.
        </h1>
        <form className="flex w-full flex-col gap-4">
          <FileInput />
          <KeywordInput />
          <div />
          <CustomNameInput />
          <CustomLengthInput />
          <CalendarInput />
          <FormSubmit />
        </form>
        <DownloadButton />
        <StatusMessages />
      </div>
    </div>
  );
};
