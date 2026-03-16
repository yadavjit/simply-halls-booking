// import { connectDB } from "@/lib/db";
// import Hall from "@/lib/models/Hall";

// export default async function HallDetailsPage({ params }: any) {

//   await connectDB();

//   const hall = await Hall.findById(params.id);

//   if (!hall) {
//     return <div>Hall not found</div>;
//   }

//   return (

//     <div className="p-10">

//       <h1 className="text-3xl font-bold mb-4">
//         {hall.title}
//       </h1>

//       <p className="text-gray-500">
//         {hall.city}
//       </p>

//       <p className="mt-4">
//         {hall.description}
//       </p>

//       <p className="mt-4">
//         Capacity: {hall.capacity}
//       </p>

//       <p className="mt-2 font-semibold">
//         £{hall.pricePerHour}/hour
//       </p>

//       <div className="mt-6">

//         <h2 className="text-xl font-semibold mb-2">
//           Amenities
//         </h2>

//         <ul className="list-disc ml-6">
//           {hall.amenities.map((a: string, i: number) => (
//             <li key={i}>{a}</li>
//           ))}
//         </ul>

//       </div>

//     </div>

//   );
// }
// ----------------------------------------------------------------------------------------------
import { connectDB } from "@/lib/db";
import Hall from "@/lib/models/Hall";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function HallDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;   // ✅ unwrap params

    await connectDB();

    const hall = await Hall.findById(id).lean();

    if (!hall) {
        notFound();
    }

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold">
                {hall.title}
            </h1>

            <p className="text-gray-500">
                {hall.city}
            </p>

            <p className="mt-4">
                Capacity: {hall.capacity}
            </p>

            <p className="font-semibold">
                £{hall.pricePerHour}/hour
            </p>

            {/* <button className="mt-6 bg-black text-white px-6 py-3 rounded">
                Book Now
            </button> */}
            <Link
                href={`/halls/${hall._id}/book`}
                className="mt-6 inline-block bg-black text-white px-6 py-3 rounded"
            >
                Book Now
            </Link>

        </div>
    );
}