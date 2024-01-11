import { z } from "zod";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["log"];

export const fileSchema = z
  .custom<File>()
  .refine((file) => file !== undefined, "Expected file")
  .refine((file) => {
    return file?.size <= MAX_FILE_SIZE;
  }, `File size should be less than 20MB.`)
  .refine(
    (file) =>
      ACCEPTED_IMAGE_TYPES.includes(file?.name.split(".").at(-1) as string),
    "Only these type are allowed .log"
  );

const dateSchema = z.date({
  required_error: "Please select a date and time",
  invalid_type_error: "That's not a date!",
});

export const formValidation = z
  .object({
    file: fileSchema,
    keywords: z.string().min(1, { message: "Please add some keywords." }),
    nameOption: z.string(),
    customName: z.string(),
    lengthOption: z.string(),
    customLength: z.number(),
    dateOption: z.string(),
    customDate: z.any(),
  })
  .superRefine((data, ctx) => {
    if (data.nameOption === "custom") {
      if (data.customName.length <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please add your custom file name.",
        });
      }
    } else if (
      data.lengthOption === "first-custom" ||
      data.lengthOption === "last-custom"
    ) {
      if (data.customLength <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please set your custom line length.",
        });
      }
    } else if (data.dateOption === "select") {
      const checkDate = dateSchema.safeParse(new Date(data.customDate));

      if (!checkDate.success) {
        ctx.addIssue({
          code: "custom",
          message: checkDate.error.errors.at(0)?.message,
        });
      }
    }
  });
