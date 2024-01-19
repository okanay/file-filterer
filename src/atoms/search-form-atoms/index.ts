import { atom } from "jotai";

export type TStatus = {
  type: "initial" | "error" | "loading" | "success";
  message?: string;
};
export const statusAtom = atom<TStatus>({ type: "initial" });
export const fileAtom = atom<File | undefined>(undefined);
export const downloadUrlAtom = atom<undefined | string>(undefined);

export const keywordAtom = atom<undefined | string>("");
export const keywordsListAtom = atom<string[]>([]);

export type TNameOption =
  | "default"
  | "custom"
  | "file-name"
  | "custom-with-file-name";
export const nameOptionAtom = atom<TNameOption>("default");
export const customNameAtom = atom<undefined | string>("");

export type TLengthOption =
  | "all"
  | "find-first"
  | "find-last"
  | "first-custom"
  | "last-custom";
export const lengthOptionAtom = atom<TLengthOption>("all");
export const customLengthAtom = atom<undefined | number>(0);

export type TDateTimeValue = {
  from: {
    hour: number;
    minute: number;
  };
  to: {
    hour: number;
    minute: number;
  };
};
export const dateTimeValueAtom = atom<TDateTimeValue>({
  from: {
    hour: 0,
    minute: 0,
  },
  to: {
    hour: 0,
    minute: 0,
  },
});

export type TDateOption = "default" | "target" | "between";
export const dateOptionAtom = atom<TDateOption>("default");
export const dateValueAtom = atom<Date | undefined>(undefined);

export type TDateTimeOption = "default" | "target" | "between";
export const dateTimeOptionAtom = atom<TDateTimeOption>("default");

export type TDateValues = { from: Date; to: Date };
export const dateValuesAtom = atom<TDateValues | undefined>(undefined);

export type TFilterOption = "match one" | "match all" | "none";
export const filterOptionAtom = atom<TFilterOption>("match one");

export type TSpaceOption = "default" | "add-space";
export const spaceOptionAtom = atom<TSpaceOption>("default");

export type TSpaceValues = { line: number; space: number };
export const spaceValuesAtom = atom<TSpaceValues | undefined>({
  line: 1,
  space: 1,
});

export type TLineOption = "default" | "add-line";
export const lineOptionAtom = atom<TLineOption>("default");
