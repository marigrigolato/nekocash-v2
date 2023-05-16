import React from 'react';
import styles from './InvoiceMonthSummary.module.css';

const InvoiceMonthSummary = ({ value, onChange }) => {

  function formatDate(date) {
    const [year, month] = date.split('-');
    const d = new Date(year, month - 1); // Mês de 0 a 11
    const m = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(d).replace('.', '');
    const y = d.getFullYear().toString().slice(-2);
    return m + '/' + y;
  }

  function formatCurrency(amount) {
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  const renderedItems = value && value.map(item =>
    <div
      key={item.year_month}
      className={styles['items-contents']}
      onClick={() => 
        fetch(`/invoice?year_month=${item.year_month}`)
          .then(res => res.json())
          .then(data => {
            onChange({ status: 'loaded', data: data, year_month: item.year_month });
          })
        }
    >
      <h3>{formatDate(item.year_month)}</h3>
      <span>{formatCurrency(item.amount)}</span>
    </div>
  );

  return (
    <>
      {renderedItems}
    </>
  );
}

export default InvoiceMonthSummary;
