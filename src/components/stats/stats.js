import React from "react";

import Antallscripts from "./antallscripts.js";
import Antallklienter from "./antallklienter.js";
import Antalldata from "./antalldata.js";

import { Laptop, HardDriveUpload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Antallscripts />
      <Antallklienter />
      <Antalldata />
    </div>
  );
}
