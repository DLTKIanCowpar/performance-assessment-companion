// Health check endpoint for Canvas deploy probes.
// force-dynamic ensures this is always served live (never statically cached),
// so the platform health check reliably gets a 200 after cold start.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true, status: "ok" });
}
