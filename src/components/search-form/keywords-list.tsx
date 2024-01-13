import { keywordsListAtom } from "@/atoms/search-form-atoms";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";
import { Badge } from "@/components/ui/badge";

type TProps = React.FC<{
  removeHandle: (key: string) => void;
}>;
export const KeywordsList: TProps = ({ removeHandle }) => {
  const keywordsList = useAtomValue(keywordsListAtom);

  const onBadgeClick = (key: string) => {
    removeHandle(key);
  };

  return keywordsList.length ? (
    <div className={"flex max-w-[320px] flex-wrap gap-2"}>
      {keywordsList.map((key) => (
        <Badge
          className="cursor-pointer py-1.5 transition-all duration-300 hover:scale-90 hover:bg-red-400"
          key={nanoid()}
          onClick={() => {
            onBadgeClick(key);
          }}
        >
          {key}
        </Badge>
      ))}
    </div>
  ) : null;
};
