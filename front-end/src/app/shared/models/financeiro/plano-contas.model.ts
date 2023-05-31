export interface ContaAnalitica {
    cod_conta_analitica: number;
    cod_empresa: number;
    empresa: string;
    desc_conta: string;
    cod_subgrupo_contas: number;
    desc_subgrupo: string;
}

export interface SubGrupo {
    cod_subgrupo_contas: number;
    desc_subgrupo_contas: string;
    cod_grupo_contas: number;
}

export interface Grupo {
    cod_subgrupo_contas: number;
    desc_subgrupo_contas: string;
    cod_grupo_contas: number;
}