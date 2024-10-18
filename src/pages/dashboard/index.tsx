import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
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

	return (
		<div className="w-full h-full">
			<div className="flex flex-col w-full h-[95%] ">
				<div className="flex flex-col w-[80%]  justify-between px-4">
					<Carousel className="w-[90%] p-8">
						<CarouselContent>
							{animalsData.map((animal, index) => (
								<CarouselItem key={`pets-${index}`} className="basis-1/4">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-2">
											<NavLink to={`/pet/${animal.id}`}>
												<img
													className="object-cover"
													src={animal.image}
													alt={animal.name}
												/>
											</NavLink>
										</CardContent>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
					<div className="bg-white p-6  rounded-lg shadow-lg w-[90%]">
						<h2 className="text-xl font-bold mb-4">Área de Doação</h2>
						<p className="mb-4">
							Ajude a manter as Ongs Ativas! Faça sua doação abaixo
						</p>
						<Popover>
							<PopoverTrigger asChild>
								<Button className="bg-blue-500/90 hover:bg-blue-500/60 text-white px-4 py-2 rounded-md">
									Doar Agora
								</Button>
							</PopoverTrigger>
							<PopoverContent>Escolha Uma Ong Para doar</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>
		</div>
	);
}
