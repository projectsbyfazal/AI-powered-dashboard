"use client";

import { healthStats } from "@/mockDatas";
import WidgetCard from "../dashboard/WidgetCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Circle = ({ percent, stroke }) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <svg width="70" height="70">

            <circle
                cx="35"
                cy="35"
                r={radius}
                strokeWidth="6"
                className="stroke-gray-200"
                fill="none"
            />

            <circle
                cx="35"
                cy="35"
                r={radius}
                strokeWidth="6"
                className={`${stroke}`}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 35 35)"
            />
        </svg>
    );
};

const HealthWidget = () => {

    const [recommendations, setRecommendations] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post("/api/chat", { message: "Give your insights or recommendations or suggestion based on my health data", chats: "[]" });
                setRecommendations(data?.reply || "")
            } catch (error) {

            }
        })()
    }, [])

    return (
        <WidgetCard title="Health">
            <div className="w-full bg-white rounded-xl p-4 flex flex-col border border-gray-200">

                <div className="flex justify-between items-center">

                    {healthStats.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">

                            <div className="relative">
                                <Circle percent={item.percent} stroke={item.stroke} />
                                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
                                    {item.percent}%
                                </div>
                            </div>

                            <div className="text-xs text-gray-500 mt-2">
                                {item.label}
                            </div>

                            <div className="text-sm font-medium text-gray-800">
                                {item.value}
                            </div>
                        </div>
                    ))}

                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="bg-green-50 text-green-700 text-xs p-3 rounded-lg">
                    <strong>AI -</strong> {recommendations || "Wait! AI Suggesting something..."}
                </div>

            </div>
        </WidgetCard>
    );
};

export default HealthWidget;