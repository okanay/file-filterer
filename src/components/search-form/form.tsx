import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { keywordsSplitWithRegex } from "@/helpers/keyword-regex";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { CustomNameInput } from "@/components/search-form/custom-name-input";
import { InputGroup } from "@/components/search-form/input-group";
import { KeywordsList } from "@/components/search-form/keywords-list";

import {
  customNameAtom,
  downloadUrlAtom,
  keywordAtom,
  keywordsListAtom,
  nameOptionAtom,
  statusAtom,
} from "@/atoms/form-atoms";
import { DownloadButton } from "@/components/search-form/download-button";
import { StatusMessages } from "@/components/search-form/status-message";

export const Form = () => {
  //
  //
  const [status, setStatus] = useAtom(statusAtom);

  const [file, setFile] = useState<File>();
  const [keywords, setKeywords] = useAtom(keywordAtom);
  const [nameOption, setNameOption] = useAtom(nameOptionAtom);

  const customName = useAtomValue(customNameAtom);
  const setKeywordsList = useSetAtom(keywordsListAtom);
  const setDownloadUrl = useSetAtom(downloadUrlAtom);

  useEffect(() => {
    if (!keywords?.length) {
      setKeywordsList([]);
      return;
    }

    const timeout = setTimeout(() => {
      setKeywordsList([...keywordsSplitWithRegex(keywords)]);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [keywords]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus({ type: "initial" });
    setDownloadUrl(undefined);

    if (!file || !keywords || (nameOption === "custom" && customName === "")) {
      setStatus({ type: "error", message: "Please complete the form." });
      return;
    }

    const maxSizeInBytes = 4.4 * 1024 * 1024; // 4.4 MB'ın byte cinsinden karşılığı

    if (file.size > maxSizeInBytes) {
      setStatus({ type: "error", message: "Maximum File Size is 4.5 MB." });
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setDownloadUrl(json.url);
      setStatus({ type: "success" });
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
        <InputGroup>
          <Label htmlFor="keywords">Enter your filter sentences.</Label>
          <Input
            type="text"
            id="keywords"
            placeholder="complete, true etc.."
            onChange={(e) => setKeywords(e.target?.value)}
          />
        </InputGroup>
        <KeywordsList />
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
