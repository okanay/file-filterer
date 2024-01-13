import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { filterOptionAtom } from "@/atoms/search-form-atoms";
import { useAtom } from "jotai/index";
import { LabelWithIcon } from "@/components/ui/label-icon";

export const FilterOption = () => {
  const [filterOption, setFilterOption] = useAtom(filterOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <LabelWithIcon name={"filter"}>
          <Label htmlFor="name-option">Customize Filter Type.</Label>
        </LabelWithIcon>
        <RadioGroup name={"match-one"} defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="match one"
              id="r1-filter-type"
              onClick={() => setFilterOption("match one")}
            />
            <Label htmlFor="r1-filter-type">Match One Keyword</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="match all"
              id="r2-filter-type"
              onClick={() => setFilterOption("match all")}
            />
            <Label htmlFor="r2-filter-type">Match All Keywords</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
