"use client"
import Board from '@/components/Board';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Jogador {
  nome: string
  cor: string
  pontuacao: number
  vagoes: number
  cartas: number
}

export default function JogoPage() {
  const router = useRouter()
  const [jogadores, setJogadores] = useState<Jogador[]>([])
  const [turnoAtual, setTurnoAtual] = useState(0)
  const [mensagem, setMensagem] = useState("")

  useEffect(() => {
    const jogadoresStorage = localStorage.getItem("jogadores")
    if (!jogadoresStorage) {
      router.push("/setup")
      return
    }

    const jogadoresConfig = JSON.parse(jogadoresStorage)
    const jogadoresInicializados = jogadoresConfig.map((j: any) => ({
      ...j,
      pontuacao: 0,
      vagoes: 45,
      cartas: 4,
    }))
    setJogadores(jogadoresInicializados)
    setMensagem(`Vez de ${jogadoresInicializados[0].nome}`)
  }, [router])

  const proximoTurno = () => {
    const proximoIndice = (turnoAtual + 1) % jogadores.length
    setTurnoAtual(proximoIndice)
    setMensagem(`Vez de ${jogadores[proximoIndice].nome}`)
  }

  const comprarCarta = () => {
    const novosJogadores = [...jogadores]
    novosJogadores[turnoAtual].cartas += 2
    setJogadores(novosJogadores)
    setMensagem(`${jogadores[turnoAtual].nome} comprou 2 cartas`)
    setTimeout(proximoTurno, 1500)
  }

  const reivindicarRota = () => {
    const novosJogadores = [...jogadores]
    const jogadorAtual = novosJogadores[turnoAtual]

    if (jogadorAtual.cartas >= 3 && jogadorAtual.vagoes >= 3) {
      jogadorAtual.cartas -= 3
      jogadorAtual.vagoes -= 3
      jogadorAtual.pontuacao += 4
      setJogadores(novosJogadores)
      setMensagem(`${jogadorAtual.nome} reivindicou uma rota e ganhou 4 pontos!`)
      setTimeout(proximoTurno, 1500)
    } else {
      setMensagem("Cartas ou vagões insuficientes!")
    }
  }

  const getCoresBg = (cor: string) => {
    const cores: Record<string, string> = {
      VERMELHO: "bg-red-500",
      AZUL: "bg-blue-500",
      VERDE: "bg-green-500",
      AMARELO: "bg-yellow-500",
      PRETO: "bg-gray-800",
      LARANJA: "bg-orange-500",
    }
    return cores[cor] || "bg-gray-500"
  }

  if (jogadores.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Ticket to Ride</h1>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Sair do Jogo
              </button>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-lg font-semibold text-blue-900">{mensagem}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={comprarCarta}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
              >
                Comprar Cartas (2)
              </button>
              <button
                onClick={reivindicarRota}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
              >
                Reivindicar Rota (3 cartas, 3 vagões)
              </button>
            </div>
          </div>

          {/* Mapa do Brasil */}
          <Board />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jogadores.map((jogador, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg p-6 ${index === turnoAtual ? "ring-4 ring-blue-500" : ""}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${getCoresBg(jogador.cor)}`}></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{jogador.nome}</h3>
                    <p className="text-sm text-gray-500">{jogador.cor}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pontuação:</span>
                    <span className="font-bold text-lg">{jogador.pontuacao}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vagões:</span>
                    <span className="font-semibold">{jogador.vagoes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cartas:</span>
                    <span className="font-semibold">{jogador.cartas}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
