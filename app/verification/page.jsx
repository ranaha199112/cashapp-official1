import { useState } from "react";

export default function TransferFailed() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-3xl">✖</span>
        </div>
        <h1 className="text-lg font-semibold">This transfer failed</h1>
      </div>
      <button
        className="mt-6 px-10 py-2 bg-green-500 text-white rounded-lg"
      >
        Done
      </button>
    </div>
  );
}
