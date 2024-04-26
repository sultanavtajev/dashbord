import React, { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig"; // Sørg for at denne stien er riktig
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

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
  const [scripts, setScripts] = useState([]); // Tilstand for å lagre script-data

  useEffect(() => {
    const fetchScripts = async () => {
      const scriptsRef = collection(db, "folderStats");
      const q = query(scriptsRef, orderBy("accesses", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const scriptsData = querySnapshot.docs.map((doc) => ({
        name: doc.id, // Navnet/id på scriptet
        count: doc.data().accesses, // Antall tilganger
      }));
      setScripts(scriptsData);
    };

    fetchScripts();
  }, []);

  return (
    <Card className="xl:col-span-2">
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
              <TableHead className="text-center"></TableHead>
              <TableHead className="text-right">Antall</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scripts.map((script) => (
              <TableRow key={script.name}>
                <TableCell>
                  <div className="font-medium">{script.name}</div>
                </TableCell>
                <TableCell className="text-center">{script.category}</TableCell>
                <TableCell className="text-right">{script.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
