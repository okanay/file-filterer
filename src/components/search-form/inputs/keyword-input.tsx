import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { KeywordsList } from "@/components/search-form/keywords-list";
import { useLayoutEffect } from "react";
import { keywordsSplitWithRegex, removeKeyword } from "@/helpers/keyword-regex";
import { useAtom, useSetAtom } from "jotai/index";
import { keywordAtom, keywordsListAtom } from "@/atoms/search-form-atoms";
import { Separator } from "@/components/ui/separator";

export const KeywordInput = () => {
  const [keywords, setKeywords] = useAtom(keywordAtom);
  const setKeywordsList = useSetAtom(keywordsListAtom);

  useLayoutEffect(() => {
    if (!keywords?.length) {
      setKeywordsList([]);
      return;
    }

    const timeout = setTimeout(() => {
      setKeywordsList([...keywordsSplitWithRegex(keywords)]);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [keywords, setKeywordsList]);

  const handleRemoveKeyword = (key: string) => {
    setKeywords(removeKeyword(key, keywords as string));
  };

  return (
    <>
      <InputGroup>
        <Label htmlFor="keywords">Enter your filter sentences.</Label>
        <Input
          type="text"
          id="keywords"
          value={keywords}
          placeholder="complete, true etc.."
          onChange={(e) => setKeywords(e.target?.value)}
        />
      </InputGroup>
      <KeywordsList removeHandle={handleRemoveKeyword} />
    </>
  );
};
