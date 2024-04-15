import React from "react";

import Antallscripts from "./antallscripts.js";
import Antallklienter from "./antallklienter.js";

import { Laptop, HardDriveUpload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Antallscripts />
      <Antallklienter />

      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mottatt data</CardTitle>
          <HardDriveUpload className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">367</div>
          <p className="text-xs text-muted-foreground">+135 siste 30 dager</p>
        </CardContent>
      </Card>
    </div>
  );
}
