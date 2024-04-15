import React, { useState, useEffect } from "react";
import { ref, listAll } from "firebase/storage";
import { storage, db } from "../../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import { FileCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Antallscripts() {
  const [scriptCount, setScriptCount] = useState(0);
  const [monthlyChange, setMonthlyChange] = useState(0);

  useEffect(() => {
    const fetchScriptCount = async () => {
      try {
        const storageRef = ref(storage, "");
        const res = await listAll(storageRef);
        setScriptCount(res.prefixes.length);
        updateDailyCount(res.prefixes.length);
      } catch (error) {
        console.error("Failed to fetch script count:", error);
      }
    };

    fetchScriptCount();
  }, []);

  const updateDailyCount = async (count) => {
    const today = new Date().toISOString().slice(0, 10);
    const docRef = doc(db, "scriptCounts", today);

    await setDoc(docRef, { count, date: today }, { merge: true });
  };

  useEffect(() => {
    const fetchMonthlyChange = async () => {
      const today = new Date();
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
        .toISOString()
        .slice(0, 10);
      const q = query(
        collection(db, "scriptCounts"),
        where("date", ">=", thirtyDaysAgo),
        orderBy("date", "asc")
      );

      try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());

        // Sum all daily changes to get the accumulated change
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
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Antall scripts</CardTitle>
        <FileCode className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{scriptCount}</div>
        <p className="text-xs text-muted-foreground">
          {monthlyChange >= 0 ? `+${monthlyChange}` : monthlyChange} siste 30
          dager
        </p>
      </CardContent>
    </Card>
  );
}
