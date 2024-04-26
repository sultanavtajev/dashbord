import React from "react";
import Link from "next/link";
import Allescript from "../components/allescripts.js";

export default function Scriptpage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Allescript />
      </main>
    </div>
  );
}
