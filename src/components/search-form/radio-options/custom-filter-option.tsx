import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { filterOptionAtom } from "@/atoms/search-form-atoms";
import { useAtom } from "jotai/index";

export const CustomFilterOption = () => {
  const [filterOption, setFilterOption] = useAtom(filterOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <Label htmlFor="name-option">Customize Filter Type.</Label>
        <RadioGroup name={"match-one"} defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="match one"
              id="r1"
              onClick={() => setFilterOption("match one")}
            />
            <Label htmlFor="r1">Match One Keyword</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="match all"
              id="r2"
              onClick={() => setFilterOption("match all")}
            />
            <Label htmlFor="r2">Match All Keywords</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
