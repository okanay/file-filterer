import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { nameOptionAtom } from "@/atoms/search-form-atoms";
import { OptionHeaderIcon } from "@/components/ui/option-header-icon";
import { OptionHeader } from "@/components/ui/option-header";

export const NameOption = () => {
  const [filterOption, setFilterOption] = useAtom(nameOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <OptionHeaderIcon name={"name"}>
          <OptionHeader>Output File Name.</OptionHeader>
        </OptionHeaderIcon>
        <RadioGroup name={"name-option"} defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1-name"
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1-name">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="file-name"
              id="r2-name"
              onClick={() => setFilterOption("file-name")}
            />
            <Label htmlFor="r2-name">File Name</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="custom"
              id="r3-name"
              onClick={() => setFilterOption("custom")}
            />
            <Label htmlFor="r3-name">Custom</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="custom-with-file-name"
              id="r4-name"
              onClick={() => setFilterOption("custom-with-file-name")}
            />
            <Label htmlFor="r4-name">Custom With File Name</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
