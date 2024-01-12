import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSetAtom } from "jotai/index";
import { dateOptionAtom } from "@/atoms/search-form-atoms";

type TProps = React.FC<{}>;
export const CustomCalendarOption: TProps = () => {
  const setDateOption = useSetAtom(dateOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <Label>Customize Date.</Label>
        <RadioGroup defaultValue={"default"}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1"
              onClick={() => setDateOption("default")}
            />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="select"
              id="r2"
              onClick={() => setDateOption("select")}
            />
            <Label htmlFor="r2">Select</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
