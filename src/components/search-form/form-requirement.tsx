"use client";

import { FileInput } from "@/components/search-form/inputs/file-input";
import { KeywordInput } from "@/components/search-form/inputs/keyword-input";
import { NameInput } from "@/components/search-form/inputs/name-input";
import { LengthInput } from "@/components/search-form/inputs/length-input";
import { FormSubmitButton } from "@/components/search-form/form-submit-button";
import { DownloadButton } from "@/components/search-form/download-button";
import { StatusMessages } from "@/components/search-form/messages/status-message";
import { CalendarInput } from "@/components/search-form/inputs/calendar-input";
import { DatetimeInput } from "@/components/search-form/inputs/datetime-input";
import { SpaceInput } from "@/components/search-form/inputs/space-input";

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
          <NameInput />
          <LengthInput />
          <SpaceInput />
          <CalendarInput />
          <DatetimeInput />
          <FormSubmitButton />
        </form>
        <DownloadButton />
        <StatusMessages />
      </div>
    </div>
  );
};
