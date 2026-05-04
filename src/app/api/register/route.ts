import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { checkRegistrationRateLimit } from "@/lib/api-auth";
import { sendRegistrationEmail } from "@/lib/email";

// Bangladeshi phone regex: starts with 01, followed by 9 digits
const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

const registrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .transform((v) => v.trim()),
  batch: z
    .string()
    .min(1, "Batch/Passing year is required")
    .max(20, "Invalid batch format")
    .transform((v) => v.trim()),
  phone: z
    .string()
    .regex(BD_PHONE_REGEX, "Please enter a valid Bangladeshi phone number (e.g., 01XXXXXXXXX)"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  profession: z
    .string()
    .max(100, "Profession is too long")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .max(100, "Location is too long")
    .optional()
    .or(z.literal("")),
  attending: z.enum(["yes", "no"]).default("yes"),
  guests: z
    .number()
    .int()
    .min(0, "Guests cannot be negative")
    .max(10, "Maximum 10 guests allowed")
    .default(0),
  message: z
    .string()
    .max(1000, "Message is too long (max 1000 characters)")
    .optional()
    .or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const { allowed, retryAfter } = checkRegistrationRateLimit(request);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        {
          status: 429,
          headers: retryAfter ? { "Retry-After": retryAfter.toString() } : undefined,
        }
      );
    }

    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        {
          error: firstError?.message || "Validation failed",
          details: parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check duplicate phone
    const existing = await db.alumniRegistration.findUnique({
      where: { phone: data.phone },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This phone number has already been registered." },
        { status: 409 }
      );
    }

    const registration = await db.alumniRegistration.create({
      data: {
        name: data.name,
        batch: data.batch,
        phone: data.phone,
        email: data.email || null,
        profession: data.profession || null,
        location: data.location || null,
        attending: data.attending,
        guests: data.guests,
        message: data.message || null,
      },
    });

    // Send email notification (fire-and-forget, non-blocking)
    sendRegistrationEmail({
      name: data.name,
      batch: data.batch,
      phone: data.phone,
      email: data.email || undefined,
      profession: data.profession || undefined,
      location: data.location || undefined,
      attending: data.attending,
      guests: data.guests,
      message: data.message || undefined,
    }).catch((err) => {
      console.error("[register] Email send failed (non-critical):", err);
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: registration.id,
          name: registration.name,
          batch: registration.batch,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again later." },
      { status: 500 }
    );
  }
}
