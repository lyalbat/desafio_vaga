import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    nome: { 
        type: String, 
        required: true 
    },
    cpfCnpj: { 
        type: Number, 
        required: true 
    },
    data: { 
        type: Date, 
        required: true 
    },
    valor: { 
        type: Number, 
        required: true 
    },
}, {
    timestamps: true,
});

export const TransactionModel = mongoose.model('Transaction', transactionSchema);
