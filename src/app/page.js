"use client";

import DashboardGrid from "@/components/dashboard/DashboardGrid";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/widgets/ChatWidget";
import FinanceWidget from "@/components/widgets/FinanceWidget";
import HealthWidget from "@/components/widgets/HealthWidget";
import NewsWidget from "@/components/widgets/NewsWidget";
import WeatherWidget from "@/components/widgets/WeatherWidget";

export default function DashboardPage() {
  return (
    <div className="sm:px-20 bg-gray-100 pb-10">
      <Navbar />
      <div className="mt-2">
        <DashboardGrid >
          <div key="portfolio">
            <FinanceWidget />
          </div>
          <div key="weather">
            <WeatherWidget />
          </div>
          <div key="health">
            <HealthWidget />
          </div>
          <div key="news">
            <NewsWidget />
          </div>
          <div key="assistant">
            <ChatWidget />
          </div>
        </DashboardGrid>
      </div>
    </div>
  );
}