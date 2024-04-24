import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

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
  const [clients, setClients] = useState([]); // Tilstand for å lagre klientdata

  useEffect(() => {
    const fetchClients = async () => {
      const today = new Date();
      const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7))
        .toISOString()
        .slice(0, 10);
      const machinesRef = collection(db, "machines");
      const q = query(
        machinesRef,
        where("dato", ">=", sevenDaysAgo),
        orderBy("dato", "desc"),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const clientsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const fieldCount = Object.keys(data).length; // Teller feltene i dokumentet
        return {
          name: data.navn, // Navnet på klienten
          ip: data.ip, // IP-adressen til klienten
          date: data.dato, // Datoen data ble mottatt
          fieldCount: fieldCount, // Antall felt i dokumentet
        };
      });
      setClients(clientsData);
    };

    fetchClients();
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
            {clients.map((client) => (
              <TableRow key={client.name}>
                <TableCell>
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {client.ip}
                  </div>
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
