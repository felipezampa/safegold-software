
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