import "./Board.css";
import { useGame } from "../../context/GameContext";

export default function Board() {
  const { tabuleiro } = useGame();

  return (
    <div className="board">
      <h2>Tabuleiro</h2>
      {tabuleiro ? (
        <p>{tabuleiro.cidades.length} cidades carregadas</p>
      ) : (
        <p>Carregando tabuleiro...</p>
      )}
    </div>
  );
}
