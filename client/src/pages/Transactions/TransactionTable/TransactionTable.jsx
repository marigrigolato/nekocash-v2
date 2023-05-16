import React from 'react';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styles from './TransactionTable.module.css';

const TransactionTable = ({ asyncTransactions }) => {
  return (
    <div className={styles['transactions']}>
      {asyncTransactions && asyncTransactions.status === 'loaded' && (
        <>
          {asyncTransactions.data.length === 0 && <p>Nenhuma transação encontrada</p>}
          {asyncTransactions.data.length > 0 && (
            <table className={styles['table']}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Tags</th>
                  <th className={styles['currency']}>Valores em R$</th>
                </tr>
              </thead>
              <tbody>
                {asyncTransactions.data.map(transaction => {
                  return (
                    <tr key={transaction.id} className={styles['transaction']}>
                      <td className={styles['date']}>{transaction.date}</td>
                      <td className={`${styles['description']}`}>{transaction.description}</td>
                      <td className={styles['tags']}>
                        {transaction.tags.map(tag => {
                          return (
                            <div key={tag.id} className={styles['tag']}>{tag.name}</div>
                          );
                        })}
                      </td>
                      <td className={`${styles['amount']}`}>{transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}</td>
                      <td className={styles['edit']}>
                        <EditNoteOutlinedIcon
                          fontSize='small'
                          className={styles['icon']}
                          onClick={() => console.log('edit')}
                        />
                      </td>
                      <td className={styles['delete']}>
                        <DeleteOutlineOutlinedIcon
                          className={styles['icon']}
                          fontSize='small'
                          onClick={() => console.log('delete')}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionTable;
