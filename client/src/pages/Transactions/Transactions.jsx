import React, { useState, useEffect, useCallback } from 'react';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styles from './Transactions.module.css';
import Select from 'react-select'
import InvoiceMonthSummary from '../../components/InvoiceMonthSummary/InvoiceMonthSummary';
import TextField from '../../components/TextField/TextField';
import YesOrNoRadioButton from '../../components/RadioButton/YesOrNoRadioButton';


const INITIAL_FORM_VALUES = {
  date: '',
  description: '',
  tags: [],
  value: '',
  isPlanned: true
};


const Transactions = () => {

  const [ filter, setFilter ] = useState(INITIAL_FORM_VALUES);
  const [ appliedFilter, setAppliedFilter ] = useState(null);
  const [ asyncTransactions, setAsyncTransactions ] = useState(null);
  const [ invoices, setInvoices ] = useState(null)

  const amount = asyncTransactions && asyncTransactions.data.reduce((total, transaction) => {
    return total + transaction.value;
  }, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const tags = asyncTransactions && asyncTransactions.data.reduce((allTags, transaction) => {
    transaction.tags.forEach(tag => {
      const tagExists = allTags.some(existingTag => existingTag.id === tag.id);
      if (!tagExists) {
        allTags.push(tag);
      }
    });
    return allTags;
  }, []);

  const fetchInvoiceTransactions = useCallback(invoiceMonthYear => {
    fetch(`/transactions?year_month=${invoiceMonthYear}`)
      .then(response => response.json())
      .then(data => {
        setAsyncTransactions({ status: 'loaded', data: data, year_month: invoiceMonthYear });
      });
  }, []);

  useEffect(() => {
    fetch('/invoices')
      .then(response => response.json())
      .then(data => {
        setInvoices(data);
        if (data.length > 0) {
          const lastInvoice = data[data.length - 1];
          fetchInvoiceTransactions(lastInvoice.year_month);
        }
      });
  }, [ fetchInvoiceTransactions ] );

  useEffect(() => {
    if(appliedFilter ===  null) {
      setAsyncTransactions(null);
      return;
    }
    // setAsyncTransactions({ status: 'loading' });
    const tagIds = appliedFilter.tags.map(tag => tag.id);
    fetch(`/transactions?year_month=${asyncTransactions.year_month}&date=${appliedFilter.date}&description=${appliedFilter.description}&tags=${tagIds}&value=${appliedFilter.value}&isPlanned=${appliedFilter.isPlanned}`)
      .then(response => response.json())
      .then(data => {
        setAsyncTransactions({ status: 'loaded', data: data, year_month: asyncTransactions.year_month });
      });
  }, [ appliedFilter ] );

  return (
    <section className={styles['section']}>
      <InvoiceMonthSummary
        value={invoices}
        onMonthSelected={fetchInvoiceTransactions}
      />
      <div className={styles['main']}>
        <div className={styles['content']}>
          <div className={styles['form']}>
            <div className={styles.value}>{amount}</div>
            <form className={styles.fieldset}
              onSubmit={(e) => {
                e.preventDefault();
                setAppliedFilter(filter);
              }}
            >
              <TextField
                type='text'
                placeholder='Valor'
                value={filter.value}
                onChange={value => { setFilter({ ...filter, value }); }}
              />
              <Select
                isMulti
                placeholder='Tags'
                options={tags}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                className={styles['select']}
                // value={filter.tags.map(x => ({ id: x.id, name: x.name }))}
                // value={filter.tags.map(x => ({ tag: x }))}
                onChange={options => {
                  const selectedTags = options ? options.map(option => ({ id: option.id, name: option.name })) : [];
                  setFilter({ ...filter, tags: selectedTags });
                }}
              />
              <TextField
                type='text'
                placeholder='Descrição'
                value={filter.description}
                onChange={description => { setFilter({ ...filter, description }); }}
              />
              <TextField
                type='date'
                placeholder='Data'
                value={filter.date}
                onChange={date => { setFilter({ ...filter, date }); }}
              />
              <YesOrNoRadioButton
                label='Exibir transações:'
                value={filter.isPlanned}
                onChange={isPlanned => { setFilter({ ...filter, isPlanned }); }}
              />
              <button className={styles['button']}>Filtrar</button>
            </form>
          </div>
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
