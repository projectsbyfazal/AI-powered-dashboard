"use client";

import useNewsData from "@/hooks/useNewsData";
import WidgetCard from "../dashboard/WidgetCard";
import Image from "next/image";

const NewsWidget = () => {

    const { data } = useNewsData()

    return (
        <WidgetCard title="Top Headlines">
            <div className="w-full bg-white rounded-xl flex flex-col">
                <div className="flex flex-col gap-3 flex-1">

                    {data?.map((item, index) => (
                        <a
                            href={item.url || "#"}
                            target="_blank"
                            key={index}
                            title="Click to know details"
                            className="flex gap-3 items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer border border-gray-200"
                        >
                            <div>
                                <Image src={item.image} alt="NEWS" height={50} width={50} className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-800 leading-snug">
                                    {item.title}
                                </div>

                                <div className="text-xs text-gray-500 mt-1 flex items-center justify-between">
                                    <span>{item.source}</span>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                        </a>
                    ))}

                </div>

            </div>
        </WidgetCard>
    );
};

export default NewsWidget;