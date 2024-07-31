import { IEndereco } from "../../Endereco/Models/IEndereco";

export interface IPrestador {
    id: string;
    
    nome: string;

    nome_fantasia: string;
    
    razao_social: string;
    
    cpf_cnpj: number;
    
    email: string;
    
    senha: string;

    confirmarSenha: string
}