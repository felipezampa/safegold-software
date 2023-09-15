import { FuncaoGestor } from "../funcaogestor.model";
import { TipoAgenda } from "./tipoagenda.model";

// export class Agenda {
//   constructor(
//     public funcao_gestor: FuncaoGestor,
//     public tipo: TipoAgenda,
//     public cod_projeto: number,
//     public atendimento: string,
//     public horas: number,
//     public projeto: string,
//     public dia: string,
//     public data: string,
//     public id: number
//   ) { }
// }
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
