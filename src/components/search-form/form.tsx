import { CustomNameInput } from "@/components/search-form/custom-name-input";
import { DownloadButton } from "@/components/search-form/download-button";
import { StatusMessages } from "@/components/search-form/status-message";
import { KeywordInput } from "@/components/search-form/keyword-input";
import { CustomNameOption } from "@/components/search-form/custom-name-option";
import { FileInput } from "@/components/search-form/file-input";
import { SubmitButton } from "@/components/search-form/submit-button";

export const Form = () => {
  return (
    <div className="flex h-full max-w-[480px] flex-col justify-center px-4 sm:scale-[115%] sm:px-2">
      <form className={"flex w-full flex-col gap-4"}>
        <FileInput />
        <KeywordInput />
        <CustomNameOption />
        <CustomNameInput />
        <SubmitButton />
      </form>
      <DownloadButton />
      <StatusMessages />
    </div>
  );
};
