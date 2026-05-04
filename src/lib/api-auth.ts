import { NextRequest, NextResponse } from "next/server";

// Simple API key authentication for admin routes
// In production, use NextAuth.js or proper session-based auth
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "bairs-admin-2026-secret-key";

// Simple in-memory rate limiter
const rateLimiter = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimiter.get(ip);

  if (!record || now > record.resetAt) {
    rateLimiter.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimiter.entries()) {
    if (now > record.resetAt) {
      rateLimiter.delete(key);
    }
  }
}, 300_000);

// Middleware for admin routes - checks API key from header
export function authenticateAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const queryKey = request.nextUrl.searchParams.get("api_key");

  if (queryKey === ADMIN_API_KEY) return true;
  if (authHeader === `Bearer ${ADMIN_API_KEY}`) return true;

  return false;
}

// Middleware for registration rate limiting
export function checkRegistrationRateLimit(request: NextRequest): { allowed: boolean; retryAfter?: number } {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             request.headers.get("x-real-ip") || 
             "unknown";
  
  const allowed = checkRateLimit(ip);
  
  if (!allowed) {
    const record = rateLimiter.get(ip);
    const retryAfter = record ? Math.ceil((record.resetAt - Date.now()) / 1000) : 60;
    return { allowed: false, retryAfter };
  }
  
  return { allowed: true };
}
