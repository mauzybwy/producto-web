/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "setup/firebase";

import { Timer } from "models/timer";

/*****************************************************************************
 * Hooks
 *****************************************************************************/
export const useTimers = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Timers"),
      { includeMetadataChanges: true }, 
      (snap) => setTimers(        
        snap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        } as Timer))
      )
    );

    return () => {
      unsub();
    }
  }, []);

  const updateTimer = async (timer: Timer, data: any) => {
    await setDoc(doc(db, "Timers", timer.id), data);
  }

  const clearTimers = async () => {
    timers.forEach(timer => {
      setDoc(doc(db, "Timers", timer.id), {
        ...timer,
        runtime: 0,
      })
    })
  }

  return { timers, updateTimer, clearTimers };
}
