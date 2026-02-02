import React from "react";

function GlobalLoader() {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-white fixed inset-0 z-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-light-gray rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-dark font-bold text-lg">Loading...</p>
            </div>
        </div>
    );
}

export default GlobalLoader;
