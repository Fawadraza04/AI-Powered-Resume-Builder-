/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../config/supabase";

const AuthContext = createContext();
export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) throw error;
    return data;
  };

  // Login with email and password
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  // Login with Google
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) throw error;
    return data;
  };

  // Logout
  const logout = async () => {
    try {
      // Clear local state first
      setCurrentUser(null);
      setUserProfile(null);
      localStorage.clear();
      sessionStorage.clear();

      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase signOut error:", error);
      }
    } catch (err) {
      console.error("Logout exception:", err);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching profile:", error);
    }

    if (data) {
      setUserProfile(data);
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    if (currentUser) {
      const { error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", currentUser.id);

      if (error) throw error;
      setUserProfile((prev) => ({ ...prev, ...updates }));
    }
  };

  useEffect(() => {
    let timeout = null;
    // Timeout to prevent infinite loading (fallback)
    timeout = setTimeout(() => {
      console.warn(
        "AuthProvider: Fallback timeout reached, forcing loading=false"
      );
      setLoading(false);
    }, 5000);

    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        clearTimeout(timeout);
        if (error) {
          console.error("Session error:", error);
          setLoading(false);
          return;
        }
        const user = session?.user ?? null;
        setCurrentUser(
          user
            ? {
                ...user,
                displayName:
                  user.user_metadata?.display_name ||
                  user.user_metadata?.full_name ||
                  user.email,
                photoURL:
                  user.user_metadata?.avatar_url ||
                  user.user_metadata?.picture ||
                  user.identities?.[0]?.identity_data?.picture,
              }
            : null
        );
        if (user) {
          fetchUserProfile(user.id);
        }
        setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeout);
        console.error("Supabase connection error:", err);
        setLoading(false);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user ?? null;
      console.log("Auth state change:", event, user);
      if (user) {
        console.log("User metadata:", user.user_metadata);
        console.log("User identities:", user.identities);
      }
      setCurrentUser(
        user
          ? {
              ...user,
              displayName:
                user.user_metadata?.display_name ||
                user.user_metadata?.full_name ||
                user.email,
              photoURL:
                user.user_metadata?.avatar_url ||
                user.user_metadata?.picture ||
                user.identities?.[0]?.identity_data?.picture,
            }
          : null
      );

      if (user) {
        await fetchUserProfile(user.id);

        // Create profile if doesn't exist (for OAuth users)
        if (event === "SIGNED_IN") {
          const { data: existingProfile } = await supabase
            .from("users")
            .select("id")
            .eq("id", user.id)
            .single();

          if (!existingProfile) {
            await supabase.from("users").insert({
              id: user.id,
              email: user.email,
              display_name:
                user.user_metadata?.full_name ||
                user.user_metadata?.display_name ||
                user.email,
              avatar_url:
                user.user_metadata?.avatar_url ||
                user.user_metadata?.picture ||
                user.identities?.[0]?.identity_data?.picture,
              created_at: new Date().toISOString(),
            });
          }
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => {
      if (timeout) clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateUserProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
