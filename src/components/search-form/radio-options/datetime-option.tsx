import { InputGroup } from "@/components/search-form/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { dateTimeOptionAtom } from "@/atoms/search-form-atoms";
import { OptionHeaderIcon } from "@/components/ui/option-header-icon";
import { OptionHeader } from "@/components/ui/option-header";
import { Label } from "@/components/ui/label";

export const DatetimeOption = () => {
  const [filterOption, setFilterOption] = useAtom(dateTimeOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <OptionHeaderIcon name={"time"}>
          <OptionHeader>Customize Time.</OptionHeader>
        </OptionHeaderIcon>
        <RadioGroup name={"match-one"} defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1-date"
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1-date">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="select"
              id="r2-date"
              onClick={() => setFilterOption("target")}
            />
            <Label htmlFor="r2-date">Target Time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="between"
              id="r3-date"
              onClick={() => setFilterOption("between")}
            />
            <Label htmlFor="r3-date">Between Time</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
