import { User } from "./user.model";

export interface Projeto {
    cod_projeto: number;
    projeto: string;
    ativo: number;
    safegold_ger: number;
    id_user: User;
}
