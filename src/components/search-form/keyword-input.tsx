import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { KeywordsList } from "@/components/search-form/keywords-list";
import { useEffect } from "react";
import { keywordsSplitWithRegex } from "@/helpers/keyword-regex";
import { useAtom, useSetAtom } from "jotai/index";
import { keywordAtom, keywordsListAtom } from "@/atoms/form-atoms";

export const KeywordInput = () => {
  const [keywords, setKeywords] = useAtom(keywordAtom);
  const setKeywordsList = useSetAtom(keywordsListAtom);

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
  }, [keywords, setKeywordsList]);

  return (
    <>
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
    </>
  );
};
