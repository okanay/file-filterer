import { FormOptions } from "@/components/search-form/form-options";
import { FormRequirement } from "@/components/search-form/form-requirement";

export const Form = () => {
  return (
    <div className="flex h-full flex-col justify-center gap-12">
      <div className={"flex w-full items-center justify-center "}>
        <div className="flex w-fit flex-wrap items-center justify-center gap-x-16 gap-y-8">
          <FormRequirement />
          <FormOptions />
        </div>
      </div>
    </div>
  );
};
