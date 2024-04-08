import React from "react";
import Link from "next/link";

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export default function Data() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Siste klienter</CardTitle>
            <CardDescription>
              Klienter det er mottatt data fra de siste 7 dagene
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              Vis alle
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Klient</TableHead>
                <TableHead className="text-center">Dato</TableHead>
                <TableHead className="text-right">Datapunkter</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">PC 1</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    192.168.1.1
                  </div>
                </TableCell>
                <TableCell className="text-center">2023-06-24</TableCell>
                <TableCell className="text-right">32</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div className="font-medium">PC 2</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    192.168.1.2
                  </div>
                </TableCell>
                <TableCell className="text-center">2023-06-25</TableCell>
                <TableCell className="text-right">4</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div className="font-medium">PC 3</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    192.168.1.3
                  </div>
                </TableCell>
                <TableCell className="text-center">2023-06-26</TableCell>
                <TableCell className="text-right">28</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div className="font-medium">PC 4</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    192.168.1.4
                  </div>
                </TableCell>
                <TableCell className="text-center">2023-06-27</TableCell>
                <TableCell className="text-right">27</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div className="font-medium">PC 5</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    192.168.1.5
                  </div>
                </TableCell>
                <TableCell className="text-center">2023-06-28</TableCell>
                <TableCell className="text-right">45</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
    </div>
  );
}
