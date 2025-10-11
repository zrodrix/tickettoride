import { useGame } from "../../context/GameContext";

export default function TurnManager() {
  const { turnoAtual, jogadores } = useGame();

  return (
    <div>
      <h4>Turno Atual: {turnoAtual + 1}</h4>
      <p>Jogador: {jogadores[turnoAtual]?.nome || "N/A"}</p>
    </div>
  );
}
