"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TStatus =
  | "initial"
  | "loading"
  | "success"
  | "error"
  | "no-return"
  | "max-file-size";
type TNameOption = "default" | "custom";

export default function Home() {
  const [status, setStatus] = useState<TStatus>("initial");
  const [downloadUrl, setDownloadUrl] = useState<undefined | string>();

  const [keywords, setKeywords] = useState<undefined | string>();
  const [file, setFile] = useState<File>();

  const [nameOption, setNameOption] = useState<TNameOption>("default");
  const [customName, setCustomName] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("initial");
    setDownloadUrl(undefined);

    if (!file || !keywords || (nameOption === "custom" && customName === "")) {
      setStatus("error");
      return;
    }

    const maxSizeInBytes = 4.4 * 1024 * 1024; // 4.4 MB'ın byte cinsinden karşılığı

    if (file.size > maxSizeInBytes) {
      setStatus("max-file-size");
      return;
    }

    try {
      setStatus("loading");
      const data = new FormData();
      data.set("file", file);
      data.set("keywords", keywords);
      data.set("nameOption", nameOption);
      data.set("customName", customName);

      const res = await fetch("/api/file-convert", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      if (!json.success) {
        setStatus("no-return");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setDownloadUrl(json.url);
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
    }
  };

  return (
    <main>
      <div className="mx-auto flex h-screen max-w-7xl flex-col items-center justify-center tracking-wide">
        <div className={"flex flex-col justify-center md:scale-[115%]"}>
          <div className={"flex flex-col items-end sm:flex-row"}>
            <form
              onSubmit={onSubmit}
              className={"relative flex max-w-md flex-col gap-4 p-4"}
            >
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="file">Your File.</Label>
                <Input
                  id="file"
                  type="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="keywords">Enter your filter sentences.</Label>
                <Input
                  type="text"
                  id="keywords"
                  placeholder="complete, true etc.."
                  onChange={(e) => setKeywords(e.target?.value)}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-2.5">
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
              </div>

              {nameOption === "custom" && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="customName">Enter your file name.</Label>
                  <Input
                    type="text"
                    id="customName"
                    placeholder="my-file-name etc.."
                    onChange={(e) => setCustomName(e.target?.value)}
                  />
                </div>
              )}

              <Button type={"submit"} disabled={status === "loading"}>
                Filter File By Keyword.
              </Button>

              {status === "loading" && (
                <p className="absolute bottom-0 translate-y-[80%] rounded border border-amber-950/10 bg-amber-50 px-2 py-1 text-sm text-amber-500 shadow shadow-amber-950/10">
                  In progres..
                </p>
              )}

              {status === "error" && (
                <p className="absolute bottom-0 translate-y-[80%] rounded border border-rose-950/10 bg-rose-50 px-2 py-1 text-sm text-rose-500 shadow shadow-rose-950/10">
                  Please complete the form.
                </p>
              )}

              {status === "no-return" && (
                <p className="absolute bottom-0 translate-y-[80%] rounded border border-rose-950/10 bg-rose-50 px-2 py-1 text-sm text-rose-500 shadow shadow-rose-950/10">
                  The filtering based on the searched keyword could not be
                  performed.
                </p>
              )}

              {status === "max-file-size" && (
                <p className="absolute bottom-0 translate-y-[80%] rounded border border-rose-950/10 bg-rose-50 px-2 py-1 text-sm text-rose-500 shadow shadow-rose-950/10">
                  Maximum File Size is 4.5 MB.
                </p>
              )}

              {status === "success" && (
                <p className="absolute bottom-0 translate-y-[80%] rounded border border-lime-950/10 bg-lime-50 px-2 py-1 text-sm text-lime-500 shadow shadow-lime-950/10">
                  Your file is ready to download.
                </p>
              )}
            </form>
            <div>
              <Button
                asChild={true}
                className={`${
                  status !== "success" &&
                  "cursor-no-drop bg-zinc-700 opacity-75"
                }`}
              >
                <a
                  className={"my-4 cursor-pointer"}
                  href={downloadUrl}
                  target={"_blank"}
                >
                  Download File.
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
