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


export default function LoginForm() {
  return (


    <Card className="mx-auto max-w-sm mt-20">
      <CardHeader>
        <CardTitle className="text-xl"> Cadatro De Usuario</CardTitle>
        <CardDescription>
          Entre com suas informações para fazer seu cadastro!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Primeiro Nome</Label>
              <Input id="first-name" placeholder="Paulo" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Sobrenome</Label>
              <Input id="last-name" placeholder="Silva" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="Senha" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirme a Senha</Label>
            <Input id="password" type="password" placeholder="Senha" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
         
        </div>
      </CardContent>
    </Card>
  )
}
