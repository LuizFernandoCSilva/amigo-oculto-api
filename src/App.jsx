import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./config/api"; // A instância do axios

function App() {
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regex simples para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addParticipant = () => {
    if (!name || !email) {
      alert("Por favor, preencha ambos os campos de nome e email.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    const newParticipant = { name: name.toUpperCase(), email }; // Nome em uppercase
    setParticipants([...participants, newParticipant]);

    // Limpa os campos após adicionar o participante
    setName("");
    setEmail("");
  };

  const removeParticipant = (indexToRemove) => {
    setParticipants(participants.filter((_, index) => index !== indexToRemove));
  };

  const handleSortear = () => {
    if (participants.length < 2) {
      alert("Adicione pelo menos dois participantes antes de sortear!");
      return;
    }

    setLoading(true);

    // Envia todos os participantes para o backend
    api
      .post("/createnames", participants)
      .then((response) => {
        console.log("Participantes enviados com sucesso:", response.data);

        // Realiza o sorteio
        return api.post("/sortnames");
      })
      .then((response) => {
        console.log("Sorteio realizado com sucesso:", response.data);
        setLoading(false);
        setSuccess(true);

        // Redireciona para a página de resultados
        navigate("/result");
      })
      .catch((error) => {
        setLoading(false);

        // Verifica se é um erro retornado pelo backend
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(`Erro: ${error.response.data.message}`);
        } else {
          console.error("Erro durante o sorteio:", error);
          alert("Ocorreu um erro ao realizar o sorteio. Tente novamente.");
        }
        setParticipants([]); // Limpa a lista de participantes
      });
  };

  return (
    <div className="w-screen h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-6">
        <h1 className="text-text text-5xl font-extrabold tracking-tight">
          Sorteie Seu Amigo Oculto!
        </h1>
        <p className="text-highlight text-lg">
          Crie sorteios de maneira simples, rápida e divertida.
        </p>
      </div>
      <div className="bg-primary p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <input
          className="input-class"
          placeholder="Digite o nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-class"
          placeholder="Digite o email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-primary" onClick={addParticipant}>
          Adicionar Participante
        </button>
        <ul className="list-disc text-text list-inside space-y-1">
          {participants.map((p, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>
                {p.name} - {p.email}
              </span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeParticipant(index)}
                aria-label="Remover participante"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
        <button className="btn-secondary w-full" onClick={handleSortear}>
          Sortear
        </button>
        {loading && <div className="mt-6 spin-animation"></div>}
        {success && <p className="text-text">Sorteio realizado com sucesso!</p>}
      </div>
    </div>
  );
}

export default App;
