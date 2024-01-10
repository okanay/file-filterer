import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TProps = React.FC<{}>;
export const CustomCalendarOption: TProps = () => {
  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <Label htmlFor="name-option">Customize Date.</Label>
        <RadioGroup name={"name-option"} defaultValue={"default"}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1"
              // onClick={() => setNameOption("default")}
            />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="select"
              id="r2"
              // onClick={() => setNameOption("custom")}
            />
            <Label htmlFor="r2">Select</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
