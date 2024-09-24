import { Transaction } from '@/interfaces/transaction';
import { useState } from 'react';

const useAddTransaction = () => {
  const [error, setError] = useState<string | null>(null);

  const addTransaction = async (transaction: Transaction) => {
    try {
      const response = await fetch('/api/addTransaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      const data = await response.json();
      return data;
    } catch (err:any) {
      setError(err.message);
      console.error('Error adding transaction:', err);
      throw err; 
    }
  };

  return { addTransaction, error };
};

export default useAddTransaction;
