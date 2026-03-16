import { connectDB } from "@/lib/db";
import Hall from "@/lib/models/Hall";
import BookingForm from "@/components/BookingForm";

export default async function BookingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;

    await connectDB();

    // const hall = await Hall.findById(id).lean();
    const hallDoc = await Hall.findById(id).lean();

    const hall = {
        ...hallDoc,
        _id: hallDoc._id.toString(),              
        // here by using .toString() we convert the mongo object id to string as server side understand objectId but client side only understood string, number, boolean, arrays, plain objects
    };

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold">
                Book {hall.title}
            </h1>

            <p className="text-gray-500 mt-2">
                {hall.city}
            </p>

            <BookingForm hall={hall} />

        </div>

    );
}