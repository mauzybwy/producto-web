/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { doc, where, addDoc, setDoc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "setup/firebase";

import { useMe } from "hooks/users";
import { Timer } from "models/timer";

/*****************************************************************************
 * Hooks
 *****************************************************************************/
export const useTimers = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const me = useMe();
  
  useEffect(() => {
    if (!me) return;
    
    const unsub = onSnapshot(
      query(
      collection(db, "Timers"),
        where("owner", "==", me.uid),
      ),
      { includeMetadataChanges: true }, 
      (snap) => setTimers(        
        snap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        } as Timer))
            .filter(timer => !!timer.name)
      )
    );

    return () => {
      unsub();
    }
  }, [me]);

  const updateTimer = async (timer: Timer, data: any) => {
    await setDoc(doc(db, "Timers", timer.id), data, { merge: true });
  }

  const createTimer = async (name: string) => {
    await addDoc(collection(db, "Timers"), {
      name,
      owner: me.uid,
      runtime: 0,
    });
  }

  const clearTimers = async () => {
    timers.forEach(timer => {
      setDoc(doc(db, "Timers", timer.id), {
        ...timer,
        runtime: 0,
      })
    })
  }

  return { timers, updateTimer, createTimer, clearTimers };
}
