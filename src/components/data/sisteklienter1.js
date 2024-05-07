import React, { useState, useEffect } from "react";
import Link from "next/link";
import { functions } from "../../../firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { ArrowUpRight } from "lucide-react";
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

export default function Sisteklienter() {
  const [clients, setClients] = useState([]); // State for storing client data

  useEffect(() => {
    const fetchMachines = async () => {
      const deepFetch = httpsCallable(functions, "deepFetch");
      console.log("Fetching data from Firebase...");
      try {
        const response = await deepFetch();
        console.log("Response received:", response); // Log the entire response to see what's inside

        if (response.data && response.data.machines) {
          const sevenDaysAgo = new Date(
            new Date().setDate(new Date().getDate() - 7)
          )
            .toISOString()
            .split("T")[0]; // Date formatted as yyyy-mm-dd

          console.log("Filter date threshold:", sevenDaysAgo);

          const clientsData = response.data.machines
            .filter((machine) => machine.subcollections)
            .map((machine) => {
              const recentSubcollections = machine.subcollections
                .filter((sub) => {
                  const subDate = sub.name.split("T")[0]; // Extract date part from the subcollection name
                  return subDate >= sevenDaysAgo; // Compare extracted date
                })
                .map((sub) => {
                  const documents = sub.documents || [];
                  const fieldCount = documents.reduce(
                    (acc, doc) => acc + Object.keys(doc).length,
                    0
                  );
                  return {
                    name: sub.name,
                    fieldCount: fieldCount,
                    date: sub.name.split("T")[0], // Use the extracted date
                  };
                });

              const totalFieldCount = recentSubcollections.reduce(
                (acc, sub) => acc + sub.fieldCount,
                0
              );

              return {
                name: machine.name || machine.id,
                ip: machine.ip || "N/A",
                date: recentSubcollections[0]?.date || "N/A",
                fieldCount: totalFieldCount,
              };
            })
            .filter((client) => client.fieldCount > 0);

          console.log("Filtered clients data:", clientsData);
          setClients(clientsData);
        } else {
          console.log("No machines data received", response.data);
        }
      } catch (error) {
        console.error("Error calling deepFetch function:", error);
      }
    };

    fetchMachines();
  }, []);

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Siste klienter</CardTitle>
          <CardDescription>
            Klienter det er mottatt data fra de siste 7 dagene
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/datapage">
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
            {clients.map((client, index) => (
              <TableRow key={client.name || index}>
                <TableCell>
                  <div className="font-medium">{client.name}</div>
                  {/* <div className="text-sm text-muted-foreground">
                    {client.ip}
                  </div> */}
                </TableCell>
                <TableCell className="text-center">{client.date}</TableCell>
                <TableCell className="text-right">
                  {client.fieldCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
