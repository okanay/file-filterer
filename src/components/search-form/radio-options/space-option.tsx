import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { spaceOptionAtom } from "@/atoms/search-form-atoms";
import { useAtom } from "jotai/index";
import { LabelWithIcon } from "@/components/ui/label-icon";

export const SpaceOption = () => {
  const [filterOption, setFilterOption] = useAtom(spaceOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <LabelWithIcon name={"space"}>
          <Label htmlFor="name-option">Output Add Space.</Label>
        </LabelWithIcon>
        <RadioGroup name={"match-one"} defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1-space"
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1-space">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="add-space"
              id="r2-space"
              onClick={() => setFilterOption("add-space")}
            />
            <Label htmlFor="r2-space">Add Space</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
