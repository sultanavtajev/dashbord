import React, { useState, useEffect } from "react";
import { functions, db } from "../../../firebaseConfig";
import { httpsCallable } from "firebase/functions";
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
  const [totalFieldsCount, setTotalFieldsCount] = useState(0); // Total number of fields received from all machines
  const [monthlyChange, setMonthlyChange] = useState(0); // Accumulated change over the last 30 days

  // Fetches the machine data and processes it to count fields
  const fetchMachines = async () => {
    const deepFetch = httpsCallable(functions, "deepFetch"); // Ensure this function is correctly set up in Firebase Functions
    try {
      const response = await deepFetch();
      let totalFields = 0;
      if (response.data && response.data.machines) {
        response.data.machines.forEach((machine) => {
          if (!machine.subcollections) {
            console.log("No subcollections for machine", machine.id);
            return;
          }

          machine.subcollections.forEach((sub) => {
            if (!sub.documents) {
              console.log("No documents in subcollection", sub.name);
              return;
            }

            sub.documents.forEach((doc) => {
              totalFields += Object.keys(doc).length;
            });
          });
        });

        setTotalFieldsCount(totalFields); // Update state with the total field count

        // Store the total count in Firestore under 'dataCounts' collection
        const today = new Date().toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
        const fieldsCountDocRef = doc(db, "dataCounts", today);
        await setDoc(
          fieldsCountDocRef,
          {
            count: totalFields,
            date: today,
          },
          { merge: true }
        );
      } else {
        console.log("No machines data received", response.data);
      }
    } catch (error) {
      console.error("Error calling deepFetch function:", error);
    }
  };

  // Effect to fetch machine data
  useEffect(() => {
    fetchMachines();
  }, []);

  // Effect to calculate monthly changes in the number of fields
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
        <CardTitle className="text-sm font-medium">Mottatt data</CardTitle>
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
