import { InputGroup } from "@/components/search-form/input-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSetAtom } from "jotai/index";
import { fileAtom } from "@/atoms/search-form-atoms";
import { Separator } from "@/components/ui/separator";

export const FileInput = () => {
  const setFile = useSetAtom(fileAtom);

  return (
    <>
      <InputGroup>
        <Label htmlFor="file">Your File.</Label>
        <Input
          id="file"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
      </InputGroup>
    </>
  );
};
