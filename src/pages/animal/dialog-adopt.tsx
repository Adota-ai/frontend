import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

interface Animal {
	id: number;
	name: string;
	species: string;
	age: number;
	description: string;
	image: string;
	status: string; // Status pode ser "disponível", "pendente", "adotado", etc.
}

interface AdoptionFormProps {
	animal: Animal | undefined;
}

// Definindo o esquema de validação com Zod
const FormSchema = z.object({
	cpf: z
		.string()
		.min(1, { message: "CPF é obrigatório." })
		.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido." }),
	cep: z
		.string()
		.min(1, { message: "CEP é obrigatório." })
		.regex(/^\d{5}-\d{3}$/, { message: "CEP inválido." }),
});

const AdoptionForm: React.FC<AdoptionFormProps> = ({ animal }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			cpf: "",
			cep: "",
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		const animals = JSON.parse(
			localStorage.getItem("pets") as string,
		) as Animal[];

		const an = animals.map((a) => {
			if (a.id === animal?.id) {
				return { ...a, status: "em analise" };
			}
			return a;
		});
		console.log(an);

		localStorage.setItem("pets", JSON.stringify(an));

		toast({
			title: "Adoção iniciada!",
			description: `A adoção do animal ${animal?.name} foi iniciada com sucesso!`,
			variant: "success", // Você pode definir um estilo se estiver usando variantes
		});
		navigate("/dashboard"); // Navega para a mesma rota
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					disabled={animal?.status !== "disponível"}
					className="flex w-full"
				>
					Adotar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adoção de {animal?.name}</DialogTitle>
					<DialogDescription>
						Preencha o formulário abaixo para iniciar o processo de adoção.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="cpf"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										CPF: <FormMessage />
									</FormLabel>
									<FormControl>
										<Input placeholder="000.000.000-00" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="cep"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										CEP: <FormMessage />
									</FormLabel>
									<FormControl>
										<Input placeholder="00000-000" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit">Enviar</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AdoptionForm;
