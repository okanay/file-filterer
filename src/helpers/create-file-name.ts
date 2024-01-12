import { TNameOption } from "@/atoms/search-form-atoms";

export const createFileName = (
  name: string,
  nameOption: TNameOption,
  customName: string
) => {
  const type = name.split(".").at(-1);

  switch (nameOption) {
    case "default": {
      return `filtered.${type}`;
    }
    case "file-name": {
      return name;
    }
    case "custom-with-file-name": {
      return `${customName}-${name}.${type}`;
    }
    case "custom": {
      return `${customName}.${type}`;
    }
  }
};
