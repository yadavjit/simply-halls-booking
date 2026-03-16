// import { connectDB } from "@/lib/db";
// import Booking from "@/lib/models/Booking";

// export async function POST(req: Request) {

//   const body = await req.json();

//   await connectDB();

//   const booking = await Booking.create(body);

//   return Response.json({
//     success: true,
//     booking,
//   });

// }

import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const hallId = searchParams.get("hallId");
  const date = searchParams.get("date");

  await connectDB();

  const bookings = await Booking.find({
    hallId,
    date,
  }).lean();

  return Response.json({
    success: true,
    bookings,
  });

}