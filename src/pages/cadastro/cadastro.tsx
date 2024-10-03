import Link from "@/pages/login"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent } from "react";

export default function LoginForm() {
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const firstName = (event.currentTarget as any).first_name.value;
    const lastName = (event.currentTarget as any).last_name.value;
    const email = (event.currentTarget as any).email.value;
    const password = (event.currentTarget as any).password.value;

    const response = await fetch('http://127.0.0.1:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Usuário registrado com sucesso', data);
      alert('Usuário registrado com sucesso!');
      window.location.href = '/login';
    } else {
      alert('Erro ao registrar usuário. Tente novamente.');
    }
  };

  return (


    <Card className="mx-auto max-w-sm mt-20">
      <CardHeader>
        <CardTitle className="text-xl"> Cadatro De Usuario</CardTitle>
        <CardDescription>
          Entre com suas informações para fazer seu cadastro!
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleRegister}>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Primeiro Nome</Label>
              <Input id="first-name" name="first_name" placeholder="Paulo" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Sobrenome</Label>
              <Input id="last-name"  name="last_name" placeholder="Silva" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" placeholder="Senha" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
         
        </div>
      </CardContent>
      </form>
    </Card>
  )
}