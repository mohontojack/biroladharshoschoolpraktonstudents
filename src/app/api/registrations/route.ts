import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateAdmin } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    if (!authenticateAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin API key required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const batch = searchParams.get("batch") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    if (batch) {
      where.batch = { contains: batch };
    }

    const [registrations, total] = await Promise.all([
      db.alumniRegistration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.alumniRegistration.count({ where }),
    ]);

    // Get accurate total counts (not page-limited)
    const [attendingTotal, notAttendingTotal] = await Promise.all([
      db.alumniRegistration.count({ where: { ...where, attending: "yes" } }),
      db.alumniRegistration.count({ where: { ...where, attending: "no" } }),
    ]);

    return NextResponse.json({
      success: true,
      data: registrations,
      stats: {
        total,
        attending: attendingTotal,
        notAttending: notAttendingTotal,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch registrations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations." },
      { status: 500 }
    );
  }
}
