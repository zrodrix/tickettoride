from dataclasses import dataclass
from .cidade import Cidade, CIDADES
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


# 🔽 Função auxiliar para buscar cidade por ID
def get_cidade(id: str) -> Cidade:
    for c in CIDADES:
        if c.id == id:
            return c
    raise ValueError(f"Cidade '{id}' não encontrada em CIDADES.")


# 🎯 30 cartas de destino — Ticket to Ride: Brasil
BILHETES_DESTINO: list[BilheteDestino] = [
    BilheteDestino(get_cidade("PORTO_ALEGRE"), get_cidade("BAURU"), 5),
    BilheteDestino(get_cidade("PORTO_ALEGRE"), get_cidade("CAMPO_GRANDE"), 7),
    BilheteDestino(get_cidade("PORTO_ALEGRE"), get_cidade("BRASILIA"), 10),
    BilheteDestino(get_cidade("PORTO_ALEGRE"), get_cidade("RIO_DE_JANEIRO"), 11),
    BilheteDestino(get_cidade("BAURU"), get_cidade("CAMPO_GRANDE"), 4),
    BilheteDestino(get_cidade("BAURU"), get_cidade("BRASILIA"), 6),
    BilheteDestino(get_cidade("BAURU"), get_cidade("RIO_DE_JANEIRO"), 6),
    BilheteDestino(get_cidade("BAURU"), get_cidade("SALVADOR"), 10),
    BilheteDestino(get_cidade("BRASILIA"), get_cidade("SALVADOR"), 7),
    BilheteDestino(get_cidade("BRASILIA"), get_cidade("RECIFE"), 11),
    BilheteDestino(get_cidade("BRASILIA"), get_cidade("FORTALEZA"), 12),
    BilheteDestino(get_cidade("BRASILIA"), get_cidade("BELEM"), 13),
    BilheteDestino(get_cidade("BRASILIA"), get_cidade("MANAUS"), 14),
    BilheteDestino(get_cidade("BRASILIA"), get_cidade("RIO_BRANCO"), 15),
    BilheteDestino(get_cidade("CAMPO_GRANDE"), get_cidade("CUIABA"), 5),
    BilheteDestino(get_cidade("CAMPO_GRANDE"), get_cidade("BRASILIA"), 5),
    BilheteDestino(get_cidade("CAMPO_GRANDE"), get_cidade("SALVADOR"), 10),
    BilheteDestino(get_cidade("CUIABA"), get_cidade("PALMAS"), 6),
    BilheteDestino(get_cidade("CUIABA"), get_cidade("MANAUS"), 10),
    BilheteDestino(get_cidade("CUIABA"), get_cidade("RIO_BRANCO"), 8),
    BilheteDestino(get_cidade("PALMAS"), get_cidade("BELEM"), 6),
    BilheteDestino(get_cidade("PALMAS"), get_cidade("FORTALEZA"), 7),
    BilheteDestino(get_cidade("PALMAS"), get_cidade("RECIFE"), 7),
    BilheteDestino(get_cidade("PALMAS"), get_cidade("SALVADOR"), 6),
    BilheteDestino(get_cidade("SALVADOR"), get_cidade("RECIFE"), 5),
    BilheteDestino(get_cidade("SALVADOR"), get_cidade("FORTALEZA"), 8),
    BilheteDestino(get_cidade("RECIFE"), get_cidade("FORTALEZA"), 4),
    BilheteDestino(get_cidade("BELEM"), get_cidade("MANAUS"), 10),
    BilheteDestino(get_cidade("BELEM"), get_cidade("FORTALEZA"), 7),
    BilheteDestino(get_cidade("RIO_BRANCO"), get_cidade("MANAUS"), 6),
]
