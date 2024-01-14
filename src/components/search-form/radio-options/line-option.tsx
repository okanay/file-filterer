import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { lineOptionAtom } from "@/atoms/search-form-atoms";
import { useAtom } from "jotai/index";
import { OptionHeaderIcon } from "@/components/ui/option-header-icon";
import { OptionHeader } from "@/components/ui/option-header";

export const LineOption = () => {
  const [filterOption, setFilterOption] = useAtom(lineOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <OptionHeaderIcon name={"line"}>
          <OptionHeader>Output Line Number.</OptionHeader>
        </OptionHeaderIcon>
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
            <Label htmlFor="r2-line">Add Line Number</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
