"use client";

import { useState, useEffect } from "react";
//import { login, signup } from './actions'
import AuthForm from "@/components/AuthForm";
import { auth, errorMessages } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { toast } = useToast();

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard",
      });
      if (userCredential) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(errorMessages[error.code]);
      toast({
        title: "Login Failed",
        description: error.code,
        variant: "destructive",
      });
    }
    setEmail("");
    setPassword("");
  };

  const handleSignup = async (e: any) => {
    try {
      e.preventDefault();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      if (userCredential) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(errorMessages[error.code]);
    }
  };

  return (
    <AuthForm
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      email={email}
      setEmail={setEmail}
      displayName={displayName}
      setDisplayName={setDisplayName}
      password={password}
      setPassword={setPassword}
      error={error}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
    ></AuthForm>
  );
}
