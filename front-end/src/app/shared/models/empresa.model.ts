import { Projeto } from "./projeto.model";

export interface Empresa {
    cod_empresa: number;
    empresa: string;
    data_cadastro: Date;
    data_atualiza: Date;
    safegold_ger: number;
    cnpj: string;
    cod_projeto: Projeto;
}

