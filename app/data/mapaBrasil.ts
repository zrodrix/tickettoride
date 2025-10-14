/**
 * Dados do mapa Ticket to Ride - Brasil
 * Posições das cidades no canvas (x, y em pixels)
 */

export const CORES = {
  VERMELHO: '#DC2626',
  AZUL: '#2563EB',
  VERDE: '#16A34A',
  AMARELO: '#FBBF24',
  PRETO: '#1F2937',
  LARANJA: '#EA580C',
};

export interface Cidade {
  id: string;
  nome: string;
  x: number;
  y: number;
}

export interface Rota {
  id: string;
  cidadeA: string;
  cidadeB: string;
  cor: keyof typeof CORES;
  comprimento: number;
}

export const CIDADES: Cidade[] = [
  { id: 'PORTO_ALEGRE', nome: 'Porto Alegre', x: 380, y: 630 },
  { id: 'CURITIBA', nome: 'Curitiba', x: 420, y: 550 },
  { id: 'SAO_PAULO', nome: 'São Paulo', x: 465, y: 515 },
  { id: 'RIO_DE_JANEIRO', nome: 'Rio de Janeiro', x: 520, y: 500 },
  { id: 'BELO_HORIZONTE', nome: 'Belo Horizonte', x: 500, y: 450 },
  { id: 'VITORIA', nome: 'Vitória', x: 570, y: 450 },
  { id: 'BRASILIA', nome: 'Brasília', x: 450, y: 380 },
  //{ id: 'GOIANIA', nome: 'Goiânia', x: 330, y: 410 },
  { id: 'CAMPO_GRANDE', nome: 'Campo Grande', x: 340, y: 460 },
  { id: 'CUIABA', nome: 'Cuiabá', x: 290, y: 380 },
  { id: 'SALVADOR', nome: 'Salvador', x: 600, y: 330 },
  { id: 'RECIFE', nome: 'Recife', x: 660, y: 240 },
  { id: 'FORTALEZA', nome: 'Fortaleza', x: 590, y: 168 },
  { id: 'BELEM', nome: 'Belém', x: 400, y: 140 },
  { id: 'MANAUS', nome: 'Manaus', x: 235, y: 160 },
];

export const ROTAS: Rota[] = [
  // Sul
  { id: 'R01', cidadeA: 'PORTO_ALEGRE', cidadeB: 'CURITIBA', cor: 'VERDE', comprimento: 3 },
  { id: 'R02', cidadeA: 'CURITIBA', cidadeB: 'SAO_PAULO', cor: 'AMARELO', comprimento: 2 },
  { id: 'R03', cidadeA: 'SAO_PAULO', cidadeB: 'RIO_DE_JANEIRO', cor: 'AZUL', comprimento: 2 },
  
  // Sudeste
  { id: 'R04', cidadeA: 'RIO_DE_JANEIRO', cidadeB: 'BELO_HORIZONTE', cor: 'PRETO', comprimento: 2 },
  { id: 'R05', cidadeA: 'RIO_DE_JANEIRO', cidadeB: 'VITORIA', cor: 'VERMELHO', comprimento: 3 },
  { id: 'R06', cidadeA: 'BELO_HORIZONTE', cidadeB: 'VITORIA', cor: 'VERDE', comprimento: 2 },
  { id: 'R07', cidadeA: 'SAO_PAULO', cidadeB: 'BELO_HORIZONTE', cor: 'LARANJA', comprimento: 3 },
  
  // Centro-Oeste
  { id: 'R08', cidadeA: 'BELO_HORIZONTE', cidadeB: 'BRASILIA', cor: 'AZUL', comprimento: 3 },
  { id: 'R09', cidadeA: 'SAO_PAULO', cidadeB: 'CAMPO_GRANDE', cor: 'PRETO', comprimento: 4 },
  { id: 'R10', cidadeA: 'CAMPO_GRANDE', cidadeB: 'CUIABA', cor: 'AMARELO', comprimento: 2 },
  { id: 'R11', cidadeA: 'CUIABA', cidadeB: 'BRASILIA', cor: 'VERMELHO', comprimento: 3 },
  { id: 'R12', cidadeA: 'BRASILIA', cidadeB: 'GOIANIA', cor: 'VERDE', comprimento: 1 },
  
  // Nordeste
  { id: 'R13', cidadeA: 'BRASILIA', cidadeB: 'SALVADOR', cor: 'LARANJA', comprimento: 4 },
  { id: 'R14', cidadeA: 'SALVADOR', cidadeB: 'RECIFE', cor: 'AZUL', comprimento: 4 },
  { id: 'R15', cidadeA: 'RECIFE', cidadeB: 'FORTALEZA', cor: 'VERDE', comprimento: 3 },
  
  // Norte
  { id: 'R16', cidadeA: 'FORTALEZA', cidadeB: 'BELEM', cor: 'VERMELHO', comprimento: 5 },
  { id: 'R17', cidadeA: 'BELEM', cidadeB: 'MANAUS', cor: 'PRETO', comprimento: 6 },
  { id: 'R18', cidadeA: 'MANAUS', cidadeB: 'CUIABA', cor: 'AMARELO', comprimento: 5 },
  
  // Rotas duplas
  { id: 'R19', cidadeA: 'PORTO_ALEGRE', cidadeB: 'CURITIBA', cor: 'AZUL', comprimento: 3 },
  { id: 'R20', cidadeA: 'SAO_PAULO', cidadeB: 'RIO_DE_JANEIRO', cor: 'VERMELHO', comprimento: 2 },
];
