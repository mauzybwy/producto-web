/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "setup/firebase";

import { useMe } from "hooks/users";
import { Blocked } from "models/blocked";

/*****************************************************************************
 * Hooks
 *****************************************************************************/
export const useUserBlocklist = (uid: string) => {
  const [blocklist, setBlocklist] = useState<Blocked[]>([])
  
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Blocklist"),
      { includeMetadataChanges: true }, 
      (snap) => setBlocklist(        
        snap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        } as Blocked))
      )
    );

    return () => {
      unsub();
    }
  }, []);

  return { blocklist };
}

export const useBlocklist = () => {
  const me = useMe();
  return useUserBlocklist(me?.uid)
}
