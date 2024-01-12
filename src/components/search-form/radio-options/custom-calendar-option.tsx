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
              id="r1"
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="between-one"
              id="r2"
              onClick={() => setFilterOption("between-one")}
            />
            <Label htmlFor="r2">Select Date</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="between-two"
              id="r3"
              onClick={() => setFilterOption("between-two")}
            />
            <Label htmlFor="r2">Between Date</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
