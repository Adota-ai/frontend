import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AnimalRegistrationForm() {
  const [images, setImages] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [cep, setCep] = useState<number | "">("");
  const [numero, setNumero] = useState<number | "">("");


  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]); 
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const CepResponse = await fetch (`viacep.com.br/ws/${cep}/json/`);
    console.log(CepResponse);
    const formData = {
      name,
      breed,
      age,
      gender,
      description,
      images,
    
    };
    
   
    console.log("Formulário enviado:", formData);
  };

  return (
  <div className=" w-[100%] h-[50%]">
    <Card className="  ">
  <CardHeader>
    <CardTitle className="text-xl text-left">Cadastro de Animais</CardTitle>
    <CardDescription>
      Entre com as informações do animal para fazer o cadastro!
    </CardDescription>
  </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
         
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome do Animal</Label>
            <Input
              id="nome"
              placeholder="Rex"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

         
          <div className="grid gap-2">
            <Label htmlFor="raca">Raça</Label>
            <Input
              id="raca"
              placeholder="Labrador"
              required
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="idade">Idade</Label>
            <Input
              id="idade"
              placeholder="3"
              type="number"
              required
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || "")}
              className="w-full"
            />
          </div>

          <div className="grid gap-2 ">
            <Label htmlFor="genero">Gênero</Label>
            <select
              id="genero"
              className="border rounded-md p-2 w-full"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Selecione o gênero</option>
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
            </select>
          </div>

        
          <div className="grid gap-2">
            <Label htmlFor="descricao">Descrição</Label>
            <textarea
              id="descricao"
              placeholder="Um cão brincalhão e amigável"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24 border rounded-md p-2" 
            />
          </div>

          
          <div className="grid gap-2">
            <Label htmlFor="imagem">Imagens do Animal</Label>
            <Input
              id="imagem"
              type="file"
              accept="image/*"
              multiple 
              onChange={handleImageChange}
              required
              className="w-full"
            />
            
            <div className="mt-2 grid grid-cols-2 gap-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt={`Prévia da imagem ${index + 1}`}
                  className="w-full h-auto rounded-md"
                />
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cep">cep</Label>
            <Input
              id="cep"
              placeholder="cep"
              type="number"
              required
              value={cep}
              onChange={(e) => setCep(Number(e.target.value) || "")}
              className="w-full"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="NumCasa">Numero Da Casa</Label>
            <Input
              id="NumCasa"
              placeholder="Numero da Casa"
              type="number"
              required
              value={numero}
              onChange={(e) => setNumero(Number(e.target.value) || "")}
              className="w-full"
            />
          </div>

         
          <Button type="submit" className="w-full mt-4">
            Criar Cadastro
          </Button>
        </form>

      </CardContent>
    </Card>
    </div>
  );
}
