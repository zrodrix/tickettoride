from dataclasses import dataclass

@dataclass
class Cidade:
    id: str
    nome: str

    def __repr__(self):
        return f"<Cidade {self.id} - {self.nome}>"
