import { useState } from 'react';
import './Board.css';
import { CIDADES, ROTAS, CORES } from '../../data/mapaBrasil';

export default function Board() {
  const [rotaSelecionada, setRotaSelecionada] = useState(null);
  const [cidadeHover, setCidadeHover] = useState(null);

  // Encontrar cidade por ID
  const encontrarCidade = (id) => CIDADES.find(c => c.id === id);

  // Calcular ponto médio de uma rota
  const calcularPontoMedio = (rota) => {
    const cidadeA = encontrarCidade(rota.cidadeA);
    const cidadeB = encontrarCidade(rota.cidadeB);
    return {
      x: (cidadeA.x + cidadeB.x) / 2,
      y: (cidadeA.y + cidadeB.y) / 2,
    };
  };

  const handleRotaClick = (rota) => {
    setRotaSelecionada(rota);
    console.log('Rota selecionada:', rota);
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>Mapa do Brasil</h2>
        <div className="board-info">
          <span>{CIDADES.length} cidades</span>
          <span>{ROTAS.length} rotas</span>
        </div>
      </div>

      <svg 
        className="board-svg" 
        viewBox="0 0 700 700"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fundo */}
        <rect width="700" height="700" fill="#E0F2FE" />

        {/* Desenhar rotas */}
        {ROTAS.map((rota) => {
          const cidadeA = encontrarCidade(rota.cidadeA);
          const cidadeB = encontrarCidade(rota.cidadeB);
          const pontoMedio = calcularPontoMedio(rota);
          const isSelected = rotaSelecionada?.id === rota.id;

          return (
            <g key={rota.id}>
              {/* Linha da rota */}
              <line
                x1={cidadeA.x}
                y1={cidadeA.y}
                x2={cidadeB.x}
                y2={cidadeB.y}
                stroke={CORES[rota.cor]}
                strokeWidth={isSelected ? "8" : "6"}
                strokeLinecap="round"
                className="rota-linha"
                onClick={() => handleRotaClick(rota)}
                style={{ cursor: 'pointer' }}
              />
              
              {/* Círculo com o comprimento da rota */}
              <circle
                cx={pontoMedio.x}
                cy={pontoMedio.y}
                r="15"
                fill="white"
                stroke={CORES[rota.cor]}
                strokeWidth="2"
                onClick={() => handleRotaClick(rota)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={pontoMedio.x}
                y={pontoMedio.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fontWeight="bold"
                fill={CORES[rota.cor]}
                onClick={() => handleRotaClick(rota)}
                style={{ cursor: 'pointer', pointerEvents: 'none' }}
              >
                {rota.comprimento}
              </text>
            </g>
          );
        })}

        {/* Desenhar cidades */}
        {CIDADES.map((cidade) => (
          <g 
            key={cidade.id}
            onMouseEnter={() => setCidadeHover(cidade.id)}
            onMouseLeave={() => setCidadeHover(null)}
          >
            {/* Círculo da cidade */}
            <circle
              cx={cidade.x}
              cy={cidade.y}
              r={cidadeHover === cidade.id ? "12" : "10"}
              fill="#1E40AF"
              stroke="white"
              strokeWidth="2"
              className="cidade-circle"
            />
            
            {/* Nome da cidade */}
            <text
              x={cidade.x}
              y={cidade.y - 20}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#1F2937"
              className="cidade-nome"
            >
              {cidade.nome}
            </text>
          </g>
        ))}
      </svg>

      {/* Informações da rota selecionada */}
      {rotaSelecionada && (
        <div className="rota-info">
          <h3>Rota Selecionada</h3>
          <div className="rota-detalhes">
            <p><strong>De:</strong> {encontrarCidade(rotaSelecionada.cidadeA).nome}</p>
            <p><strong>Para:</strong> {encontrarCidade(rotaSelecionada.cidadeB).nome}</p>
            <p>
              <strong>Cor:</strong> 
              <span 
                className="rota-cor-badge" 
                style={{ backgroundColor: CORES[rotaSelecionada.cor] }}
              >
                {rotaSelecionada.cor}
              </span>
            </p>
            <p><strong>Comprimento:</strong> {rotaSelecionada.comprimento} vagões</p>
            <button 
              className="btn-fechar"
              onClick={() => setRotaSelecionada(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}