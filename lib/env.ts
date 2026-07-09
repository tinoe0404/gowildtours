import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string().min(1, "PayPal Client ID is required"),
  PAYPAL_CLIENT_SECRET: z.string().min(1, "PayPal Client Secret is required"),
  PAYPAL_API_BASE: z.string().default("https://api-m.sandbox.paypal.com"),
  SMTP_HOST: z.string().optional().default("smtp.gmail.com"),
  SMTP_PORT: z.string().optional().default("465"),
  SMTP_SECURE: z.string().optional().default("true"),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional().default("bookings@gowildtours.com"),
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_REPO: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
