import { api } from "@/app/lib/api";

export const POST = async () => {
  try {
    await api.get("/seed");
    return Response.json(null);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
};
