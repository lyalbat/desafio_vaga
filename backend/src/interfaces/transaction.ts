import { UUID } from "crypto";

export interface Transaction {
    id: UUID
    nome: string
    cpfCnpj: number
    data: Date
    valor: number
}