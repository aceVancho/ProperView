import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    console.log('Login form submitted with email:', email);
    e.preventDefault();
    try {
      await login(email);
      navigate('/dashboard')
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="agent#@example.com"
                  required
                />
              </div>
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
            </div>
          <Button type="submit" className="w-full mt-5">
            Login
          </Button>
          </form>
        </CardContent>

      </Card>
    </div>
  )
};

export default Login;