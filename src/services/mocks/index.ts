export const mockItens = [
    {
        "id": 1,
        "codigo_produto": "abc123",
        "nome_produto": "Camiseta",
        "custo_bruto": 29.99,
        "impostos": 5.00,
        "referencia": "REF-001",
        "medida": "M"
    },
    {
        "id": 2,
        "codigo_produto": "def456",
        "nome_produto": "Calça Jeans",
        "custo_bruto": 79.99,
        "impostos": 10.00,
        "referencia": "REF-002",
        "medida": "38"
    },
    {
        "id": 3,
        "codigo_produto": "ghi789",
        "nome_produto": "Tênis Esportivo",
        "custo_bruto": 99.99,
        "impostos": 15.00,
        "referencia": "REF-003",
        "medida": "41"
    },
    {
        "id": 4,
        "codigo_produto": "jkl012",
        "nome_produto": "Vestido Floral",
        "custo_bruto": 49.99,
        "impostos": 8.00,
        "referencia": "REF-004",
        "medida": "P"
    },
    {
        "id": 5,
        "codigo_produto": "mno345",
        "nome_produto": "Camisa Social",
        "custo_bruto": 59.99,
        "impostos": 9.00,
        "referencia": "REF-005",
        "medida": "M"
    },
    {
        "id": 6,
        "codigo_produto": "pqr678",
        "nome_produto": "Shorts Jeans",
        "custo_bruto": 39.99,
        "impostos": 6.00,
        "referencia": "REF-006",
        "medida": "36"
    },
    {
        "id": 7,
        "codigo_produto": "stu901",
        "nome_produto": "Bolsa de Couro",
        "custo_bruto": 89.99,
        "impostos": 12.00,
        "referencia": "REF-007",
        "medida": "Único"
    },
    {
        "id": 8,
        "codigo_produto": "vwx234",
        "nome_produto": "Blusa de Tricô",
        "custo_bruto": 44.99,
        "impostos": 7.00,
        "referencia": "REF-008",
        "medida": "G"
    },
    {
        "id": 9,
        "codigo_produto": "yz0123",
        "nome_produto": "Saia Plissada",
        "custo_bruto": 54.99,
        "impostos": 8.50,
        "referencia": "REF-009",
        "medida": "M"
    },
    {
        "id": 10,
        "codigo_produto": "456xyz",
        "nome_produto": "Jaqueta de Couro",
        "custo_bruto": 149.99,
        "impostos": 20.00,
        "referencia": "REF-010",
        "medida": "G"
    }
];

export const mockLojas = [
    {
        id: 1,
        codigo_loja: "LOJA1",
        nome_loja: "Loja A",
        endereco: "Rua Principal, 123",
        cidade: "Cidade A",
        estado: "Estado A",
        cep: "12345-678",
    },
    {
        id: 2,
        codigo_loja: "LOJA2",
        nome_loja: "Loja B",
        endereco: "Avenida Central, 456",
        cidade: "Cidade B",
        estado: "Estado B",
        cep: "98765-432",
    },
    {
        id: 3,
        codigo_loja: "LOJA3",
        nome_loja: "Loja C",
        endereco: "Praça Principal, 789",
        cidade: "Cidade C",
        estado: "Estado C",
        cep: "54321-876",
    },
];

export const mockEstoques = [
    {
        id: 1,
        codigo_estoque: "EST001",
        nome_estoque: "Estoque A",
        endereco: "Bairro Industrial, 18",
        cidade: "Cidade A",
        estado: "Estado A",
        cep: "12345-786",
    },
    {
        id: 2,
        codigo_estoque: "EST002",
        nome_estoque: "Estoque B",
        endereco: "Bairro Industrial, 92",
        cidade: "Cidade B",
        estado: "Estado B",
        cep: "98765-324",
    },
    {
        id: 3,
        codigo_estoque: "EST003",
        nome_estoque: "Estoque C",
        endereco: "Bairro Industrial, 56",
        cidade: "Cidade C",
        estado: "Estado C",
        cep: "54321-768",
    },
    {
        id: 4,
        codigo_estoque: "EST003",
        nome_estoque: "Estoque D",
        endereco: "Bairro Baixada, 12",
        cidade: "Cidade B",
        estado: "Estado B",
        cep: "98765-960",
    },
]

export const mockCidades = [
    {
        id: 1,
        cidade: "Cidade A",
        estado: "Estado A",
    },

    {
        id: 2,
        cidade: "Cidade B",
        estado: "Estado B",
    },
    {
        id: 3,
        cidade: "Cidade C",
        estado: "Estado C",
    },
]

export const mockCategoria = [
    {
        id: 0,
        descricao: "Tudo",
        codigo: "CAT000",
        super: 0,
    },

    {
        id: 1,
        descricao: "Vestuário",
        codigo: "CAT001",
        super: 0,
    },
    {
        id: 2,
        descricao: "Roupas",
        codigo: "CAT002",
        super: 1,
    },
    {
        id: 3,
        descricao: "Calçado",
        codigo: "CAT003",
        super: 1,
    },
    {
        id: 4,
        descricao: "Acessórios",
        codigo: "CAT004",
        super: 1,
    },
]