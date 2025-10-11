from dataclasses import dataclass, field
from .gerenciador_de_turnos import GerenciadorDeTurnos
from .gerenciador_de_baralho import GerenciadorDeBaralho
from .placar import Placar
from .tabuleiro import Tabuleiro
from typing import Optional

@dataclass
class Jogo:
    id: int
    gerenciadorDeTurnos: GerenciadorDeTurnos = field(default_factory=GerenciadorDeTurnos)
    gerenciadorDeBaralho: Optional[GerenciadorDeBaralho] = None
    placar: Optional[Placar] = None
    tabuleiro: Tabuleiro = field(default_factory=Tabuleiro)
    iniciado: bool = False
    finalizado: bool = False

    def iniciar(self):
        """Inicializa o jogo"""
        self.placar = Placar(jogadores=self.gerenciadorDeTurnos.jogadores)
        self.gerenciadorDeBaralho = GerenciadorDeBaralho()
        self.iniciado = True

    def proximar(self):
        """Avança para o próximo turno"""
        return self.gerenciadorDeTurnos.proximoJogador()

    def jogar(self, acao: str, parametros: dict = None):
        """Executa uma ação de jogo
        
        Args:
            acao: Tipo de ação (comprar_carta, reivindicar_rota, etc)
            parametros: Parâmetros específicos da ação
        """
        jogador_atual = self.gerenciadorDeTurnos.getJogadorAtual()
        
        if acao == "comprar_carta":
            carta = self.gerenciadorDeBaralho.comprarCartaVagaoViewer()
            if carta:
                jogador_atual.comprarCartaVagao(carta)
        
        elif acao == "reivindicar_rota":
            if parametros and "rota_id" in parametros:
                rota = self.tabuleiro.obterRotaPorId(parametros["rota_id"])
                if rota and parametros.get("cartas"):
                    if rota.reivindicarRota(jogador_atual, parametros["cartas"]):
                        jogador_atual.reivindicarRota(rota)
                        # Adiciona pontos baseado no comprimento da rota
                        pontos_rota = {1: 1, 2: 2, 3: 4, 4: 7, 5: 10, 6: 15}
                        jogador_atual.pontuacao += pontos_rota.get(rota.comprimento, 0)
        
        elif acao == "comprar_bilhetes":
            bilhetes = self.gerenciadorDeBaralho.comprarBilhetes()
            aceitos = jogador_atual.comprarBilhetesDestino(bilhetes)
            nao_aceitos = [b for b in bilhetes if b not in aceitos]
            self.gerenciadorDeBaralho.devolverBilhetes(nao_aceitos)
        
        elif acao == "passar":
            jogador_atual.passarTurno()

    def validarFimDeJogo(self) -> bool:
        """Valida se o jogo chegou ao fim
        
        Returns:
            True se o jogo deve terminar
        """
        # Fim de jogo quando qualquer jogador tiver 2 ou menos vagões
        for jogador in self.gerenciadorDeTurnos.jogadores:
            if len(jogador.vagoes) <= 2:
                return True
        return False

    def encerrar(self):
        """Encerra o jogo"""
        self.finalizado = True
        if self.placar:
            self.placar.atualizarPlacar()
