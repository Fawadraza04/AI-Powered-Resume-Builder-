import React, { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { supabase } from "./config/supabase";

export default function LogoutHandler() {
  const { setCurrentUser, setUserProfile } = useAuth();

  useEffect(() => {
    window.logout = async () => {
      const { error } = await supabase.auth.signOut();
      setCurrentUser(null);
      setUserProfile(null);
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
      if (error) throw error;
    };
    return () => {
      delete window.logout;
    };
  }, [setCurrentUser, setUserProfile]);

  return null;
}
