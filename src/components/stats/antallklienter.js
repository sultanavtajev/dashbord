import React, { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import { Laptop } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Antallklienter() {
  const [clientCount, setClientCount] = useState(0); // Renamed for clarity
  const [monthlyChange, setMonthlyChange] = useState(0);

  useEffect(() => {
    // Fetches the current count of machines
    const fetchMachineCount = async () => {
      try {
        const machinesCollectionRef = collection(db, "machines");
        const snapshot = await getDocs(machinesCollectionRef);
        setClientCount(snapshot.docs.length); // Updates to reflect the number of machines
        updateDailyMachineCount(snapshot.docs.length);
      } catch (error) {
        console.error("Failed to fetch machine count:", error);
      }
    };

    fetchMachineCount();
  }, []);

  const updateDailyMachineCount = async (count) => {
    // Updates daily count in machineCounts collection
    const today = new Date().toISOString().slice(0, 10);
    const docRef = doc(db, "machineCounts", today);
    await setDoc(docRef, { count, date: today }, { merge: true });
  };

  useEffect(() => {
    // Calculates the monthly change using machineCounts collection
    const fetchMonthlyChange = async () => {
      const today = new Date();
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
        .toISOString()
        .slice(0, 10);
      const q = query(
        collection(db, "machineCounts"),
        where("date", ">=", thirtyDaysAgo),
        orderBy("date", "asc")
      );

      try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        let totalChange = 0;
        for (let i = 1; i < data.length; i++) {
          const dailyChange = data[i].count - data[i - 1].count;
          totalChange += dailyChange;
        }
        setMonthlyChange(totalChange);
      } catch (error) {
        console.error("Error fetching monthly change:", error);
      }
    };

    fetchMonthlyChange();
  }, []);

  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Antall klienter</CardTitle>
        <Laptop className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{clientCount}</div>
        <p className="text-xs text-muted-foreground">
          {monthlyChange >= 0 ? `+${monthlyChange}` : monthlyChange} siste 30
          dager
        </p>
      </CardContent>
    </Card>
  );
}
