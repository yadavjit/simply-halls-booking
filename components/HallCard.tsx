import Link from "next/link";

export default function HallCard({ hall }: any) {

  return (

    <div className="border p-4 rounded-lg shadow">

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

      <Link
        href={`/halls/${hall._id}`}
        className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Details
      </Link>

    </div>

  );

}