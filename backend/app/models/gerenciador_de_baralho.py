from dataclasses import dataclass, field
from .baralho import Baralho
from .carta_vagao import CartaVagao
from .bilhete_destino import BilheteDestino
from .cor import Cor
from typing import List

@dataclass
class GerenciadorDeBaralho:
    baralhoVagoes: Baralho = field(default_factory=Baralho)
    descarteVagoes: List[CartaVagao] = field(default_factory=list)
    baralhoBilhetes: Baralho = field(default_factory=Baralho)

    def __post_init__(self):
        """Inicializa o baralho de vagões após a criação"""
        self.inicializarBaralhoVagoes()

    def inicializarBaralhoVagoes(self):
        """Cria as 110 cartas de vagão do jogo"""
        contador_id = 1
        
        # Cores normais: 12 cartas de cada (8 cores x 12 = 96 cartas)
        cores = [
            Cor.ROXO,
            Cor.BRANCO,
            Cor.AZUL,
            Cor.AMARELO,
            Cor.LARANJA,
            Cor.PRETO,
            Cor.VERMELHO,
            Cor.VERDE
        ]
        
        for cor in cores:
            for _ in range(12):
                carta = CartaVagao(
                    id=contador_id,
                    cor=cor,
                    ehLocomotiva=False
                )
                self.baralhoVagoes.adicionar(carta)
                contador_id += 1
        
        # Locomotivas: 14 cartas coringa (podem ser de qualquer cor)
        for _ in range(14):
            carta = CartaVagao(
                id=contador_id,
                cor=Cor.AMARELO,  # Cor padrão para locomotivas (pode ser qualquer uma)
                ehLocomotiva=True
            )
            self.baralhoVagoes.adicionar(carta)
            contador_id += 1
        
        # Embaralha o baralho após criar todas as cartas
        self.baralhoVagoes.embaralhar()
        
        print(f"✅ Baralho de vagões criado: {len(self.baralhoVagoes.cartas)} cartas")

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

    def comprarCartaVagaoVisivel(self, indice: int) -> CartaVagao:
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
