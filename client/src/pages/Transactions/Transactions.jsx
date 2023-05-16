import React, { useState, useEffect, useCallback } from 'react';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InvoiceMonthSummary from '../../components/InvoiceMonthSummary/InvoiceMonthSummary';
import TransactionFilter from '../../components/TransactionFilter/TransactionFilter';
import styles from './Transactions.module.css';

const INITIAL_APPLIED_FILTER = {
  date: '',
  description: '',
  tags: [],
  value: '',
  isPlanned: true
};

const Transactions = () => {

  const [ appliedFilter, setAppliedFilter ] = useState(INITIAL_APPLIED_FILTER);
  const [ invoices, setInvoices ] = useState(null);
  const [ asyncTransactions, setAsyncTransactions ] = useState(null);

  useEffect(() => {
    fetch('/invoices')
      .then(response => response.json())
      .then(setInvoices);
  }, []);

  const fetchInvoiceTransactions = useCallback(invoiceMonthYear => {
    const tagIds = appliedFilter.tags.map(tag => tag.id);
    fetch(`/transactions?year_month=${invoiceMonthYear}&date=${appliedFilter.date}&description=${appliedFilter.description}&tags=${tagIds}&value=${appliedFilter.value}&isPlanned=${appliedFilter.isPlanned}`)
      .then(response => response.json())
      .then(data => {
        setAsyncTransactions({ status: 'loaded', data: data, year_month: invoiceMonthYear });
      });
  }, [ appliedFilter ]);

  useEffect(() => {
    if (invoices === null) {
      setAsyncTransactions(null);
      return;
    }
    if (invoices.length > 0) {
      const lastInvoice = invoices[invoices.length - 1];
      fetchInvoiceTransactions(lastInvoice.year_month);
    }
  }, [ invoices, fetchInvoiceTransactions ]);

  return (
    <section className={styles['section']}>
      <InvoiceMonthSummary
        value={invoices}
        onMonthSelected={fetchInvoiceTransactions}
      />
      <div className={styles['main']}>
        <div className={styles['content']}>
          <TransactionFilter
            appliedFilter={appliedFilter}
            asyncTransactions={asyncTransactions}
            onAppliedFilterChange={setAppliedFilter}
          />
          <div className={styles['transactions']}>
          <>
            {/* {asyncTransactions && asyncTransactions.status === 'loading' && <p>Carregando...</p>} */}
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
                        // const type = transaction.isPlanned ? '' : '-invalid';
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
          </>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transactions;
