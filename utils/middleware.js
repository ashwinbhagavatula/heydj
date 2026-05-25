import { NextRequest, NextResponse } from "next/server";
import client from "prom-client";

// Initialize Prometheus registry (if not already registered)
const register = new client.Registry();

const httpRequestsTotal = new client.Counter({
  name: "http_get_requests_total",
  help: "Total number of HTTP GET requests",
  labelNames: ["method", "route"],
});

// Register metrics
if (!register.getSingleMetric("http_requests_total")) {
  register.registerMetric(httpRequestsTotal);
}

export function middleware(req) {
  const url = req.nextUrl.pathname;

  // Increment counter for all GET requests
  if (req.method === "GET") {
    httpRequestsTotal.inc({ method: "GET", route: url });
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*", // This applies the middleware to all routes
};
