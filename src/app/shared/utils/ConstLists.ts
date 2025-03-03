export const countries = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
];

export const clientStatus = [
    { name: 'Ativo', code: 'ACTIVE' },
    { name: 'Inativo', code: 'INACTIVE' },
    { name: 'Pendente', code: 'PENDING' },
    { name: 'Ex-cliente', code: 'FORMER' },
    { name: 'Potencial', code: 'PROSPECTIVE' },
];

export const paymentStatus = [
    { name: "Pendente", code: 1 },
    { name: "Pago", code: 2 },
    { name: "Vencido", code: 3 },
    { name: "Cancelado", code: 4 },
    { name: "Em processo", code: 5 },
    { name: "Pago parcialmente", code: 6 },
    { name: "Em disputa", code: 7 },
    { name: "Reembolsado", code: 8 },
    { name: "Em cobrança", code: 9 }
]

export const propertyType = [
    { name: "CASA", code: "HOUSE"},
    { name: "APARTAMENTO", code: "CONDO"},
    { name: "FAZENDA", code: "FARM"},
    { name: "ARMAZÉM", code: "WAREHOUSE"},
    { name: "APARTAMENTO_COMERCIAL", code: "COMMERCIAL_APARTMENT"},
    { name: "LOJA_VAREJO", code: "RETAIL_STORE"},
    { name: "APARTAMENTO", code: "APARTMENT"},
    { name: "TERRENO", code: "LAND_PLOT"}
]

export const occupancyStatus = [
    { name: "OCUPADO", code: "OCCUPIED" },
    { name: "VAGO", code: "VACANT" },
    { name: "PENDENTE_ENTRADA", code: "PENDING_MOVE_IN" },
    { name: "PENDENTE_SAÍDA", code: "PENDING_MOVE_OUT" },
    { name: "EM_MANUTENÇÃO", code: "UNDER_MAINTENANCE" },
    { name: "ALUGADO", code: "LEASED" },
    { name: "DISPONÍVEL", code: "AVAILABLE" },
    { name: "RESERVADO", code: "RESERVED" }
]

export const requiredImagesByPropertyType: Record<string, string[]> = {
    HOUSE: ['mainFacade', 'livingRoom', 'diningRoom', 'kitchen', 'bedrooms', 'bathrooms', 'garage', 'backyard'],
    CONDO: ['mainFacade', 'livingRoom', 'diningRoom', 'kitchen', 'bedrooms', 'bathrooms', 'garage', 'serviceArea'],
    APARTMENT: ['mainFacade', 'livingRoom', 'diningRoom', 'kitchen', 'bedrooms', 'bathrooms', 'garage', 'serviceArea'],
    FARM: ['mainFacade', 'landscape', 'barn', 'livingRoom', 'kitchen', 'bedrooms', 'bathrooms'],
    WAREHOUSE: ['mainFacade', 'interior', 'storageArea'],
    COMMERCIAL_APARTMENT: ['mainFacade', 'officeRoom', 'meetingRoom', 'bathrooms'],
    RETAIL_STORE: ['mainFacade', 'salesFloor', 'storageArea'],
    LAND_PLOT: ['mainFacade', 'aerialView']
}; 

export const imagesValidateLabel: { [key: string]: string } = {
    mainFacade: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Fachada",
    livingRoom: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Sala de Estar",
    diningRoom: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Sala de Jantar",
    kitchen: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Cozinha",
    bedrooms: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens dos Quartos",
    bathrooms: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens dos Banheiros",
    serviceArea: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Área de Serviço",
    garage: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Garagem",
    backyard: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens do Quintal",
    interiorDetails: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens dos Detalhes do Interior",
    landscape: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Paisagem",
    barn: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens do Celeiro",
    storageArea: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Área de Armazenamento",
    officeRoom: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Sala de Escritório",
    meetingRoom: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Sala de Reunião",
    salesFloor: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Área de Vendas",
    aerialView: "[Mínimo de 01 foto e Máximo de 02 fotos] Imagens da Vista Aérea"
};

export const imagesRoomLabel: { [key: string]: string } = {
    mainFacade: "Fachada",
    livingRoom: "Sala de Estar",
    diningRoom: "Sala de Jantar",
    kitchen: "Cozinha",
    bedrooms: "Quartos",
    bathrooms: "Banheiros",
    serviceArea: "Área de Serviço",
    garage: "Garagem",
    backyard: "Quintal",
    interiorDetails: "Detalhes do Interior",
    landscape: "Paisagem",
    barn: "Celeiro",
    storageArea: "Área de Armazenamento",
    officeRoom: "Sala de Escritório",
    meetingRoom: "Sala de Reunião",
    salesFloor: "Área de Vendas",
    aerialView: "Vista Aérea"
};

export const imagesAmountRequired: Record<string, { min: number; max: number }> = {
    mainFacade: { min: 1, max: 2 },
    livingRoom: { min: 1, max: 2 },
    diningRoom: { min: 1, max:2 },
    kitchen: { min: 1, max: 4 },
    bedrooms: { min: 1, max: 4 },
    bathrooms: { min: 1, max: 4 },
    serviceArea: { min: 1, max: 2 },
    garage: { min: 1, max: 2 },
    backyard: { min: 1, max: 2 },
    interiorDetails: { min: 1, max: 4 },
    landscape: { min: 1, max: 3 },
    barn: { min: 1, max: 3 },
    storageArea: { min: 1, max: 3 },
    officeRoom: { min: 1, max: 3 },
    meetingRoom: { min: 1, max: 3 },
    salesFloor: { min: 1, max: 3 },
    aerialView: { min: 1, max: 3 }
};

export const propertiesSortOptions = [
    { label: 'Preço: Menor para Maior', value: 'priceAsc' },
    { label: 'Preço: Maior para Menor', value: 'priceDesc' },
    { label: 'Tipo: A-Z', value: 'typeAsc' },
    { label: 'Tipo: Z-A', value: 'typeDesc' },
    { label: 'Bairro: A-Z', value: 'districtAsc' },
    { label: 'Bairro: Z-A', value: 'districtDesc' }
];

export const invoiceDueDates = [
    { name: 5, code: 5 },
    { name: 10, code: 10 },
    { name: 15, code: 15 },
    { name: 20, code: 20 }
]

export const contractStatus = [
    { name: "ATIVO", code: "ACTIVE" },
    { name: "PENDENTE", code: "PENDING" },
    { name: "EXPIRADO", code: "EXPIRED" },
    { name: "ENCERRADO", code: "TERMINATED" },
    { name: "CANCELADO", code: "CANCELLED" }
];