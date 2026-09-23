// zod/mini keeps the schema shared between the form and the API without shipping full Zod to the browser.
import * as z from "zod/mini";

export const projectTypes = ["Website", "Web Application", "Software", "Branding", "E-commerce", "Other"] as const;
export const budgets = ["₹50K–₹1L", "₹1L–₹3L", "₹3L–₹5L", "₹5L+", "Not sure"] as const;
export const timelines = ["ASAP", "1–2 months", "2–4 months", "Flexible"] as const;

export const leadSchema = z.object({
  projectType: z.enum(projectTypes, { error: "Choose a project type." }),
  description: z.string({ error: "Please add a little more detail (at least 20 characters)." }).check(
    z.trim(),
    z.minLength(20, "Please add a little more detail (at least 20 characters)."),
    z.maxLength(4000, "Please keep the description under 4,000 characters."),
  ),
  budget: z.enum(budgets, { error: "Choose a budget range." }),
  timeline: z.enum(timelines, { error: "Choose a timeline." }),
  name: z
    .string({ error: "Please enter your name." })
    .check(z.trim(), z.minLength(2, "Please enter your name."), z.maxLength(120, "Name is too long.")),
  email: z.email("Please enter a valid email address.").check(z.maxLength(200, "Email is too long.")),
  phone: z.optional(
    z.string().check(z.trim(), z.maxLength(40, "Phone number is too long."), z.regex(/^[+\d\s()-]*$/, "Use digits, spaces and + ( ) - only.")),
  ),
  company: z.optional(z.string().check(z.trim(), z.maxLength(160, "Company name is too long."))),
});

export type LeadInput = z.infer<typeof leadSchema>;
