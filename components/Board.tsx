"use client"

import { useState } from 'react';
import { CIDADES, ROTAS, CORES, type Cidade, type Rota } from '@/app/data/mapaBrasil';

export default function Board() {
  const [rotaSelecionada, setRotaSelecionada] = useState<Rota | null>(null);
  const [cidadeHover, setCidadeHover] = useState<string | null>(null);

  const encontrarCidade = (id: string): Cidade | undefined => {
    return CIDADES.find(c => c.id === id);
  };

  const calcularPontoMedio = (rota: Rota) => {
    const cidadeA = encontrarCidade(rota.cidadeA);
    const cidadeB = encontrarCidade(rota.cidadeB);
    if (!cidadeA || !cidadeB) return { x: 0, y: 0 };
    return {
      x: (cidadeA.x + cidadeB.x) / 2,
      y: (cidadeA.y + cidadeB.y) / 2,
    };
  };

  const handleRotaClick = (rota: Rota) => {
    setRotaSelecionada(rota);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Mapa do Brasil</h2>
          <div className="flex gap-4 text-sm text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded-md font-medium">
              {CIDADES.length} cidades
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-md font-medium">
              {ROTAS.length} rotas
            </span>
          </div>
        </div>

        <div className="p-6 bg-sky-50">
          <svg 
            className="w-full h-auto border-2 border-gray-300 rounded-lg bg-sky-100" 
            viewBox="0 0 700 700"
          >
            <rect width="700" height="700" fill="#E0F2FE" />

            {ROTAS.map((rota) => {
              const cidadeA = encontrarCidade(rota.cidadeA);
              const cidadeB = encontrarCidade(rota.cidadeB);
              if (!cidadeA || !cidadeB) return null;
              
              const pontoMedio = calcularPontoMedio(rota);
              const isSelected = rotaSelecionada?.id === rota.id;

              return (
                <g key={rota.id}>
                  <line
                    x1={cidadeA.x}
                    y1={cidadeA.y}
                    x2={cidadeB.x}
                    y2={cidadeB.y}
                    stroke={CORES[rota.cor]}
                    strokeWidth={isSelected ? "8" : "6"}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all hover:opacity-80"
                    onClick={() => handleRotaClick(rota)}
                  />
                  
                  <circle
                    cx={pontoMedio.x}
                    cy={pontoMedio.y}
                    r="15"
                    fill="white"
                    stroke={CORES[rota.cor]}
                    strokeWidth="2"
                    onClick={() => handleRotaClick(rota)}
                    className="cursor-pointer"
                  />
                  <text
                    x={pontoMedio.x}
                    y={pontoMedio.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill={CORES[rota.cor]}
                    className="pointer-events-none"
                  >
                    {rota.comprimento}
                  </text>
                </g>
              );
            })}

            {CIDADES.map((cidade) => (
              <g 
                key={cidade.id}
                onMouseEnter={() => setCidadeHover(cidade.id)}
                onMouseLeave={() => setCidadeHover(null)}
              >
                <circle
                  cx={cidade.x}
                  cy={cidade.y}
                  r={cidadeHover === cidade.id ? "12" : "10"}
                  fill="#1E40AF"
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer transition-all"
                />
                
                <text
                  x={cidade.x}
                  y={cidade.y - 20}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#1F2937"
                  className="pointer-events-none"
                  style={{ textShadow: '1px 1px 2px white, -1px -1px 2px white' }}
                >
                  {cidade.nome}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {rotaSelecionada && (
          <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Rota Selecionada</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">De:</p>
                  <p className="font-semibold text-gray-900">
                    {encontrarCidade(rotaSelecionada.cidadeA)?.nome}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Para:</p>
                  <p className="font-semibold text-gray-900">
                    {encontrarCidade(rotaSelecionada.cidadeB)?.nome}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cor:</p>
                  <span 
                    className="inline-block px-3 py-1 rounded text-white text-xs font-bold uppercase"
                    style={{ backgroundColor: CORES[rotaSelecionada.cor] }}
                  >
                    {rotaSelecionada.cor}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Comprimento:</p>
                  <p className="font-semibold text-gray-900">
                    {rotaSelecionada.comprimento} vagões
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setRotaSelecionada(null)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}