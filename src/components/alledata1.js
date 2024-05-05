import React, { useState, useEffect } from "react";
import { functions } from "../../firebaseConfig";
import { httpsCallable } from "firebase/functions";
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

export default function Alledata1() {
  const [machines, setMachines] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      const deepFetch = httpsCallable(functions, "deepFetch");
      try {
        const response = await deepFetch();
        if (response.data && response.data.machines) {
          const processedMachines = response.data.machines.map((machine) => {
            if (!machine.subcollections) {
              console.log("No subcollections for machine", machine.id);
              return { id: machine.id, totalFieldCount: 0, subcollections: [] };
            }
            const subcollectionsWithCounts = machine.subcollections.map(
              (sub) => {
                if (!sub.documents) {
                  console.log("No documents in subcollection", sub.name);
                  return { name: sub.name, documents: [], fieldCount: 0 };
                }
                const documentsWithFields = sub.documents.map((doc) => ({
                  ...doc, // Includes all fields dynamically
                }));
                const fieldCount = documentsWithFields.reduce(
                  (acc, doc) => acc + Object.keys(doc).length,
                  0
                );
                return {
                  name: sub.name,
                  documents: documentsWithFields,
                  fieldCount: fieldCount,
                };
              }
            );
            const totalFieldCount = subcollectionsWithCounts.reduce(
              (acc, sub) => {
                if (isNaN(sub.fieldCount)) {
                  console.error(
                    "Field count NaN for subcollection",
                    sub.name,
                    sub.fieldCount
                  );
                }
                return acc + (sub.fieldCount || 0); // Safeguard against NaN
              },
              0
            );
            return {
              id: machine.id,
              subcollections: subcollectionsWithCounts,
              totalFieldCount: totalFieldCount,
            };
          });
          console.log("Processed Machines Data:", processedMachines);
          setMachines(processedMachines);
        } else {
          console.log("No machines data received", response.data);
        }
      } catch (error) {
        console.error("Error calling deepFetch function:", error);
      }
    };


    fetchMachines();

  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
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
              <TableHead>Maskin ID</TableHead>
              <TableHead className="text-center">Antall datapunkter</TableHead>
              <TableHead className="text-right">Mer informasjon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {machines.map((machine) => (
              <React.Fragment key={machine.id}>
                <TableRow>
                  <TableCell>{machine.id}</TableCell>
                  <TableCell className="text-center">
                    {typeof machine.totalFieldCount === "number"
                      ? machine.totalFieldCount
                      : 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => toggleDropdown(machine.id)}>
                      {openDropdown === machine.id ? "Skjul data" : "Vis data"}
                    </Button>
                  </TableCell>
                </TableRow>
                {openDropdown === machine.id && (
                  <TableRow>
                    <TableCell colSpan="3">
                      {machine.subcollections.map((sub, index) => (
                        <div
                          key={index}
                          style={{ paddingTop: "10px", paddingBottom: "10px" }}
                        >
                          <h4>
                            <strong>{sub.name}</strong>
                          </h4>
                          <ul>
                            {sub.documents.map((doc, docIndex) => (
                              <li key={docIndex}>
                                {Object.entries(doc).map(([key, value]) => (
                                  <div key={key}>{`${key}: ${value}`}</div>
                                ))}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
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
