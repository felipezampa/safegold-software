import { FuncaoGestor } from "../funcaogestor.model";
import { TipoAgenda } from "./tipoagenda.model";

// export interface Agenda {
//   funcao_gestor: FuncaoGestor
//   tipo: TipoAgenda
//   cod_projeto: number
//   atendimento: string
//   horas: number
//   projeto: string
//   dia: string
//   data: string
//   id: number
// }
export class Agenda {
  constructor(
    public funcao_gestor: FuncaoGestor,
    public tipo: TipoAgenda,
    public cod_projeto: number,
    public atendimento: string,
    public horas: number,
    public projeto: string,
    public dia: string,
    public data: string,
    public id: number
  ) { }
}

