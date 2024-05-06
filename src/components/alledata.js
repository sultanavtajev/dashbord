/* Ikke i bruk*/

import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig"; // Husk å justere denne stien til din faktiske konfigurasjonsfil
import { collection, getDocs } from "firebase/firestore";

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
import { Button } from "@/components/ui/button";

export default function Data() {
  const [machines, setMachines] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      const querySnapshot = await getDocs(collection(db, "machines"));
      const machinesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.navn || "Ukjent",
          dataCount: Object.keys(data).length - 0, // Juster for å ikke telle 'id' eller et annet unødvendig felt
          fields: data,
        };
      });
      setMachines(machinesData);
    };

    fetchMachines();
  }, []);

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Alle data</CardTitle>
          <CardDescription>
            Alle data i databasen sortert etter maskin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Maskin</TableHead>
                <TableHead className="text-center">
                  Antall datapunkter
                </TableHead>
                <TableHead className="text-right">Mer informasjon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine) => (
                <React.Fragment key={machine.id}>
                  <TableRow>
                    <TableCell>{machine.name}</TableCell>
                    <TableCell className="text-center">
                      {machine.dataCount}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => toggleDropdown(machine.id)}>
                        {openDropdown === machine.id
                          ? "Skjul data"
                          : "Vis data"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {openDropdown === machine.id && (
                    <TableRow>
                      <TableCell colSpan="3">
                        <ul>
                          {Object.entries(machine.fields)
                            .filter(([key, _]) => key !== "id") // Filtrer ut 'navn' feltet fra dropdown
                            .map(([key, value], idx) => (
                              <li key={idx}>{`${key}: ${value}`}</li>
                            ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
