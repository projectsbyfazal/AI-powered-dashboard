"use client";

import moment from "moment"; 

const Navbar = () => {

    return (
        <div className="w-full border-b-2 border-gray-300 text-gray-600 px-6 py-3 sm:flex items-center justify-between">

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    MD
                </div>

                <div className="text-lg font-semibold">
                    Multi-Domain <span className="text-blue-500">Dashboard</span>
                </div>
            </div>


            <div className="flex items-center gap-4 text-sm text-gray-900 sm:mt-0 mt-4">
                <div className="flex items-center gap-2 bg-white py-1 px-3 rounded-lg">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>{moment().format("ddd, MMM DD, hh:mm A")}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;