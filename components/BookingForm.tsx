// "use client";

// import { useState, useMemo, useEffect } from "react";

// export default function BookingForm({ hall }: any) {

//     const [date, setDate] = useState("");
//     const [selectedSlot, setSelectedSlot] = useState("");
//     const [bookedSlots, setBookedSlots] = useState<string[]>([]);

//     const slots = [
//         "09:00",
//         "10:00",
//         "11:00",
//         "12:00",
//         "13:00",
//         "14:00",
//         "15:00",
//     ];

//     const price = useMemo(() => {
//         if (!selectedSlot) return 0;
//         return hall.pricePerHour;
//     }, [selectedSlot, hall.pricePerHour]);

//     useEffect(() => {

//         if (!date) return;

//         const fetchBookings = async () => {

//             const res = await fetch(
//                 `/api/bookings?hallId=${hall._id}&date=${date}`
//             );

//             const data = await res.json();

//             const slots = data.bookings.map((b: any) => b.slot);

//             setBookedSlots(slots);

//         };

//         fetchBookings();

//     }, [date, hall._id]);


//     const handleBooking = async () => {

//         if (!date || !selectedSlot) {
//             alert("Select date and slot");
//             return;
//         }

//         const res = await fetch("/api/bookings", {

//             method: "POST",

//             headers: {
//                 "Content-Type": "application/json",
//             },

//             body: JSON.stringify({
//                 hallId: hall._id,
//                 date,
//                 slot: selectedSlot,
//             }),

//         });

//         const data = await res.json();

//         if (data.success) {
//             alert("Booking confirmed!");
//         }

//     };


//     return (

//         <div className="mt-8">

//             <div className="mb-6">

//                 <label className="block mb-2">
//                     Select Date
//                 </label>

//                 <input
//                     type="date"
//                     className="border p-2"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                 />

//             </div>

//             <div className="grid grid-cols-3 gap-3">

//                 {slots.map((slot) => (

//                     // <button
//                     //     key={slot}
//                     //     onClick={() => setSelectedSlot(slot)}
//                     //     className={`p-3 border rounded ${selectedSlot === slot
//                     //         ? "bg-black text-white"
//                     //         : ""
//                     //         }`}
//                     // >
//                     //     {slot}
//                     // </button>

//                     <button
//                         key={slot}
//                         disabled={bookedSlots.includes(slot)}
//                         onClick={() => setSelectedSlot(slot)}
//                         className={`p-3 border rounded
//     ${bookedSlots.includes(slot)
//                                 ? "bg-gray-300 cursor-not-allowed"
//                                 : selectedSlot === slot
//                                     ? "bg-black text-white"
//                                     : ""
//                             }
//   `}
//                     >{slot}</button>

//                 ))}

//             </div>

//             <div className="mt-6">

//                 <p>
//                     Selected Slot: {selectedSlot || "None"}
//                 </p>

//                 <p className="font-semibold">
//                     Price: £{price}
//                 </p>

//             </div>
//             <button
//                 onClick={handleBooking}
//                 className="mt-6 bg-black text-white px-6 py-3 rounded"
//             >
//                 Confirm Booking
//             </button>
//         </div>

//     );
// }


"use client";

import { useState, useEffect, useMemo } from "react";

export default function BookingForm({ hall }: any) {

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [bookedSlots, setBookedSlots] = useState<string[]>([]);

    const slots = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
    ];

    // Fetch bookings when date changes
    useEffect(() => {

        if (!date) return;

        const fetchBookings = async () => {

            const res = await fetch(
                `/api/bookings?hallId=${hall._id}&date=${date}`
            );

            const data = await res.json();

            // const slots = data.bookings.map((b: any) => b.slot);

            // setBookedSlots(slots);
            setBookedSlots(data.bookings);
        };

        fetchBookings();

    }, [date, hall._id]);

    // Calculate duration
    const duration = useMemo(() => {

        if (!startTime || !endTime) return 0;

        const start = parseInt(startTime.split(":")[0]);
        const end = parseInt(endTime.split(":")[0]);

        return end - start;

    }, [startTime, endTime]);



    // Calculate price
    const totalPrice = useMemo(() => {

        if (duration <= 0) return 0;

        return duration * hall.pricePerHour;

    }, [duration, hall.pricePerHour]);


    // const blockedSlots = useMemo(() => {

    //     const blocked: string[] = [];

    //     bookedSlots.forEach((booking: any) => {

    //         const start = parseInt(booking.startTime.split(":")[0]);
    //         const end = parseInt(booking.endTime.split(":")[0]);

    //         for (let i = start; i < end; i++) {

    //             blocked.push(`${i.toString().padStart(2, "0")}:00`);

    //         }

    //     });

    //     return blocked;

    // }, [bookedSlots]);


    // Handle slot click


    const blockedSlots = useMemo(() => {

        const blocked: string[] = [];

        bookedSlots.forEach((booking: any) => {

            // ✅ Skip invalid old data
            if (!booking.startTime || !booking.endTime) return;

            const start = parseInt(booking.startTime.split(":")[0]);
            const end = parseInt(booking.endTime.split(":")[0]);

            for (let i = start; i < end; i++) {

                blocked.push(`${i.toString().padStart(2, "0")}:00`);

            }

        });

        return blocked;

    }, [bookedSlots]);

    const handleSlotClick = (slot: string) => {

        if (!startTime) {
            setStartTime(slot);
            return;
        }

        if (!endTime) {
            setEndTime(slot);
            return;
        }

        // Reset if both already selected
        setStartTime(slot);
        setEndTime("");

    };



    // Save booking
    const handleBooking = async () => {

        if (!date || !startTime || !endTime) {
            alert("Select date, start time and end time");
            return;
        }

        const res = await fetch("/api/bookings", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                hallId: hall._id,
                date,
                // slot: startTime
                startTime,
                endTime,
            }),

        });

        const data = await res.json();

        if (data.success) {
            alert("Booking confirmed!");
        }

    };

    return (

        <div className="mt-8">

            {/* Date Selection */}

            <div className="mb-6">

                <label className="block mb-2">
                    Select Date
                </label>

                <input
                    type="date"
                    className="border p-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

            </div>



            {/* Slot Selection */}

            <div className="grid grid-cols-3 gap-3">

                {slots.map((slot) => {

                    // const isBooked = bookedSlots.includes(slot);

                    const isBlocked = blockedSlots.includes(slot);


                    return (

                        //             <button
                        //                 key={slot}
                        //                 disabled={isBooked}
                        //                 onClick={() => handleSlotClick(slot)}
                        //                 className={`p-3 border rounded
                        //     ${isBooked
                        //                         ? "bg-gray-300 cursor-not-allowed"
                        //                         : startTime === slot || endTime === slot
                        //                             ? "bg-black text-white"
                        //                             : ""
                        //                     }
                        //   `}
                        //             >

                        //                 {slot}

                        //             </button>

                        <button
                            key={slot}
                            disabled={isBlocked}
                            onClick={() => handleSlotClick(slot)}
                            className={`p-3 border rounded
    ${isBlocked
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : startTime === slot || endTime === slot
                                        ? "bg-black text-white"
                                        : ""
                                }
  `}
                        >{slot}</button>

                    );

                })}

            </div>



            {/* Booking Summary */}

            <div className="mt-6">

                <p>
                    Start Time: {startTime || "Not selected"}
                </p>

                <p>
                    End Time: {endTime || "Not selected"}
                </p>

                <p>
                    Duration: {duration} hours
                </p>

                <p className="font-semibold">
                    Total Price: £{totalPrice}
                </p>

            </div>



            {/* Confirm Button */}

            <button
                onClick={handleBooking}
                className="mt-6 bg-black text-white px-6 py-3 rounded"
            >
                Confirm Booking
            </button>

        </div>

    );
}