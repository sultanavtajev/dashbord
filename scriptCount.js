import { db } from "./firebaseConfig"; // Assuming this imports your Firestore instance
import { doc, setDoc } from "firebase/firestore";

const updateDailyCount = async (count) => {
  const today = new Date().toISOString().slice(0, 10); // Gets today's date in YYYY-MM-DD format
  const docRef = doc(db, "scriptCounts", today); // Create a reference to the doc for today

  await setDoc(
    docRef,
    {
      count: count,
      date: today,
    },
    { merge: true }
  ); // Sets the document with the option to merge which avoids overwriting other fields
};
