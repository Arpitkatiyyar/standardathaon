// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { User, Session } from '@supabase/supabase-js';
// import { supabase, isSupabaseConfigured } from '../lib/supabase';

// interface Profile {
//   id: string;
//   full_name: string;
//   email: string;
//   team_id: string | null;
//   created_at: string;
// }

// interface AuthContextType {
//   user: User | null;
//   profile: Profile | null;
//   session: Session | null;
//   loading: boolean;
//   signUp: (
//     email: string,
//     password: string,
//     fullName: string
//   ) => Promise<{ error: Error | null }>;
//   signIn: (
//     email: string,
//     password: string
//   ) => Promise<{ data: { user: User | null } | null; error: Error | null }>;
//   signOut: () => Promise<void>;
//   refreshProfile: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async (userId: string) => {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', userId)
//       .maybeSingle();

//     if (error) {
//       console.error('Error fetching profile:', error);
//       return null;
//     }

//     return data;
//   };

//   const refreshProfile = async () => {
//     if (user) {
//       const profileData = await fetchProfile(user.id);
//       setProfile(profileData);
//     }
//   };

//   useEffect(() => {
//     if (!isSupabaseConfigured) {
//       setLoading(false);
//       return;
//     }

//     supabase.auth.getSession().then(({ data: { session } }) => {
//       (async () => {
//         setSession(session);
//         setUser(session?.user ?? null);

//         if (session?.user) {
//           const profileData = await fetchProfile(session.user.id);
//           setProfile(profileData);
//         }

//         setLoading(false);
//       })();
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         (async () => {
//           setSession(session);
//           setUser(session?.user ?? null);

//           if (session?.user) {
//             const profileData = await fetchProfile(session.user.id);
//             setProfile(profileData);
//           } else {
//             setProfile(null);
//           }
//         })();
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   const signUp = async (email: string, password: string, fullName: string) => {
//     try {
//       if (!isSupabaseConfigured) {
//         throw new Error('Supabase is not configured');
//       }

//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             full_name: fullName,
//           },
//         },
//       });

//       if (error) throw error;
//       return { error: null };
//     } catch (error) {
//       return { error: error as Error };
//     }
//   };

//   // ✅ FIXED SIGN-IN (THIS IS THE IMPORTANT PART)
//   const signIn = async (email: string, password: string) => {
//     try {
//       if (!isSupabaseConfigured) {
//         throw new Error('Supabase is not configured');
//       }

//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       // ✅ return user data so frontend can check email_confirmed_at
//       return { data, error: null };
//     } catch (error) {
//       return { data: null, error: error as Error };
//     }
//   };

//   const signOut = async () => {
//     if (!isSupabaseConfigured) return;
//     await supabase.auth.signOut();
//     setProfile(null);
//   };

//   const value = {
//     user,
//     profile,
//     session,
//     loading,
//     signUp,
//     signIn,
//     signOut,
//     refreshProfile,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { User, Session } from '@supabase/supabase-js';
// import { supabase, isSupabaseConfigured } from '../lib/supabase';

// interface Profile {
//   id: string;
//   full_name: string;
//   email: string;
//   team_id: string | null;
//   created_at: string;
// }

// interface AuthContextType {
//   user: User | null;
//   profile: Profile | null;
//   session: Session | null;
//   loading: boolean;
//   signUp: (
//     email: string,
//     password: string,
//     fullName: string,
//     phone: string
//   ) => Promise<{ error: Error | null }>;
//   signIn: (
//     email: string,
//     password: string
//   ) => Promise<{ data: { user: User | null } | null; error: Error | null }>;
//   signOut: () => Promise<void>;
//   refreshProfile: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async (userId: string) => {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', userId)
//       .maybeSingle();

//     if (error) {
//       console.error('Error fetching profile:', error);
//       return null;
//     }

//     return data;
//   };

//   const refreshProfile = async () => {
//     if (user) {
//       const profileData = await fetchProfile(user.id);
//       setProfile(profileData);
//     }
//   };

//   useEffect(() => {
//     if (!isSupabaseConfigured) {
//       setLoading(false);
//       return;
//     }

//     supabase.auth.getSession().then(({ data: { session } }) => {
//       (async () => {
//         setSession(session);
//         setUser(session?.user ?? null);

//         if (session?.user) {
//           const profileData = await fetchProfile(session.user.id);
//           setProfile(profileData);
//         }

//         setLoading(false);
//       })();
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       (async () => {
//         setSession(session);
//         setUser(session?.user ?? null);

//         if (session?.user) {
//           const profileData = await fetchProfile(session.user.id);
//           setProfile(profileData);
//         } else {
//           setProfile(null);
//         }
//       })();
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   // ✅ SIGN UP WITH PHONE (OPTION A)
//   const signUp = async (
//     email: string,
//     password: string,
//     fullName: string,
//     phone: string
//   ) => {
//     try {
//       if (!isSupabaseConfigured) {
//         throw new Error('Supabase is not configured');
//       }

//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             full_name: fullName,
//             phone: phone,
//           },
//         },
//       });

//       if (error) throw error;
//       return { error: null };
//     } catch (error) {
//       return { error: error as Error };
//     }
//   };

//   // ✅ SIGN IN (unchanged logic)
//   const signIn = async (email: string, password: string) => {
//     try {
//       if (!isSupabaseConfigured) {
//         throw new Error('Supabase is not configured');
//       }

//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       return { data, error: null };
//     } catch (error) {
//       return { data: null, error: error as Error };
//     }
//   };

//   const signOut = async () => {
//     if (!isSupabaseConfigured) return;
//     await supabase.auth.signOut();
//     setProfile(null);
//   };

//   const value = {
//     user,
//     profile,
//     session,
//     loading,
//     signUp,
//     signIn,
//     signOut,
//     refreshProfile,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  team_id: string | null;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => Promise<{ error: Error | null }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ data: { user: User | null } | null; error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data; // ✅ no casting
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        }

        setLoading(false);
      })();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✅ SIGN UP (AUTH + PROFILES) — ERROR-FREE
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => {
    try {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase is not configured");
      }

      // 1️⃣ Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (error) throw error;

      // 2️⃣ Insert into profiles (TYPE FIX APPLIED)
      if (data?.user) {
        await supabase.from("profiles").upsert(
          {
            id: data.user.id,
            full_name: fullName,
            email: email,
            phone: phone,
          } as any, // 👈 THIS FIXES THE TYPESCRIPT ERROR
        );
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // ✅ SIGN IN (UNCHANGED)
  const signIn = async (email: string, password: string) => {
    try {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase is not configured");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
    setProfile(null);
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
