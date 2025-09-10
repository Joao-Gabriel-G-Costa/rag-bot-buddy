import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Carregando RAG Bot Buddy...</h1>
        <p className="text-xl text-muted-foreground">Redirecionando para o painel de controle</p>
      </div>
    </div>
  );
};

export default Index;
