import { z } from "zod";

const MAX_FILE_SIZE = 4.5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["log", "txt"];

export const fileSchema = z
  .custom<File>()
  .refine((file) => file !== undefined, "Expected file")
  .refine((file) => {
    return file?.size <= MAX_FILE_SIZE;
  }, `File size should be less than 4.5mb.`)
  .refine(
    (file) =>
      ACCEPTED_IMAGE_TYPES.includes(file?.name.split(".").at(-1) as string),
    "Only these types are allowed .log, .txt."
  );

export const formValidation = z
  .object({
    file: fileSchema,
    keywords: z.string().min(1, { message: "Please add some keywords." }),
    nameOption: z.string(),
    customName: z.string(),
    lengthOption: z.string(),
    customLength: z.number(),
  })
  .superRefine((data, ctx) => {
    if (data.nameOption === "custom") {
      if (data.customName.length <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please add your custom file name.",
        });
      }
    }
    if (
      data.lengthOption === "first-custom" ||
      data.lengthOption === "last-custom"
    ) {
      if (data.customLength <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please set your custom line length.",
        });
      }
    }
  });
