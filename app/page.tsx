export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">Ticket to Ride</h1>
          <p className="text-xl text-gray-600 mb-12">Aventure-se em uma jornada épica de trens pelo mundo</p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Backend Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Backend Python</h3>
              <p className="text-gray-600 mb-4">Sistema completo implementado em Python</p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li>✓ Todas as classes do diagrama</li>
                <li>✓ Gerenciamento de turnos</li>
                <li>✓ Sistema de pontuação</li>
                <li>✓ Baralhos e cartas</li>
              </ul>
            </div>

            {/* Frontend Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Frontend React</h3>
              <p className="text-gray-600 mb-4">Interface interativa com React</p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li>✓ Tabuleiro visual</li>
                <li>✓ Painel de jogadores</li>
                <li>✓ Gerenciador de turnos</li>
                <li>✓ Sistema de rotas</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/setup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-lg transition-colors"
            >
              Iniciar Novo Jogo
            </a>
            <a
              href="/documentacao"
              className="bg-white hover:bg-gray-50 text-blue-600 font-semibold text-lg px-8 py-3 rounded-lg border-2 border-blue-600 transition-colors"
            >
              Ver Documentação
            </a>
          </div>

          <div className="mt-16 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Estrutura do Projeto</h2>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div>
                <h3 className="font-semibold mb-2">Classes Principais</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Jogo</li>
                  <li>• Jogador</li>
                  <li>• Tabuleiro</li>
                  <li>• Placar</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Gerenciadores</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• GerenciadorDeTurnos</li>
                  <li>• GerenciadorDeBaralho</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Componentes</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Carta / CartaVagao</li>
                  <li>• BilheteDestino</li>
                  <li>• Rota / Cidade</li>
                  <li>• Mao / Baralho</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
