import { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/search-form/input-group";
import { useAtom } from "jotai/index";
import { customNameAtom, nameOptionAtom } from "@/atoms/form-atoms";

export const CustomNameInput = () => {
  const [customName, setCustomName] = useAtom(customNameAtom);
  const [nameOption, setNameOption] = useAtom(nameOptionAtom);

  return (
    <>
      {nameOption === "custom" && (
        <InputGroup>
          <Label htmlFor="customName">Enter your file name.</Label>
          <Input
            type="text"
            id="customName"
            placeholder="my-file-name etc.."
            onChange={(e) => setCustomName(e.target?.value)}
          />
        </InputGroup>
      )}
    </>
  );
};
