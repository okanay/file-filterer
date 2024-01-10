import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { CustomNameInput } from "@/components/search-form/custom-name-input";
import { InputGroup } from "@/components/search-form/input-group";
import { DownloadButton } from "@/components/search-form/download-button";
import { StatusMessages } from "@/components/search-form/status-message";
import { KeywordInput } from "@/components/search-form/keyword-input";

import {
  customNameAtom,
  downloadUrlAtom,
  keywordAtom,
  nameOptionAtom,
  statusAtom,
} from "@/atoms/form-atoms";

// 4.4 MB
const MAX_BYTE = 4.4 * 1024 * 1024;

export const Form = () => {
  const [status, setStatus] = useAtom(statusAtom);
  const [file, setFile] = useState<File>();
  const [nameOption, setNameOption] = useAtom(nameOptionAtom);
  const keywords = useAtomValue(keywordAtom);
  const customName = useAtomValue(customNameAtom);
  const setDownloadUrl = useSetAtom(downloadUrlAtom);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus({ type: "initial" });
    setDownloadUrl(undefined);

    if (!file) {
      setStatus({
        type: "error",
        message: "Please add your file.",
      });
      return;
    }
    if (file.size > MAX_BYTE) {
      setStatus({
        type: "error",
        message: "Maximum File Size is 4.4 MB.",
      });
      return;
    }
    if (!keywords) {
      setStatus({
        type: "error",
        message: "Please add some keywords.",
      });
      return;
    }
    if (nameOption === "custom" && customName === "") {
      setStatus({
        type: "error",
        message: "Please add your custom file name.",
      });
      return;
    }

    try {
      setStatus({ type: "loading" });

      const data = new FormData();

      data.set("file", file);
      data.set("keywords", keywords);
      data.set("nameOption", nameOption);
      data.set("customName", customName as string);

      const res = await fetch("/api/file-convert", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();

      if (!json.success) {
        setStatus({
          type: "error",
          message:
            "The filtering based on the searched keyword could not be performed.",
        });
        return;
      }

      setDownloadUrl(json.url);
      setStatus({ type: "success" });
      //
      //
    } catch (e: any) {
      setStatus({
        type: "error",
        message: "System not working as usual. (FUCK)",
      });
    }
  };

  return (
    <div className="flex h-full max-w-[480px] flex-col justify-center px-4 sm:scale-[115%] sm:px-2">
      <form onSubmit={onSubmit} className={"flex w-full flex-col gap-4"}>
        <InputGroup>
          <Label htmlFor="file">Your File.</Label>
          <Input
            id="file"
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </InputGroup>
        <KeywordInput />
        <InputGroup>
          <Label htmlFor="file">New File Name.</Label>
          <RadioGroup defaultValue={nameOption}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="default"
                id="r1"
                onClick={() => setNameOption("default")}
              />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="custom"
                id="r2"
                onClick={() => setNameOption("custom")}
              />
              <Label htmlFor="r2">Custom</Label>
            </div>
          </RadioGroup>
        </InputGroup>
        <CustomNameInput />
        <Button type={"submit"} disabled={status.type === "loading"}>
          Filter File By Keywords.
        </Button>
      </form>
      <DownloadButton />
      <StatusMessages />
    </div>
  );
};
