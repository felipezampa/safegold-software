
export class Projeto {
  constructor(
    public cod_projeto?: number,
    public projeto?: string,
    public ativo?: boolean,
    public cod_segmento?: number,
    public cep?: string,
    public cidade?: string,
    public estado?: Estado,
    public acesso_financeiro?: boolean
  ) { }
}

export class Estado {
  constructor(
    public nome?: string,
    public uf?: string
  ) { }
}
