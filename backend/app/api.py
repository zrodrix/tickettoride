from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import Jogo, Jogador, CartaVagao, GerenciadorDeBaralho, Cor
from random import sample
from app.models.bilhete_destino import BILHETES_DESTINO

app = FastAPI()

# CORS middleware - ATUALIZADO para permitir a porta 3001
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://supreme-zebra-6wxrr7g7xx43x4vw-3000.app.github.dev",
        "https://supreme-zebra-6wxrr7g7xx43x4vw-3001.app.github.dev",
        "https://supreme-zebra-6wxrr7g7xx43x4vw-3002.app.github.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for active games
active_games = {}

@app.post("/games")
async def create_game(game: Jogo):
    active_games[game.id] = game
    return game

@app.get("/games/{game_id}")
async def get_game_state(game_id: str):
    game = active_games.get(game_id)
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    return game

@app.get("/games/{game_id}/player-cards/{player_id}")
async def get_player_cards(game_id: str, player_id: str):
    game = active_games.get(game_id)
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    player = game.get_player(player_id)
    return player.cards

@app.post("/games/{game_id}/buy-cards")
async def buy_cards(game_id: str, player_id: str, card_ids: list):
    game = active_games.get(game_id)
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    player = game.get_player(player_id)
    return {"message": "Cards bought successfully"}

@app.get("/baralho-info")
async def get_baralho_info():
    return GerenciadorDeBaralho.get_info()

@app.get("/bilhetes/sortear")
async def sortear_bilhetes(quantidade: int = 3):
    """Sorteia bilhetes destino aleatórios do baralho"""
    bilhetes_sorteados = sample(BILHETES_DESTINO, min(quantidade, len(BILHETES_DESTINO)))
    return [
        {
            "id": bilhete.id,
            "cidadeOrigem": bilhete.cidadeOrigem.nome,
            "cidadeDestino": bilhete.cidadeDestino.nome,
            "pontos": bilhete.pontos
        }
        for bilhete in bilhetes_sorteados
    ]