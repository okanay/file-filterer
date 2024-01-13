import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/search-form/input-group";
import { useSetAtom } from "jotai/index";
import { useAtomValue } from "jotai";
import { customNameAtom, nameOptionAtom } from "@/atoms/search-form-atoms";
import { Separator } from "@/components/ui/separator";

export const NameInput = () => {
  const setCustomName = useSetAtom(customNameAtom);
  const nameOption = useAtomValue(nameOptionAtom);

  // prettier-ignore
  const showInput = nameOption === "custom-with-file-name" || nameOption === "custom";

  return (
    showInput && (
      <>
        <Separator />
        <InputGroup>
          <Label htmlFor="customName">Enter your custom file name.</Label>
          <Input
            type="text"
            id="customName"
            placeholder="my-file-name etc.."
            onChange={(e) => setCustomName(e.target?.value)}
          />
        </InputGroup>
      </>
    )
  );
};
