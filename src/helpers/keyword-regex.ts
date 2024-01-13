export const keywordsSplitWithRegex = (keywords: string) => {
  let splitKeywords: any = keywords
    .split(" ")
    .filter((keyword) => keyword.length >= 3)
    .map((key) => {
      return key.replace(/[,.!]/g, "");
    })
    .reduce((acc, curr) => {
      if (!acc.has(curr)) {
        acc.add(curr);
      }

      return acc;
    }, new Set());

  return splitKeywords.values();
};

export const removeKeyword = (targetKeyword: string, inputText: string) => {
  // 1. Input metni kelimelere ayırın.
  let keywords = inputText.split(" ");

  // 2. Hedef anahtar kelimeyi içeren kelimeleri bulun.
  const targetKeywords = keywords.filter(
    (keyword) => keyword === targetKeyword
  );

  // 3. Hedef anahtar kelimeleri input metinden kaldırın.
  for (const targetKeyword of targetKeywords) {
    keywords = keywords.filter((keyword) => keyword !== targetKeyword);
  }

  // 4. Değiştirilmiş input metnini döndürün.
  return keywords.join(" ");
};
