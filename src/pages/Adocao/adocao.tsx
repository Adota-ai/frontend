import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./adocao.css";
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

const AnimalPage = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState<Animal | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const animalId = Array.isArray(id) ? id[0] : id;
      const fetchedAnimal = animalsData.find(
        (animal) => animal.id === Number.parseInt(animalId),
      );

      setAnimal(fetchedAnimal);
      setLoading(false);
    }
  }, [id]);

  const handleAdopt = () => {
    setIsModalOpen(true); // Abre o modal quando o botão "Adotar" é clicado
  };

  const closeModal = () => {
    setIsModalOpen(false); // Função para fechar o modal
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (animal) {
      // Atualiza o status do animal para "pendente"
      setAnimal({ ...animal, status: "pendente" });
    }
    setIsModalOpen(false); // Fecha o modal após o envio
  };

  if (loading) return <p>Carregando...</p>;
  if (!animal) return <p>Animal não encontrado.</p>;

  return (
    <div className="animal-page">
      <div className="animal-card">
        <img
          className="animal-image"
          src={`data:image/jpeg;base64,${animal.image}`}
          alt={animal.name}
        />
        <h1>{animal.name}</h1>
        <p>
          <strong>Espécie:</strong> {animal.species}
        </p>
        <p>
          <strong>Idade:</strong> {animal.age} anos
        </p>
        <p>
          <strong>Descrição:</strong> {animal.description}
        </p>
        <p>
          <strong>Status:</strong> {animal.status}
        </p>

        <button
          className={`adopt-button ${animal.status === "pendente" ? "pending" : ""
            }`}
          onClick={handleAdopt}
          disabled={animal.status === "pendente"}
        >
          {animal.status === "pendente" ? "Adoção Pendente" : "Adotar"}
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              X
            </button>
            <h2>Formulário de Adoção</h2>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                required
                placeholder="Digite seu CPF"
              />

              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                id="cep"
                name="cep"
                required
                placeholder="Digite seu CEP"
              />

              <label htmlFor="phone">Número de Telefone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                placeholder="Digite seu número de telefone"
              />

              <label htmlFor="description">
                Descrição sobre os animais que já teve
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                placeholder="Escreva aqui..."
              ></textarea>

              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalPage;
