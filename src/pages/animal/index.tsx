import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Adopt from "./dialog-adopt";

interface Animal {
	id: number;
	name: string;
	species: string;
	age: number;
	description: string;
	image: string;
	status: string;
}

export default function Animal() {
	const { id } = useParams(); // 'id' will be a string
	const navigate = useNavigate();
	const [animal, setAnimal] = useState<Animal | undefined>(undefined);

	useEffect(() => {
		if (!id) {
			navigate("/");
			return;
		}

		const animals = JSON.parse(
			localStorage.getItem("pets") as string,
		) as Animal[];

		const animal = animals.find(
			(animal) => animal.id === Number.parseInt(id), // Converte o 'id' para número
		);

		if (!animal) {
			navigate("/");
		} else {
			setAnimal(animal);
		}
	}, [id, navigate]);

	return (
		<div className="flex justify-center p-4">
			<Card className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
				<CardHeader>
					<img
						className=" w-full h-64 object-cover rounded-md mb-4"
						src={animal?.image}
						alt={animal?.name}
					/>
					<CardTitle className="text-2xl font-bold mb-2">
						{animal?.name}
					</CardTitle>
					<CardDescription>
						<p>
							<strong>Espécie:</strong> {animal?.species}
						</p>
						<p>
							<strong>Idade:</strong> {animal?.age} anos
						</p>
						<p>
							<strong>Descrição:</strong> {animal?.description}
						</p>
						<p>
							<strong>Status:</strong> {animal?.status}
						</p>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Adopt animal={animal} />
				</CardContent>
			</Card>
		</div>
	);
}
