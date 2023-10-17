
export interface Projeto {
  cod_projeto: number
  projeto: string
  ativo: boolean
  cod_segmento: number
  cep: string
  cidade: string
  estado: Estado
  acesso_financeiro: boolean
}

export interface Estado{
    nome: string
    uf: string
}

export interface ViaCEP {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}
