import { connectDB } from "@/lib/db";

export default async function Home() {

  await connectDB();

  return (
    <div>
      <h1>Database Connected Successfully</h1>
    </div>
  );
}
