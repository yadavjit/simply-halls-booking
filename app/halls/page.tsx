import { connectDB } from "@/lib/db";
import Hall from "@/lib/models/Hall";

export default async function HallsPage() {

  await connectDB();

  const halls = await Hall.find({ isActive: true });

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Available Halls
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {halls.map((hall: any) => (

          <div
            key={hall._id}
            className="border p-4 rounded-lg shadow"
          >

            <h2 className="text-xl font-semibold">
              {hall.title}
            </h2>

            <p className="text-gray-500">
              {hall.city}
            </p>

            <p className="mt-2">
              Capacity: {hall.capacity}
            </p>

            <p className="mt-1 font-semibold">
              £{hall.pricePerHour}/hour
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}