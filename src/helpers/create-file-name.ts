export const createFileName = (
  name: string,
  nameOption: string,
  customName: string
) => {
  const type = name.split(".").at(-1);

  if (nameOption === "custom") {
    return `${customName}.${type}`;
  }

  return `filtered.${type}`;
};
