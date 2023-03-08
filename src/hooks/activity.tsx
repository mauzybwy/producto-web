/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "setup/firebase";

import { useMe } from "hooks/users";

/*****************************************************************************
 * Hooks
 *****************************************************************************/
export const useUserActivity = (uid: string) => {
  const [userId, setUserId] = useState(uid);
  const [activity, setActivity] = useState(null);
  
  useEffect(() => {
    if (!uid) return;

    setUserId(uid);
    
    const unsub = onSnapshot(
      doc(db, "Activity", uid),
      { includeMetadataChanges: true }, 
      (doc) => {
        setActivity(doc.data());
      }
    );

    return () => {
      unsub();
    }
  }, [uid]);

  const updateActivity = async (data) => {
    if (userId) {
      await setDoc(doc(db, "Activity", userId), {
        ...data,
        timeUpdated: new Date(),
      }, { merge: true });
    }
  }

  return { activity, updateActivity };
}

export const useActivity = () => {
  const me = useMe();
  return useUserActivity(me?.uid);
}
