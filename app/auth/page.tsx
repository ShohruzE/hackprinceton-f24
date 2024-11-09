'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import AuthForm from '@/components/AuthForm'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} login={login} signup={signup}></AuthForm>
  )
}
