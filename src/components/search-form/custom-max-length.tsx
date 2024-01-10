import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { WarningMessage } from "@/components/search-form/warning-message";
import { lengthOptionAtom } from "@/atoms/search-form-atoms";
import { SuccessMessage } from "@/components/search-form/success-message";

type TProps = React.FC<{}>;
export const CustomMaxLength: TProps = () => {
  const [value, setValue] = useAtom(lengthOptionAtom);

  return (
    <InputGroup>
      <SuccessMessage />
      <Label htmlFor="custom-length">Output Log Length.</Label>
      <RadioGroup name={"custom-length"} defaultValue={value}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="r1" onClick={() => setValue("all")} />
          <Label htmlFor="r1">All</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="first-line"
            id="r2"
            onClick={() => setValue("find-first")}
          />
          <Label htmlFor="r2">Find First</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="first-custom"
            id="r2"
            onClick={() => setValue("first-custom")}
          />
          <Label htmlFor="r2">First Custom</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="last-custom"
            id="r2"
            onClick={() => setValue("last-custom")}
          />
          <Label htmlFor="r2">Last Custom</Label>
        </div>
      </RadioGroup>
    </InputGroup>
  );
};
