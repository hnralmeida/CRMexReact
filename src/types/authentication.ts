export interface companyData {
    id: number;
    cnpj: string;
    nome_fantasia: string;
    razao_social?: string;
    email: string;
}

export interface ProdutoData {
    id: number;
    codigo_produto: string;
    descricao: string;
    referencia: string;
    marca: string;
    estoque: string;
    ultima_alteracao: Date;
}
export interface formapgtoData {
    id: number;
    id_empresa: number;
    codigo_formaspgto: number;
    descricao: string;
}

export interface ParcelasData {
    id: number;
    id_empresa: number;
    codigo_parcelas: number;
    descricao: string;
}


export interface imageData {
    id: number;
    id_empresa: number;
    imagem: File;
}