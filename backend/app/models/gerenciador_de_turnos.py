from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class GerenciadorDeTurnos:
    jogadores: List = field(default_factory=list)
    indiceAtual: int = 0

    def adicionarJogador(self, jogador):
        """Adiciona um jogador ao gerenciador"""
        self.jogadores.append(jogador)

    def getJogadorAtual(self):
        """Retorna o jogador atual"""
        if not self.jogadores:
            return None
        return self.jogadores[self.indiceAtual]

    def proximoJogador(self):
        """Avança para o próximo jogador e o retorna"""
        if not self.jogadores:
            return None
        self.indiceAtual = (self.indiceAtual + 1) % len(self.jogadores)
        return self.getJogadorAtual()

    def reiniciarTurnos(self):
        """Reinicia os turnos para o primeiro jogador"""
        self.indiceAtual = 0
