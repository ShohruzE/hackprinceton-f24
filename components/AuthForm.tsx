'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

/*
type AuthFunction = (prevState: any, formData: FormData) => Promise<{
    success: boolean;
    message: string;
    user?: string;
    code?: string;
}>
*/

interface AuthFormProps {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
    email: string;
    setEmail: (email: string) => void;
    displayName: string;
    setDisplayName: (displayName: string) => void;
    password: string;
    setPassword: (password: string) => void;
    error: string;
    handleLogin: (e: any) => void;
    handleSignup: (e: any) => void;
  }

export default function AuthForm({ isLogin, setIsLogin, email, setEmail, displayName, setDisplayName, password, setPassword, error, handleLogin, handleSignup }: AuthFormProps) {
  //const [loginState, loginAction] = useActionState(login, null)
  //const [signupState, signupAction] = useActionState(signup, null)

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
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Username</Label>
                  <Input id="signup-username" name="username" value={displayName} autoComplete="off" onChange={(e) => setDisplayName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Sign Up</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          {error && <div color="error">{error}</div>}
        </CardFooter>
      </Card>
    </div>
  )
}
