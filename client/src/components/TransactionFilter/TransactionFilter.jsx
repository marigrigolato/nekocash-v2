import React, { useState } from 'react';
import Select from 'react-select'
import TextField from '../../components/TextField/TextField';
import YesOrNoRadioButton from '../../components/RadioButton/YesOrNoRadioButton';
import styles from './TransactionFilter.module.css';

const TransactionFilter = ({ appliedFilter, asyncTransactions, onAppliedFilterChange }) => {

  const [ filter, setFilter ] = useState(appliedFilter);

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

  return (
    <div className={styles['form']}>
      <div className={styles.value}>{amount}</div>
      <form className={styles.fieldset}
        onSubmit={(e) => {
          e.preventDefault();
          onAppliedFilterChange(filter);
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
  );
};

export default TransactionFilter;
