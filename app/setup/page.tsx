"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SetupPage() {
  const router = useRouter()
  const [jogadores, setJogadores] = useState([{ nome: "", cor: "VERMELHO" }])

  const cores = ["VERMELHO", "AZUL", "VERDE", "AMARELO", "PRETO", "LARANJA"]

  const adicionarJogador = () => {
    if (jogadores.length < 5) {
      setJogadores([...jogadores, { nome: "", cor: cores[jogadores.length] }])
    }
  }

  const removerJogador = (index: number) => {
    if (jogadores.length > 2) {
      setJogadores(jogadores.filter((_, i) => i !== index))
    }
  }

  const atualizarJogador = (index: number, campo: string, valor: string) => {
    const novosJogadores = [...jogadores]
    novosJogadores[index] = { ...novosJogadores[index], [campo]: valor }
    setJogadores(novosJogadores)
  }

  const iniciarJogo = () => {
  const todosPreenchidos = jogadores.every((j) => j.nome.trim() !== "")
  if (!todosPreenchidos) {
    alert("Por favor, preencha o nome de todos os jogadores")
    return
  }

  if (jogadores.length < 2) {
    alert("É necessário pelo menos 2 jogadores")
    return
  }

  localStorage.setItem("jogadores", JSON.stringify(jogadores))
  router.push("/bilhetes-destino") // Mudança aqui!
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Configurar Jogo</h1>
          <p className="text-gray-600 mb-8">Adicione de 2 a 5 jogadores para começar</p>

          <div className="space-y-4 mb-6">
            {jogadores.map((jogador, index) => (
              <div key={index} className="flex gap-3 items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jogador {index + 1}</label>
                  <input
                    type="text"
                    value={jogador.nome}
                    onChange={(e) => atualizarJogador(index, "nome", e.target.value)}
                    placeholder="Nome do jogador"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-40">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                  <select
                    value={jogador.cor}
                    onChange={(e) => atualizarJogador(index, "cor", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cores.map((cor) => (
                      <option key={cor} value={cor}>
                        {cor}
                      </option>
                    ))}
                  </select>
                </div>
                {jogadores.length > 2 && (
                  <button
                    onClick={() => removerJogador(index)}
                    className="mt-6 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {jogadores.length < 5 && (
              <button
                onClick={adicionarJogador}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Adicionar Jogador
              </button>
            )}
            <button
              onClick={iniciarJogo}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Iniciar Jogo
            </button>
          </div>

          <button
            onClick={() => router.push("/")}
            className="mt-4 w-full px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  )
}
