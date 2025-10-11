import Board from "../components/Board/Board";
import TurnManager from "../components/TurnManager/TurnManager";
import PlayerPanel from "../components/Player/PlayerPanel";
import { useGame } from "../context/GameContext";

export default function Game() {
  const { jogadores } = useGame();

  return (
    <div>
      <TurnManager />
      <Board />
      <div className="players">
        {jogadores.map((j) => (
          <PlayerPanel key={j.id} jogador={j} />
        ))}
      </div>
    </div>
  );
}
