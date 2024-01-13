import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { lineOptionAtom } from "@/atoms/search-form-atoms";
import { useAtom } from "jotai/index";
import { LabelWithIcon } from "@/components/ui/label-icon";

export const LineOption = () => {
  const [filterOption, setFilterOption] = useAtom(lineOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <LabelWithIcon name={"line"}>
          <Label>Output Line Number.</Label>
        </LabelWithIcon>
        <RadioGroup defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1-line"
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1-line">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="add-line"
              id="r2-line"
              onClick={() => setFilterOption("add-line")}
            />
            <Label htmlFor="r2-space">Add Line Number</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
