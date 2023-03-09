/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { doc, where, addDoc, setDoc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "setup/firebase";

import { strippedUrl } from "utils/strutils";
import { useMe } from "hooks/users";

/*****************************************************************************
 * Hooks
 *****************************************************************************/
export const useUserBlocklist = (uid: string) => {
  const [blocklist, setBlocklist] = useState<string[]>([])
  const [userId, setUserId] = useState(uid);
  
  useEffect(() => {
    if (!uid) return;
    setUserId(uid);
    
    const unsub = onSnapshot(
      doc(db, "Blocklists", uid),
      { includeMetadataChanges: true }, 
      (doc) => {
        setBlocklist(doc.data().urls || [])
      }
    );

    return () => {
      unsub();
    }
  }, [uid]);

  const blockUrl = async (url) => {
    url = strippedUrl(url);
    if (userId && !blocklist.includes(url)) {
      await setDoc(doc(db, "Blocklists", userId), {
        urls: [...blocklist, url]
      }, { merge: true })
    }
  }

  const unblockUrl = async (url) => {
    url = strippedUrl(url)
    if (userId) {
      await setDoc(doc(db, "Blocklists", userId), {
        urls: blocklist.filter(item => item !== url)
      }, { merge: true })
    }
  }

  return { blocklist, blockUrl, unblockUrl };
}

export const useBlocklist = () => {
  const me = useMe();
  return useUserBlocklist(me?.uid || "")
}
