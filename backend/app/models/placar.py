from dataclasses import dataclass, field
from typing import List

@dataclass
class Placar:
    jogadores: List = field(default_factory=list)

    def calcularPontuacaoAtualJogador(self, jogador) -> int:
        """Calcula a pontuação atual de um jogador (sem bilhetes)"""
        return jogador.pontuacao

    def calcularPontuacaoFinalJogador(self, jogador) -> int:
        """Calcula a pontuação final de um jogador (incluindo bilhetes)"""
        total = jogador.pontuacao
        
        # Adiciona pontos de bilhetes concluídos
        for bilhete in jogador.bilhetes:
            # TODO: Verificar se o bilhete foi realmente concluído
            # Por enquanto, assume que todos foram concluídos
            total += bilhete.pontos
        
        return total

    def atualizarPlacar(self):
        """Atualiza o placar com as pontuações atuais"""
        # Recalcula pontuações de todos os jogadores
        for jogador in self.jogadores:
            jogador.pontuacao = self.calcularPontuacaoAtualJogador(jogador)

    def getVencedor(self):
        """Retorna o jogador vencedor"""
        if not self.jogadores:
            return None
        
        pontuacoes = {j: self.calcularPontuacaoFinalJogador(j) for j in self.jogadores}
        vencedor = max(pontuacoes, key=pontuacoes.get)
        return vencedor
