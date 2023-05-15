export class Agenda {
    constructor(
        public cod_agenda?: number,
        public data?: Date,
        public dia_semana?: string,
        public tipo?: string,
        public projetos?: string,
        public atendimento?: string,
        public horas?: number,
        public funcao_gestor?: FuncaoGestor
    ) { }
}

export class FuncaoGestor {
    constructor(
        public id_funcao: number,
        public id_user: number,
        public data_inicio: Date,
        public data_fim: Date
    ) { }
}