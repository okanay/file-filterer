import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { nameOptionAtom } from "@/atoms/search-form-atoms";

export const CustomNameOption = () => {
  const [filterOption, setFilterOption] = useAtom(nameOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <Label htmlFor="name-option">Customize File Name.</Label>
        <RadioGroup name={"name-option"} defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1"
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="custom"
              id="r2"
              onClick={() => setFilterOption("custom")}
            />
            <Label htmlFor="r2">Custom</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
