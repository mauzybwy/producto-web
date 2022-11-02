/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "setup/firebase";

import { Blocked } from "models/blocked";

/*****************************************************************************
 * Hooks
 *****************************************************************************/
export const useBlocklist = () => {
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
