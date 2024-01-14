import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { lengthOptionAtom } from "@/atoms/search-form-atoms";
import { OptionHeaderIcon } from "@/components/ui/option-header-icon";
import { OptionHeader } from "@/components/ui/option-header";

export const LengthOption = () => {
  const [filterOption, setFilterOption] = useAtom(lengthOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <OptionHeaderIcon name={"length"}>
          <OptionHeader>Output Log Length.</OptionHeader>
        </OptionHeaderIcon>
        <RadioGroup name={"custom-length"} defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="all"
              id="r1-length"
              onClick={() => setFilterOption("all")}
            />
            <Label htmlFor="r1-length">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="find-line"
              id="r2-length"
              onClick={() => setFilterOption("find-first")}
            />
            <Label htmlFor="r2-length">Find First</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="find-last"
              id="r3-length"
              onClick={() => setFilterOption("find-last")}
            />
            <Label htmlFor="r3-length">Find Last</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="first-custom"
              id="r4-length"
              onClick={() => setFilterOption("first-custom")}
            />
            <Label htmlFor="r4-length">First Custom</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="last-custom"
              id="r5-length"
              onClick={() => setFilterOption("last-custom")}
            />
            <Label htmlFor="r5-length">Last Custom</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
