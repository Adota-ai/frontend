import React, { useState } from 'react';
import './formAdoção.css';

const AdoptionForm = () => {
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCpf(cpf)) {
      setError('CPF inválido.');
      return;
    }

    if (!validateCep(cep)) {
      setError('CEP inválido.');
      return;
    }

    if (description.length < 10) {
      setError('A descrição deve ter pelo menos 10 caracteres.');
      return;
    }

    setError('');
    alert('Formulário enviado com sucesso!');
  };

  const validateCpf = (cpf: string) => {
    const cleanCpf = cpf.replace(/[^\d]/g, '');
  
    if (cleanCpf.length !== 11) {
      return false; 
    }
  
    let sum = 0;
    let remainder;
  
    if (/^(\d)\1*$/.test(cleanCpf)) {
      return false;
    }
  
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
    }
  
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(9, 10))) {
      return false;
    }
  
    sum = 0;
  
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
    }
  
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(10, 11))) {
      return false;
    }
  
    return true;
  };

  const validateCep = (cep: string) => {
    const cepRegex = /^\d{5}-\d{3}$/;
    return cepRegex.test(cep);
  };

  return (
    <div className="form-container">
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="00000-000"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Breve descrição sobre animais que já teve:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Fale um pouco sobre os animais que você já teve..."
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default AdoptionForm;
