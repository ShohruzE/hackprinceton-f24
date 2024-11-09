'use server'

import { AuthError, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, errorMessages } from "@/lib/firebase";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: 'Login successful' }
  } catch (error) {
    const authError = error as AuthError
    const errorMessage = errorMessages[authError.code]
    return { success: false, message: errorMessage }
  }
}

export async function signup(prevState: any, formData: FormData) {
  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, {
        displayName: username,
    });
    return { success: true, message: 'Signup successful' }
  } catch (error) {
    const authError = error as AuthError
    const errorMessage = errorMessages[authError.code]
    return { success: false, message: errorMessage }
  }
}
