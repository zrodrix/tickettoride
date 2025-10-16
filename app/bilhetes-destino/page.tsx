"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface BilheteDestino {
  id: string
  cidadeOrigem: string
  cidadeDestino: string
  pontos: number
}

interface Jogador {
  nome: string
  cor: string
  bilhetesSelecionados: BilheteDestino[]
}

export default function BilhetesDestinoPage() {
  const router = useRouter()
  const [jogadores, setJogadores] = useState<Jogador[]>([])
  const [jogadorAtualIndex, setJogadorAtualIndex] = useState(0)
  const [bilhetesDisponiveis, setBilhetesDisponiveis] = useState<BilheteDestino[]>([])
  const [bilhetesSelecionados, setBilhetesSelecionados] = useState<string[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    // Carregar jogadores do localStorage
    const jogadoresStorage = localStorage.getItem("jogadores")
    if (!jogadoresStorage) {
      router.push("/setup")
      return
    }

    const jogadoresData = JSON.parse(jogadoresStorage)
    const jogadoresComBilhetes = jogadoresData.map((j: any) => ({
      ...j,
      bilhetesSelecionados: []
    }))
    setJogadores(jogadoresComBilhetes)

    // Buscar 3 bilhetes aleatórios do backend
    buscarBilhetes()
  }, [])

 const buscarBilhetes = async () => {
  try {
    // Detecta automaticamente se está no Codespace ou local
    const isCodespace = window.location.hostname.includes('app.github.dev')
    const backendPort = '8000'
    
    let backendUrl
    if (isCodespace) {
      // No Codespace, substitui a porta 3001/3000 por 8000
      const baseUrl = window.location.hostname.replace(/-300[0-9]/, `-${backendPort}`)
      backendUrl = `${window.location.protocol}//${baseUrl}`
    } else {
      // Local
      backendUrl = `http://localhost:${backendPort}`
    }
    
    console.log('Buscando bilhetes de:', backendUrl)
    const response = await fetch(`${backendUrl}/bilhetes/sortear?quantidade=3`)
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`)
    }
    
    const bilhetes = await response.json()
    console.log('Bilhetes recebidos:', bilhetes)
    setBilhetesDisponiveis(bilhetes)
    setCarregando(false)
  } catch (error) {
    console.error("Erro ao conectar com backend:", error)
    alert(`Erro: ${error.message}\n\nCertifique-se de que o backend Python está rodando na porta 8000`)
    setCarregando(false)
  }
 }

  const toggleBilhete = (bilheteId: string) => {
    if (bilhetesSelecionados.includes(bilheteId)) {
      setBilhetesSelecionados(bilhetesSelecionados.filter(id => id !== bilheteId))
    } else {
      if (bilhetesSelecionados.length < 2) {
        setBilhetesSelecionados([...bilhetesSelecionados, bilheteId])
      }
    }
  }

  const confirmarSelecao = () => {
    if (bilhetesSelecionados.length !== 2) {
      alert("Você deve selecionar exatamente 2 bilhetes para continuar")
      return
    }

    // Salvar bilhetes selecionados para o jogador atual
    const bilhetesDoJogador = bilhetesDisponiveis.filter(b => 
      bilhetesSelecionados.includes(b.id)
    )
    
    const novosJogadores = [...jogadores]
    novosJogadores[jogadorAtualIndex].bilhetesSelecionados = bilhetesDoJogador
    setJogadores(novosJogadores)

    // Verificar se é o último jogador
    if (jogadorAtualIndex === jogadores.length - 1) {
      // Todos os jogadores escolheram, salvar e ir para o jogo
      localStorage.setItem("jogadores", JSON.stringify(novosJogadores))
      router.push("/jogo")
    } else {
      // Próximo jogador
      setJogadorAtualIndex(jogadorAtualIndex + 1)
      setBilhetesSelecionados([])
      setCarregando(true)
      buscarBilhetes()
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Carregando bilhetes...</div>
      </div>
    )
  }

  const jogadorAtual = jogadores[jogadorAtualIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Escolha seus Bilhetes Destino</h1>
            <div className="flex items-center gap-3">
              <div 
                className="w-6 h-6 rounded-full" 
                style={{ backgroundColor: jogadorAtual?.cor.toLowerCase() }}
              />
              <p className="text-xl text-gray-700">
                <span className="font-semibold">{jogadorAtual?.nome}</span> - 
                Jogador {jogadorAtualIndex + 1} de {jogadores.length}
              </p>
            </div>
            <p className="text-gray-600 mt-2">
              Selecione <strong>2 bilhetes</strong> para manter (você deve descartar 1)
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {bilhetesDisponiveis.map((bilhete) => {
              const selecionado = bilhetesSelecionados.includes(bilhete.id)
              return (
                <div
                  key={bilhete.id}
                  onClick={() => toggleBilhete(bilhete.id)}
                  className={`
                    p-6 rounded-lg border-2 cursor-pointer transition-all
                    ${selecionado 
                      ? 'border-blue-600 bg-blue-50 shadow-lg' 
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">🎫</span>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {bilhete.cidadeOrigem} → {bilhete.cidadeDestino}
                        </h3>
                      </div>
                      <p className="text-gray-600 ml-10">
                        Complete esta rota para ganhar pontos
                      </p>
                    </div>
                    <div className="text-center ml-4">
                      <div className="bg-yellow-400 text-gray-900 font-bold text-2xl rounded-full w-16 h-16 flex items-center justify-center">
                        {bilhete.pontos}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">pontos</p>
                    </div>
                  </div>
                  {selecionado && (
                    <div className="mt-3 flex items-center gap-2 text-blue-600 font-medium">
                      <span className="text-xl">✓</span>
                      Selecionado
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Bilhetes selecionados:</strong> {bilhetesSelecionados.length} de 2
            </p>
          </div>

          <button
            onClick={confirmarSelecao}
            disabled={bilhetesSelecionados.length !== 2}
            className={`
              w-full px-6 py-4 font-semibold text-lg rounded-lg transition-colors
              ${bilhetesSelecionados.length === 2
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {jogadorAtualIndex === jogadores.length - 1 
              ? 'Começar Jogo' 
              : 'Próximo Jogador'}
          </button>
        </div>
      </div>
    </div>
  )
}