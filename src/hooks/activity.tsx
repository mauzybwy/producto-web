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
export const useActivity = () => {
  const me = useMe();
  const [activity, setActivity] = useState(null);
  
  useEffect(() => {
    if (!me) return;
    
    const unsub = onSnapshot(
      doc(db, "Activity", me?.uid),
      { includeMetadataChanges: true }, 
      (doc) => {
        setActivity(doc.data());
      }
    );

    return () => {
      unsub();
    }
  }, [me]);

  const updateActivity = async (data) => {
    await setDoc(doc(db, "Activity", me?.uid), {
      ...data,
      timeUpdated: new Date(),
    }, { merge: true });
  }

  return { activity, updateActivity };
}
