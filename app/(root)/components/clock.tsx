"use client";
import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleTimeString("vi-VN");
    const formattedDate = time.toLocaleDateString("vi-VN");

    return (
        <div className="text-center mt-4">
            <h1 className="text-3xl font-bold">{formattedTime}</h1>
            <p className="text-lg">{formattedDate}</p>
        </div>
    );
};

export default Clock;
