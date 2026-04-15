"use client";

import { useEffect, useState } from "react";
import WidgetCard from "../dashboard/WidgetCard";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from "recharts";
import axios from "axios";

const data = [
    { day: "M", value: 4200 },
    { day: "T", value: 4500 },
    { day: "W", value: 4300 },
    { day: "T", value: 4800 },
    { day: "F", value: 5100 },
    { day: "S", value: 5000 },
    { day: "S", value: 5200 }
];

const assets = [
    { label: "Stocks", value: 60, color: "bg-indigo-500" },
    { label: "Crypto", value: 25, color: "bg-purple-500" },
    { label: "Cash", value: 15, color: "bg-gray-400" }
];

const FinanceWidget = () => {

    const [recommendations, setRecommendations] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post("/api/chat", { message: "Give your insights or recommendations or suggestion based on my Finance condition data", chats: "[]" });
                setRecommendations(data?.reply || "")
            } catch (error) {

            }
        })()
    }, [])
    return (
        <WidgetCard title="Portfolio">
            <div className="w-full bg-white rounded-xlflex flex-col ">

                {/* Top Section */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-xs text-gray-500 tracking-wide">
                            TOTAL BALANCE
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-900 mt-1">
                            ₹5,240
                        </h2>
                        <p className="text-sm text-green-600 font-medium mt-1">
                            +₹120 (2.4%)
                        </p>
                    </div>

                    {/* Mini badge */}
                    <div className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                        ▲ Uptrend
                    </div>
                </div>

                {/* Chart Section */}
                <div className="h-28 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 10, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    background: "#fff",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    fontSize: "12px"
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#6366f1"
                                strokeWidth={2.5}
                                fill="url(#colorValue)"
                                dot={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Asset Breakdown */}
                <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">ASSET DISTRIBUTION</p>

                    <div className="flex gap-4">
                        {assets.map((item, index) => (
                            <div key={index} className="flex-1 p-3 bg-white border border-gray-200 rounded-lg">

                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>{item.label}</span>
                                    <span>{item.value}%</span>
                                </div>

                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color} rounded-full`}
                                        style={{ width: `${item.value}%` }}
                                    ></div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* Insight */} 
                    <div className="mt-auto bg-indigo-50 text-indigo-700 text-xs p-3 rounded-lg leading-relaxed">
                       <strong>AI -</strong> {recommendations || "Wait! AI Suggesting something..."}
                    </div>

            </div>
        </WidgetCard>
    );
};

export default FinanceWidget;