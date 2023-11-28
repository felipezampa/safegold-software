import { FuncaoGestor } from "../funcaogestor.model";

export class Agenda {
  constructor(
    public cod_agenda: number,
    public data: string,
    public dia_semana: string,
    public cod_tipo: number,
    public tipo: string,
    public cod_projeto: number,
    public projeto: string,
    public atendimento: string,
    public horas: string,
    public funcao_gestor: FuncaoGestor
  ) { }
}
