import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { convertFileToBase64 } from "@/lib/utils";

const FormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
	species: z
		.string()
		.min(2, { message: "Raça deve ter pelo menos 2 caracteres." }),
	age: z
		.string({ invalid_type_error: "Idade deve ser um número." })
		.min(0, { message: "Idade deve ser maior ou igual a 0." }),
	gender: z.enum(["macho", "femea"], { message: "Selecione o gênero." }),
	description: z
		.string()
		.min(5, { message: "Descrição deve ter pelo menos 5 caracteres." }),
	images: z
		.array(z.instanceof(File), { message: "Envie pelo menos uma imagem." })
		.nonempty({ message: "Envie pelo menos uma imagem." }),
});

export default function AnimalRegistrationForm() {
	const [previewImages, setPreviewImages] = useState<string[]>([]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			species: "",
			age: "1",
			description: "",
			images: [],
		},
	});

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const filesArray = Array.from(files);
			const previewArray = filesArray.map((file) => URL.createObjectURL(file));
			setPreviewImages(previewArray);
			form.setValue("images", filesArray);
		}
	};

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const base64String = (await convertFileToBase64(data.images[0])) as string;

		const animalsData = JSON.parse(
			localStorage.getItem("pets") as string,
		) as Animal[];

		interface Animal {
			id: number;
			name: string;
			species: string;
			age: number;
			description: string;
			image: string;
			status: string;
		}

		animalsData.push({
			id: animalsData[animalsData.length - 1].id + 1,
			name: data.name,
			age: Number.parseInt(data.age),
			species: data.species,
			description: data.description,
			image: base64String,
			status: "disponivel",
		});

		console.log(animalsData);

		localStorage.setItem("pets", JSON.stringify(animalsData));
	}

	return (
		<div className=" flex justify-center w-full h-full p-4">
			<Card className="shadow-lg h-full w-[80%]">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold text-left">
						Cadastro de Animais
					</CardTitle>
					<CardDescription>
						Entre com as informações do animal para fazer o cadastro!
					</CardDescription>
				</CardHeader>
				<CardContent className="flex grow">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6 w-full flex flex-col"
						>
							<div className="grid grid-cols-2 md:grid-cols-2 gap-6">
								{/* Nome */}
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome do Animal</FormLabel>
											<FormControl>
												<Input placeholder="Rex" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Raça */}
								<FormField
									control={form.control}
									name="species"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Raça</FormLabel>
											<FormControl>
												<Input placeholder="Labrador" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-2 gap-6">
								{/* Idade */}
								<FormField
									control={form.control}
									name="age"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Idade</FormLabel>
											<FormControl>
												<Input type="number" placeholder="3" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Gênero */}
								<FormField
									control={form.control}
									name="gender"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Gênero</FormLabel>
											<FormControl>
												<select
													{...field}
													className="border rounded-md p-2 w-full"
												>
													<option value="">Selecione o gênero</option>
													<option value="macho">Macho</option>
													<option value="femea">Fêmea</option>
												</select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-2 gap-6 h-36">
								{/* Descrição */}
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Descrição</FormLabel>
											<FormControl>
												<textarea
													placeholder="Um cão brincalhão e amigável"
													{...field}
													className="w-full h-32  border rounded-md p-2"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* Imagens */}
								<div className="h-32">
									<FormField
										control={form.control}
										name="images"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Imagens do Animal</FormLabel>
												<FormControl>
													<Input
														type="file"
														accept="image/*"
														multiple
														onChange={handleImageChange}
													/>
												</FormControl>
												<FormMessage />
												<div className="mt-4 grid grid-cols-2 gap-4">
													{previewImages.map((img, index) => (
														<img
															// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
															key={index}
															src={img}
															alt={`Prévia da imagem ${index + 1}`}
															className="w-16 h-16  object-cover rounded-md"
														/>
													))}
												</div>
											</FormItem>
										)}
									/>
								</div>
							</div>

							<div className="flex justify-center">
								<Button type="submit" className="w-full md:w-1/2 mt-4">
									Criar Cadastro
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
