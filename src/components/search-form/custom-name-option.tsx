import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { nameOptionAtom } from "../../atoms/search-form-atoms";
import { CustomNameInput } from "@/components/search-form/custom-name-input";

type TProps = React.FC<{}>;
export const CustomNameOption: TProps = () => {
  const [nameOption, setNameOption] = useAtom(nameOptionAtom);

  return (
    <InputGroup>
      <Label htmlFor="name-option">Customize File Name.</Label>
      <RadioGroup name={"name-option"} defaultValue={nameOption}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="default"
            id="r1"
            onClick={() => setNameOption("default")}
          />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="custom"
            id="r2"
            onClick={() => setNameOption("custom")}
          />
          <Label htmlFor="r2">Custom</Label>
        </div>
      </RadioGroup>
    </InputGroup>
  );
};
