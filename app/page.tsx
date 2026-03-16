// import { connectDB } from "@/lib/db";

// export default async function Home() {

//   await connectDB();

//   return (
//     <div>
//       <h1>Database Connected Successfully</h1>
//     </div>
//   );
// }

import Link from "next/link";

export default function Home() {

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Simply Halls
      </h1>

      <Link
        href="/halls"
        className="bg-blue-500 text-white px-6 py-3 rounded"
      >
        Browse Halls
      </Link>

    </div>
  );

}