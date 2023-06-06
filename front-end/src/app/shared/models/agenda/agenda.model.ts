import { FuncaoGestor } from "../funcaogestor.model";
import { TipoAgenda } from "./tipoagenda.model";

export interface Agenda {
  funcao_gestor: FuncaoGestor
  tipo: TipoAgenda
  cod_projeto: number
  atendimento: string
  horas: number
  projeto: string
  dia: string
  data: string
  id: number
}