import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from 'react';

export default function LoginForm() {
	const handleLogin = async(event: FormEvent<HTMLFormElement>)=> {
		event.preventDefault();

		const email = (event.currentTarget as any).email.value;
        const password = (event.currentTarget as any).password.value;

		const response = await fetch('http://127.0.0.1:8000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
			
			
			
		});
		
		if(response.ok) {
			const data = await response.json();

			console.log('Login feito com sucesso', data);
			window.location.href = '/home';
		} else {
			alert('Login falhou. Verifique suas credenciais.');
		}
	}
	
	return (
        <div>
            <div className="flex justify-center items-center h-screen w-screen bg-zinc-800">
                <Card className="w-full max-w-sm h-[50%]">
                    <CardHeader>
                        <CardTitle className="text-4xl">Login</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-4">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="gmail@example.com" required />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Password" required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Sign in</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
	);
}
