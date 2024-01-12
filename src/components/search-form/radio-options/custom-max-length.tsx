import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { lengthOptionAtom } from "@/atoms/search-form-atoms";

type TProps = React.FC<{}>;
export const CustomMaxLength: TProps = () => {
  const [value, setValue] = useAtom(lengthOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <Label htmlFor="custom-length">Output Log Length.</Label>
        <RadioGroup name={"custom-length"} defaultValue={value}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="all"
              id="r1"
              onClick={() => setValue("all")}
            />
            <Label htmlFor="r1">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="find-line"
              id="r2"
              onClick={() => setValue("find-first")}
            />
            <Label htmlFor="r2">Find First</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="find-last"
              id="r3"
              onClick={() => setValue("find-last")}
            />
            <Label htmlFor="r2">Find Last</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="first-custom"
              id="r4"
              onClick={() => setValue("first-custom")}
            />
            <Label htmlFor="r2">First Custom</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="last-custom"
              id="r5"
              onClick={() => setValue("last-custom")}
            />
            <Label htmlFor="r2">Last Custom</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
