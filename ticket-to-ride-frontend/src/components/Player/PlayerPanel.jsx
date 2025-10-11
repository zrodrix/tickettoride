import "./PlayerPanel.css";

export default function PlayerPanel({ jogador }) {
  return (
    <div className="player-panel">
      <h3>{jogador.nome}</h3>
      <p>Pontuação: {jogador.pontuacao}</p>
      <p>Cartas: {jogador.mao?.length || 0}</p>
    </div>
  );
}
