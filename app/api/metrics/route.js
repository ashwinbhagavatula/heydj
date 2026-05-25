import { NextRequest } from "next/server";
import client from "prom-client";

// Initialize Prometheus registry
const register = new client.Registry();

// Define an HTTP request counter metric
const httpRequestsTotal = new client.Counter({
  name: "http_get_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route"],
});

// Register the metric
register.registerMetric(httpRequestsTotal);
register.setDefaultLabels({ app: "heydj" });
client.collectDefaultMetrics({ register });

// Handle GET requests
export async function GET(req) {
  httpRequestsTotal.inc({ method: "GET", route: "/api/metrics" });

  const metrics = await register.metrics();
  return new Response(metrics, {
    status: 200,
    headers: { "Content-Type": register.contentType },
  });
}
