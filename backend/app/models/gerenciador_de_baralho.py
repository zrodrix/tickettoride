from dataclasses import dataclass, field
from .baralho import Baralho
from .carta_vagao import CartaVagao
from .bilhete_destino import BilheteDestino
from typing import List

@dataclass
class GerenciadorDeBaralho:
    baralhoVagoes: Baralho = field(default_factory=Baralho)
    descarteVagoes: List[CartaVagao] = field(default_factory=list)
    baralhoBilhetes: Baralho = field(default_factory=Baralho)

    def comprarCartaVagaoViewer(self, visivel: bool = True) -> CartaVagao:
        """Compra uma carta vagão (visível ou do baralho)
        
        Args:
            visivel: Se True, compra de cartas visíveis; se False, do baralho
        """
        carta = self.baralhoVagoes.comprar()
        if carta is None:
            self.reabastecerBaralhoVagaoVazio()
            carta = self.baralhoVagoes.comprar()
        return carta

    def comprarCartaVagaoViewer(self, indice: int) -> CartaVagao:
        """Compra uma carta vagão visível pelo índice"""
        # Implementação simplificada - assume que há cartas visíveis
        return self.comprarCartaVagaoViewer(visivel=True)

    def reabastecerBaralhoVagaoVazio(self):
        """Reabastece o baralho de vagões com as cartas do descarte"""
        if not self.baralhoVagoes.cartas and self.descarteVagoes:
            self.baralhoVagoes.cartas = self.descarteVagoes[:]
            self.descarteVagoes.clear()
            self.baralhoVagoes.embaralhar()

    def comprarBilhetes(self) -> List[BilheteDestino]:
        """Compra bilhetes de destino do baralho"""
        bilhetes = []
        for _ in range(3):  # Normalmente são 3 bilhetes
            bilhete = self.baralhoBilhetes.comprar()
            if bilhete:
                bilhetes.append(bilhete)
        return bilhetes

    def devolverBilhetes(self, bilhetes: List[BilheteDestino]):
        """Devolve bilhetes não aceitos ao fundo do baralho"""
        for bilhete in bilhetes:
            self.baralhoBilhetes.adicionar(bilhete, endOf=False)
