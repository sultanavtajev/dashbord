import React from "react";
import Link from "next/link";
import Sisteklienter1 from "./sisteklienter1";
import Toppscripts from "./toppscripts";

export default function Data() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
      <Sisteklienter1 />
      <Toppscripts />
    </div>
  );
}
