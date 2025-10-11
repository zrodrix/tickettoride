from dataclasses import dataclass
from .cidade import Cidade
from .carta import Carta

@dataclass
class BilheteDestino(Carta):
    cidadeOrigem: Cidade = None
    cidadeDestino: Cidade = None
    pontos: int = 0

    def __repr__(self):
        if self.cidadeOrigem and self.cidadeDestino:
            return f"<Bilhete {self.cidadeOrigem.id} -> {self.cidadeDestino.id} ({self.pontos})>"
        return f"<Bilhete ({self.pontos})>"
