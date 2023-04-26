export interface Agenda {
    cod_agenda: number
    data: Date
    dia_semana: string
    tipo: string
    projetos: string
    atendimento: string
    horas: number
    funcao_gestor: FuncaoGestor
}

export interface FuncaoGestor {
    id_funcao: number
    id_user: number
    data_inicio: Date
    data_fim: Date
}