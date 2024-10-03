"use client";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithGoogle } from "@/lib/auth";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div>
      <h1>Welcome to the Resume Builder</h1>
      {loading ? <p>Loading...</p> : <button onClick={handleLogin}>Login with Google</button>}
    </div>
  );
}
