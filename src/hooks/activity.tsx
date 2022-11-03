/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "setup/firebase";

/*****************************************************************************
 * Hooks
 *****************************************************************************/
export const useActivity = () => {
  const [activity, setActivity] = useState(null);
  
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "Activity", "test"),
      { includeMetadataChanges: true }, 
      (doc) => {
        setActivity(doc.data());
      }
    );

    return () => {
      unsub();
    }
  }, []);

  const updateActivity = async (data) => {
    await setDoc(doc(db, "Activity", "test"), {
      ...data,
      timeUpdated: new Date(),
    }, { merge: true });
  }

  return { activity, updateActivity };
}
