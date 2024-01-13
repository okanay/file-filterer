import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { dateOptionAtom } from "@/atoms/search-form-atoms";

export const CustomCalendarOption = () => {
  const [filterOption, setFilterOption] = useAtom(dateOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <Label>Customize Date.</Label>
        <RadioGroup defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1-date-option"
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1-date-option">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="between-one"
              id="r2-date-option"
              onClick={() => setFilterOption("target")}
            />
            <Label htmlFor="r2-date-option">Target Date</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="between-two"
              id="r3-date-option"
              onClick={() => setFilterOption("between")}
            />
            <Label htmlFor="r3-date-option">Between Date</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
