"use client";
import React, { useEffect, useState } from "react";
import { Responsive } from "react-grid-layout";
import _ from "lodash";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { WidthProvider } from "react-grid-layout/legacy";
import { HiOutlineRefresh } from "react-icons/hi";

const ResponsiveGridLayout = WidthProvider(Responsive);

const STORAGE_KEY = "dashboard-layout";

const defaultLayouts = {
    lg: [
        { i: "portfolio", x: 0, y: 0, w: 8, h: 5 },
        { i: "weather", x: 8, y: 0, w: 4, h: 5 },

        { i: "health", x: 0, y: 4, w: 4, h: 4 },
        { i: "news", x: 4, y: 4, w: 4, h: 5 },
        { i: "assistant", x: 8, y: 4, w: 4, h: 5 }
    ],

    md: [
        { i: "portfolio", x: 0, y: 0, w: 10, h: 5 },
        { i: "weather", x: 0, y: 4, w: 10, h: 3 },

        { i: "health", x: 0, y: 7, w: 5, h: 3 },
        { i: "news", x: 5, y: 7, w: 5, h: 3 },
        { i: "assistant", x: 0, y: 10, w: 10, h: 3 }
    ],

    sm: [
        { i: "portfolio", x: 0, y: 0, w: 6, h: 5 },
        { i: "weather", x: 0, y: 4, w: 6, h: 5 },
        { i: "health", x: 0, y: 7, w: 6, h: 4 },
        { i: "news", x: 0, y: 10, w: 6, h: 5 },
        { i: "assistant", x: 0, y: 13, w: 6, h: 5 }
    ]
};

const DashboardGrid = ({ children }) => {
    const [layouts, setLayouts] = useState(defaultLayouts);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const positions = JSON.parse(saved);
            setLayouts(positions || defaultLayouts);
        } else {
            setLayouts(defaultLayouts);
        }
    }, []);

    const handleLayoutChange = (currentLayout, allLayouts) => {
        setLayouts(allLayouts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allLayouts));
    };

    const resetLayout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setLayouts(defaultLayouts);
    };

    if (!layouts.lg) return null;

    return (
        <div>
            <div className="flex justify-end">
                <button
                    onClick={resetLayout}
                    className="bg-indigo-200 px-3 py-1 me-2 rounded cursor-pointer flex items-center justify-center"
                >
                    <HiOutlineRefresh className="me-2" />
                    Reset Layout
                </button>
            </div>

            <ResponsiveGridLayout
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768 }}
                cols={{ lg: 12, md: 10, sm: 6 }}
                rowHeight={80}
                margin={[16, 16]}
                containerPadding={[10, 10]}
                onLayoutChange={handleLayoutChange}
                draggableHandle=".drag-handle"
                compactType="vertical"
                preventCollision={false}
            >
                {children}
            </ResponsiveGridLayout>
        </div>
    );
};

export default DashboardGrid;