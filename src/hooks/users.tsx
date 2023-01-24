/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { User } from "models/user";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/*****************************************************************************
 * Public Hooks
 *****************************************************************************/

export const useMe = () => {
  const [me, setMe] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();
    const unlisten = onAuthStateChanged(auth,
      authUser => {
        console.log(authUser)
        authUser
        ? setMe(authUser)
        : setMe(null);
      },
    );
    
    return () => {
      unlisten();
    }
  }, []);

  return me;
}
