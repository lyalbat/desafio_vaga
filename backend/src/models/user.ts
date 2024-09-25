import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: true 
    },
    cpfCnpj: { 
        type: Number, 
        required: true,
        unique: true
    }
}, {
    timestamps: true,
});

export const UserModel = mongoose.model('User', userSchema);
