export const keywordsSplitWithRegex = (keywords: string) => {
  let splitKeywords: string[] = [];

  splitKeywords = keywords
    .split(" ")
    .filter((keyword) => keyword.length >= 3)
    .map((key) => {
      return key.replace(/[,.!]/g, "");
    });

  return splitKeywords;
};
