"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithGoogle } from "@/lib/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null); // Manage authentication errors

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async () => {
    setAuthError(null); // Reset any previous errors
    try {
      await signInWithGoogle();
    } catch (err) {
      setAuthError("Failed to log in. Please try again.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div>
      <h1>Welcome to the Resume Builder</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {authError && <p style={{ color: "red" }}>{authError}</p>}
          <button onClick={handleLogin}>Login with Google</button>
        </>
      )}
    </div>
  );
}
