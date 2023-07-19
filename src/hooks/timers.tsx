/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { doc, where, addDoc, setDoc, updateDoc, collection, query, onSnapshot, writeBatch } from "firebase/firestore";
import { db } from "setup/firebase";
import { v4 as uuidv4 } from "uuid";

import { useMe } from "hooks/users";
import { Timer } from "models/timer";

/*****************************************************************************
 * Hooks
 *****************************************************************************/
export const useUserTimers = (uid: string) => {
  const [userId, setUserId] = useState(uid);
  const [timers, setTimers] = useState<Timer[]>([]);

  /* useEffect(() => {
   *   if (timers?.sessions?.length) {
   *     
   *   }
   * }, [timers.sessions])
   *  */
  useEffect(() => {
    if (!uid) return;
    setUserId(uid);
    
    const unsub = onSnapshot(
      query(
        collection(db, "Timers"),
        where("owner", "==", uid),
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
  }, [uid]);

  const updateTimer = async (timer: Timer, data: any) => {
    await setDoc(doc(db, "Timers", timer.id), {
      ...data,
      timeUpdated: new Date(),
    }, { merge: true });
  }

  const createTimer = async (name: string, position: number) => {
    await addDoc(collection(db, "Timers"), {
      name,
      position,
      owner: userId,
      runtime: 0,
      timeCreated: new Date(),
    });
  }

  const clearTimers = async () => {
    for (var i = 0; i < timers.length; i++) {
      let timer = timers[i];
      await setDoc(doc(db, "Timers", timer.id), {
        runtime: 0,
        timeStarted: null,
      }, { merge: true })
    }
  }

  const saveTimerSessions = async () => {
    for (var i = 0; i < timers.length; i++) {
      let timer = timers[i];
      if (timer.runtime > 0) {
        setDoc(doc(db, "Timers", timer.id), {
          sessions: [
            ...(timer.sessions || []),
            {
              timeFinished: new Date(),
              timeStarted: timer.timeStarted,
              runtime: timer.runtime
            }
          ]
        }, { merge: true });
      }
    }
  }

  const createPayPeriod = async (timer: Timer, hourly: number) => {
    const uuid = uuidv4();

    const newSessions = [...(timer?.sessions || [])].map(() => {
      
    })

    updateDoc(doc(db, "Timers", timer.id), {
      payPeriods: {
        ...(timer.payPeriods || {}),
        [uuid]: {
          hourly: hourly,
          status: "unpaid",
        }
      }
    });

    return uuid;
  }

  const activeTimers = timers
    .filter(timer => timer.position > 0)
    .sort((a,b) => a.position - b.position)

  return { timers, activeTimers, updateTimer, createTimer, clearTimers, saveTimerSessions, createPayPeriod };
}

export const useTimers = () => {
  const me = useMe();
  return useUserTimers(me?.uid);
}
