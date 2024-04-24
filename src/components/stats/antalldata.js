import React, { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  orderBy,
  where,
  query,
} from "firebase/firestore";

import { Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Antalldata() {
  const [totalFieldsCount, setTotalFieldsCount] = useState(0); // Totalt antall felt mottatt fra alle maskiner
  const [monthlyChange, setMonthlyChange] = useState(0); // Akkumulert endring de siste 30 dager

  useEffect(() => {
    // Henter og beregner totalt antall felt for hver maskin
    const fetchFieldCounts = async () => {
      try {
        const machinesCollectionRef = collection(db, "machines");
        const machineSnapshots = await getDocs(machinesCollectionRef);
        let totalFields = 0;

        machineSnapshots.docs.forEach((machineDoc) => {
          // Teller feltene i hvert dokument
          const fieldCount = Object.keys(machineDoc.data()).length;
          totalFields += fieldCount;
        });

        // Lagrer den beregnede totalen i "dataCounts" samlingen
        const today = new Date().toISOString().slice(0, 10);
        const fieldsCountDocRef = doc(db, "dataCounts", today);
        await setDoc(
          fieldsCountDocRef,
          { count: totalFields, date: today },
          { merge: true }
        );

        setTotalFieldsCount(totalFields); // Oppdaterer staten med nytt totalt antall felt
      } catch (error) {
        console.error("Failed to fetch and store fields counts:", error);
      }
    };

    fetchFieldCounts();
  }, []);

  useEffect(() => {
    // Beregner den månedlige endringen i antall felt
    const fetchMonthlyChange = async () => {
      const today = new Date();
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
        .toISOString()
        .slice(0, 10);
      const q = query(
        collection(db, "dataCounts"),
        where("date", ">=", thirtyDaysAgo),
        orderBy("date", "asc")
      );

      try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        let totalChange = 0;
        data.forEach((entry, index) => {
          if (index > 0) {
            const dailyChange = entry.count - data[index - 1].count;
            totalChange += dailyChange;
          }
        });
        setMonthlyChange(totalChange);
      } catch (error) {
        console.error("Error fetching monthly change:", error);
      }
    };

    fetchMonthlyChange();
  }, []);

  return (
    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Mottatt Data</CardTitle>
        <Database className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalFieldsCount}</div>
        <p className="text-xs text-muted-foreground">
          {monthlyChange >= 0 ? `+${monthlyChange}` : monthlyChange} de siste 30
          dagene
        </p>
      </CardContent>
    </Card>
  );
}
