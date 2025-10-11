import { useGame } from "../context/GameContext"
import { Link } from "react-router-dom"

export default function Results() {
  const { jogadores, placar } = useGame()

  // Calcular pontuações finais
  const jogadoresComPontuacao = jogadores
    .map((jogador) => ({
      ...jogador,
      pontuacaoFinal: placar?.calcularPontuacaoFinalJogador(jogador) || jogador.pontuacao,
    }))
    .sort((a, b) => b.pontuacaoFinal - a.pontuacaoFinal)

  const vencedor = jogadoresComPontuacao[0]

  return (
    <div className="results-container">
      <h1>Fim de Jogo!</h1>

      <div className="winner-section">
        <h2>Vencedor: {vencedor?.nome}</h2>
        <p>Pontuação: {vencedor?.pontuacaoFinal}</p>
      </div>

      <div className="scoreboard">
        <h3>Placar Final</h3>
        <table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Jogador</th>
              <th>Cor</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {jogadoresComPontuacao.map((jogador, index) => (
              <tr key={jogador.id}>
                <td>{index + 1}º</td>
                <td>{jogador.nome}</td>
                <td>{jogador.cor}</td>
                <td>{jogador.pontuacaoFinal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/">
        <button>Voltar ao Início</button>
      </Link>
    </div>
  )
}
