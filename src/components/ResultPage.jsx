import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const { state } = useLocation();
  const { participants } = state || { participants: [] };
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Simula o tempo de sorteio antes de finalizar
    setTimeout(() => {
      setSuccess(true); // Finaliza o sorteio após 5 segundos
    }, 5000); // 5 segundos de sorteio
  }, [participants]);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 flex flex-col items-center justify-center text-white">
      {success ? (
        <div>
          <h1 className="text-4xl font-bold">Sorteio realizado com sucesso!</h1>
          <p className="mt-4 text-2xl">
            Os resultados foram enviados para os seus emails!
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold mb-6">Embaralhando...</h1>
          <p className="text-lg">Aguarde enquanto realizamos o sorteio...</p>
        </div>
      )}
    </div>
  );
}

export default ResultPage;
