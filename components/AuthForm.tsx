'use client'

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

type AuthFunction = (prevState: any, formData: FormData) => Promise<{
    success: boolean;
    message: string;
    user?: string;
    code?: string;
}>

interface AuthFormProps {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
    login: AuthFunction;
    signup: AuthFunction;
  }

export default function AuthForm({ isLogin, setIsLogin, login, signup }: AuthFormProps) {
  const [loginState, loginAction] = useActionState(login, null)
  const [signupState, signupAction] = useActionState(signup, null)

  return (
    <div className="flex items-center justify-center align-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Enter your credentials to login' : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(value) => setIsLogin(value === 'login')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form action={loginAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" autoComplete="off" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form action={signupAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Username</Label>
                  <Input id="signup-username" name="username" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Sign Up</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          {(loginState || signupState) && (
            <div role="alert" className="w-full">
              {(loginState?.success || signupState?.success) ? (
                <Alert variant="default" className="w-full">
                  {/*<ExclamationTriangleIcon className="h-4 w-4" /> */}
                  <AlertDescription className="text-center text-green-400 text-sm font-medium">
                    {loginState?.message || signupState?.message}
                  </AlertDescription>
                </Alert>
              ) : (
                <p className="text-center text-red-500 text-sm font-medium">
                  {loginState?.message || signupState?.message}
                </p>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
