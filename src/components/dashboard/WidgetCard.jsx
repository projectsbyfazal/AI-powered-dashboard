"use client";

const WidgetCard = ({ children, title }) => {
    return (
        <div className="bg-white text-black shadow rounded-xl p-6 h-full overflow-auto" style={{scrollbarWidth: 'none'}}>
            <div className="drag-handle cursor-move font-bold mb-2">
                {title}
            </div>
            {children}
        </div>
    );
};

export default WidgetCard;