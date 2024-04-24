import React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Toppscripts() {
  return (
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Toppliste scripts</CardTitle>
            <CardDescription>
              Scripts som er mest brukt de siste 7 dagene
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Script</TableHead>
                <TableHead className="text-center">Kategori</TableHead>
                <TableHead className="text-right">Antall</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Keylogger</div>
                </TableCell>
                <TableCell className="text-center">Data</TableCell>
                <TableCell className="text-right">27</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div className="font-medium">SysInfo</div>
                </TableCell>
                <TableCell className="text-center">System</TableCell>
                <TableCell className="text-right">18</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div className="font-medium">PassInfo</div>
                </TableCell>
                <TableCell className="text-center">Private</TableCell>
                <TableCell className="text-right">15</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div className="font-medium">ProgRun</div>
                </TableCell>
                <TableCell className="text-center">System</TableCell>
                <TableCell className="text-right">13</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div className="font-medium">LoginLog</div>
                </TableCell>
                <TableCell className="text-center">Private</TableCell>
                <TableCell className="text-right">8</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}
