import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
	return (
		<div className="flex justify-center items-center h-screen w-screen bg-zinc-800">
			<Card className="w-full max-w-sm h-[50%]">
				<CardHeader>
					<CardTitle className="text-4xl">Login</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-4">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-4">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" required />
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full">Sign in</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
