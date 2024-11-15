import { z } from "zod";

const MajorEnum = z.enum([
  "akinci",
  "tb2",
  "hr",
  "supervisor",
  "manager",
  "else",
]);
const ClassEnum = z.enum([
  "operator",
  "payload",
  "ammunition",
  "avionics",
  "mechanics",
  "else",
]);

export const employeeSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z
    .string()
    .regex(/^(091|092|093|094|095)\d{7}$/, {
      message:
        "Phone number must be a valid Libyan number starting with 091-095 and 10 digits long",
    })
    .optional(),
  major: MajorEnum,
  class: ClassEnum,
  startDate: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date().optional()
  ),
  active: z.boolean().optional().default(true),
});
