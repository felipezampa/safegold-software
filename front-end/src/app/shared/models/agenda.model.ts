// export class Agenda {
//     constructor(
//         public cod_agenda?: number,
//         public data?: Date,
//         public dia_semana?: string,
//         public tipo?: string,
//         public projetos?: string,
//         public atendimento?: string,
//         public horas?: number,
//         public funcao_gestor?: FuncaoGestor
//     ) { }
// }

export class FuncaoGestor {
    constructor(
        public id_func_gest: number,
        public id_funcao: number,
        public funcao: string,
        public id_user: number,
        public data_inicio: string,
        public data_fim: string | null,
        public username: string,
        public area: string,
        public unidade_de_negocios: string
    ) { }
}

export class TipoAgenda {
    constructor(
        public id_tipo: number,
        public tipo: string
    ) { }
}

export class DiaSemana {
    constructor(
        public index: number,
        public nome: String,
        public dia: Date,
        public cards: any[]
    ) { }
}
export interface Agenda {
    funcao_gestor: FuncaoGestor
    tipo: TipoAgenda
    cod_projeto: string
    atendimento: string
    horas: number
    projeto: string
    dia: string
    data: string
    id: number
}
