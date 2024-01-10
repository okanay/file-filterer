import { atom } from "jotai";

type TStatus = {
  type: "initial" | "error" | "loading" | "success";
  message?: string;
};

type TNameOption = "default" | "custom";

export const fileAtom = atom<File | undefined>(undefined);
export const statusAtom = atom<TStatus>({ type: "initial" });
export const downloadUrlAtom = atom<undefined | string>(undefined);
export const keywordAtom = atom<undefined | string>("");
export const customNameAtom = atom<undefined | string>("");
export const nameOptionAtom = atom<TNameOption>("default");
export const keywordsListAtom = atom<string[]>([]);
