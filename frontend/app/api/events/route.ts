import { NextRequest } from "next/server";
import { getEvents } from "./get-events";

export const GET = async (req: NextRequest) => {
  const searchParams = new URL(req.url).searchParams;

  const events = await getEvents({
    search: searchParams.get("q"),
    sortDirection: searchParams.get("sort-dir"),
    sortKey: searchParams.get("sort-key"),
    status: searchParams.get("rfp-status"),
  });

  return Response.json({ events });
};
