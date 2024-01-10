import { Badge } from "@/components/ui/badge";
import { nanoid } from "nanoid";
import { useAtom } from "jotai/index";
import { keywordsListAtom } from "@/atoms/form-atoms";

export const KeywordsList = () => {
  const [keywordsList, setKeywordsList] = useAtom(keywordsListAtom);

  return keywordsList.length ? (
    <div className={"flex max-w-[320px] flex-wrap gap-2"}>
      {keywordsList.map((key) => (
        <Badge className={"py-1.5"} key={nanoid()}>
          {key}
        </Badge>
      ))}
    </div>
  ) : null;
};
