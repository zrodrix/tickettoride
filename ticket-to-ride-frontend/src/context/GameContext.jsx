import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [jogo, setJogo] = useState(null);
  const [jogadores, setJogadores] = useState([]);
  const [tabuleiro, setTabuleiro] = useState(null);
  const [turnoAtual, setTurnoAtual] = useState(0);

  return (
    <GameContext.Provider
      value={{
        jogo,
        setJogo,
        jogadores,
        setJogadores,
        tabuleiro,
        setTabuleiro,
        turnoAtual,
        setTurnoAtual,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
