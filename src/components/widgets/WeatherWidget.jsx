"use client";

import {
    WiSunrise,
    WiSunset,
    WiBarometer,
    WiDaySunny,
    WiCloudy,
    WiDayHaze,
    WiFog,
    WiRain,
    WiSnow,
    WiSmoke
} from "react-icons/wi";
import WidgetCard from "../dashboard/WidgetCard";
import { FaSearch, FaThermometerHalf, FaWind } from "react-icons/fa";
import useWeatherData from "@/hooks/useWeatherData";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import axios from "axios";

const weatherIcons = {
    Clear: <WiDaySunny size={90} className="text-yellow-500" />,
    Sunny: <WiDaySunny size={90} className="text-yellow-500" />,
    Clouds: <WiCloudy size={90} className="text-gray-400" />,
    Haze: <WiDayHaze size={90} className="text-yellow-400" />,
    Mist: <WiDayHaze size={90} className="text-yellow-400" />,
    Fog: <WiFog size={90} className="text-gray-400" />,
    Rain: <WiRain size={90} className="text-blue-500" />,
    Snow: <WiSnow size={90} className="text-blue-300" />,
    Smoke: <WiSmoke size={90} className="text-gray-500" />,
    Dust: <WiFog size={90} className="text-gray-500" />
};

const WeatherWidget = () => {
    const { data, cityName, setCityName, fetchData } = useWeatherData()

    const [recommendations, setRecommendations] = useState("")

    useEffect(() => {
        if (data) {
            (async () => {
                try {
                    const { data: resData } = await axios.post("/api/chat", { message: `Give your view and suggestion related to weather data only ${JSON.stringify(data)}`, chats: "[]" });
                    console.log("data", resData)
                    setRecommendations(resData?.reply || "")
                } catch (error) {
                    console.log(error)
                }
            })();
        }
    }, [data])

    const icon = useMemo(() => weatherIcons[data?.weathermood || 'Clear'], [data])

    return (
        <WidgetCard title="Weather Forecast">
            <div className="w-full bg-white rounded-xl flex flex-col justify-between">
                <div className="bg-green-50 text-green-700 text-xs p-3 rounded-lg mb-3">
                    <strong>AI -</strong> {recommendations || "Wait! AI Suggesting something..."}
                </div>

                <div className="flex items-center justify-between mb-3">
                    <div className="drag-handle cursor-move text-sm font-medium text-gray-600">
                        {data?.city}, {data?.country}
                    </div>
                    <div>
                        <form className="relative" onSubmit={(e) => {
                            e.preventDefault()
                            fetchData()
                        }}>
                            <input
                                type="text"
                                placeholder="Enter city name.."
                                value={cityName}
                                onChange={(e) => setCityName(e.target.value)}
                                className="px-3 py-1  rounded-lg border border-gray-200"
                            />
                            <button type="submit" className="cursor-pointer absolute top-0 right-0 h-full rounded bg-indigo-500 p-2 text-white"><FaSearch /></button>
                        </form>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="text-4xl font-semibold text-gray-900">{data?.temp}°</div>
                        <div className="text-sm text-gray-500">{data?.weathermood}</div>
                        <div className="text-sm text-gray-400">Feels like {data?.feels_like}°</div>
                    </div>

                    <div className="pe-2">
                        {icon}
                    </div>
                </div>

                <div className="border-t border-gray-200 mb-4"></div>

                <div className="grid grid-cols-2 gap-3 text-balance">
                    <div className="flex items-center gap-2 text-gray-600 p-2 rounded bg-gray-50 border-gray-200 border">
                        <FaThermometerHalf size={25} className="text-blue-500" />
                        <div>
                            <span className="text-sm">{data?.humidity}%</span>
                            <div className="text-xs font-bold">Humidity</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 p-2 rounded bg-gray-50 border-gray-200 border">
                        <FaWind size={22} />
                        <div>
                            <span className="text-sm">{data?.wind} km/h</span>
                            <div className="text-xs font-bold">Wind</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 p-2 rounded bg-gray-50 border-gray-200 border">
                        <WiBarometer size={30} className="text-indigo-500" />
                        <div>
                            <span className="text-sm">{data?.pressure} hPa</span>
                            <div className="text-xs font-bold">Air Pressure</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 p-2 rounded bg-gray-50 border-gray-200 border">
                        <HiOutlineEye size={25} className="text-orange-500" />
                        <div>
                            <span className="text-sm">{data?.visibility}</span>
                            <div className="text-xs font-bold">Visibility</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 p-2 rounded bg-gray-50 border-gray-200 border">
                        <WiSunrise size={30} className="text-orange-400" />
                        <div>
                            <span className="text-sm">{data?.sunrise} </span>
                            <div className="text-xs font-bold">Sunrise</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 p-2 rounded bg-gray-50 border-gray-200 border">
                        <WiSunset size={30} className="text-orange-500" />
                        <div>
                            <span className="text-sm">{data?.sunset}</span>
                            <div className="text-xs font-bold">Sunset</div>
                        </div>
                    </div>

                </div>

            </div>
        </WidgetCard>
    );
};

export default WeatherWidget;