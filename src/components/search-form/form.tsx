import { CustomNameInput } from "@/components/search-form/custom-name-input";
import { DownloadButton } from "@/components/search-form/download-button";
import { StatusMessages } from "@/components/search-form/status-message";
import { KeywordInput } from "@/components/search-form/keyword-input";
import { CustomNameOption } from "@/components/search-form/custom-name-option";
import { FileInput } from "@/components/search-form/file-input";
import { FormSubmit } from "@/components/search-form/form-submit";
import { CustomMaxLength } from "@/components/search-form/custom-max-length";
import { CustomLengthInput } from "@/components/search-form/custom-length-input";

export const Form = () => {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="grid w-full grid-cols-1 items-center gap-12 px-4 sm:grid-cols-2">
        <div
          className={"row-start-2 flex w-full flex-col gap-4 sm:row-start-auto"}
        >
          <h1 className={"text-lg font-semibold tracking-wide text-gray-800"}>
            Requirements.
          </h1>
          <form className={"flex w-full flex-col gap-4"}>
            <FileInput />
            <KeywordInput />
            <CustomNameInput />
            <CustomLengthInput />
            <FormSubmit />
          </form>
          <DownloadButton />
          <StatusMessages />
        </div>
        <div
          className={"row-start-1 flex w-full flex-col gap-4 sm:row-start-auto"}
        >
          <h1 className={"ttext-lg font-semibold tracking-wide text-gray-800"}>
            Options.
          </h1>
          <CustomNameOption />
          <CustomMaxLength />
        </div>
      </div>
    </div>
  );
};
