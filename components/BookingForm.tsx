"use client";

import { useState, useMemo } from "react";

export default function BookingForm({ hall }: any) {

    const [date, setDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");

    const slots = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
    ];

    const price = useMemo(() => {
        if (!selectedSlot) return 0;
        return hall.pricePerHour;
    }, [selectedSlot, hall.pricePerHour]);


    const handleBooking = async () => {

        if (!date || !selectedSlot) {
            alert("Select date and slot");
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
                slot: selectedSlot,
            }),

        });

        const data = await res.json();

        if (data.success) {
            alert("Booking confirmed!");
        }

    };


    return (

        <div className="mt-8">

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

            <div className="grid grid-cols-3 gap-3">

                {slots.map((slot) => (

                    <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 border rounded ${selectedSlot === slot
                                ? "bg-black text-white"
                                : ""
                            }`}
                    >
                        {slot}
                    </button>

                ))}

            </div>

            <div className="mt-6">

                <p>
                    Selected Slot: {selectedSlot || "None"}
                </p>

                <p className="font-semibold">
                    Price: £{price}
                </p>

            </div>
            <button
                onClick={handleBooking}
                className="mt-6 bg-black text-white px-6 py-3 rounded"
            >
                Confirm Booking
            </button>
        </div>

    );
}