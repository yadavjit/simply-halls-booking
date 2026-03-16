import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";

export async function POST(req: Request) {

  const body = await req.json();

  await connectDB();

  const booking = await Booking.create(body);

  return Response.json({
    success: true,
    booking,
  });

}