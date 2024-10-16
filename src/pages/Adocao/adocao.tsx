import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './adocao.css';
const animalsData = [
    {
      id: 1,
      name: 'Rex',
      species: 'Cão',
      age: 3,
      description: 'Um cão amigável e brincalhão.',
      image: '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', 
      status: 'disponível'  
    },
    {
      id: 2,
      name: 'Miau',
      species: 'Gato',
      age: 2,
      description: 'Um gato curioso e carinhoso.',
      image:'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',
      status: 'disponível'  
    },
    {
      id: 3,
      name: 'Rex',
      species: 'Cão',
      age: 3,
      description: 'Um cão amigável e brincalhão.',
      image: '',
      status: 'disponível'  
    },
    {
      id: 4,
      name: 'Miau',
      species: 'Gato',
      age: 2,
      description: 'Um gato curioso e carinhoso.',
      image: '',
      status: 'disponível'  
      
    },
    {
      id: 5,
      name: 'Bobby',
      species: 'Cão',
      age: 4,
      description: 'Um cão leal e protetor.',
      image: '',
      status: 'disponível'  
    },
    {
      id: 6,
      name: 'Luna',
      species: 'Gato',
      age: 1,
      description: 'Uma gatinha brincalhona que adora explorar.',
      image: '',
      status: 'disponível'  
    },
    {
      id: 7,
      name: 'Pingo',
      species: 'Coelho',
      age: 2,
      description: 'Um coelho adorável e cheio de energia.',
      image: '',
      status: 'disponível'  
    }
  ];
  
  interface Animal {
    id: number;
    name: string;
    species: string;
    age: number;
    description: string;
    image: String;
    status: string ; 
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
          (animal) => animal.id === Number.parseInt(animalId)
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
        setAnimal({ ...animal, status: 'pendente' });
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
          <p><strong>Espécie:</strong> {animal.species}</p>
          <p><strong>Idade:</strong> {animal.age} anos</p>
          <p><strong>Descrição:</strong> {animal.description}</p>
          <p><strong>Status:</strong> {animal.status}</p>
  
          <button className={`adopt-button ${animal.status === 'pendente' ? 'pending' : ''}`} onClick={handleAdopt} disabled={animal.status === 'pendente'}>
            {animal.status === 'pendente' ? 'Adoção Pendente' : 'Adotar'}
          </button>
        </div>
  
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>X</button>
              <h2>Formulário de Adoção</h2>
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf" required placeholder="Digite seu CPF" />
  
                <label htmlFor="cep">CEP</label>
                <input type="text" id="cep" name="cep" required placeholder="Digite seu CEP" />
  
                <label htmlFor="phone">Número de Telefone</label>
                <input type="text" id="phone" name="phone" required placeholder="Digite seu número de telefone" />
  
                <label htmlFor="description">Descrição sobre os animais que já teve</label>
                <textarea id="description" name="description" rows={4} required placeholder="Escreva aqui..."></textarea>
  
                
                  <button type="submit">Enviar</button>
            
    
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
 

export default AnimalPage;

