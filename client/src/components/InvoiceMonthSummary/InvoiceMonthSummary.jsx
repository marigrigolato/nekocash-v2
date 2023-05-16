import React, { useEffect, useRef } from 'react';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import styles from './InvoiceMonthSummary.module.css';

const InvoiceMonthSummary = ({ value, onMonthSelected }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    container.scrollLeft = container.scrollWidth - container.clientWidth;
  }, [ value ] );

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
      onClick={() => onMonthSelected(item.year_month)}
    >
      <h3>{formatDate(item.year_month)}</h3>
      <span>{formatCurrency(item.amount)}</span>
    </div>
  );

  return (
    <div className={styles['navbar-months']}>
      <button
        className={styles['arrow-button']}
        onClick={() => {
          scrollRef.current.scrollLeft -= 200;
        }}
      >
        <KeyboardArrowLeftOutlinedIcon />
      </button>
      <div
        className={styles['container']}
        ref={scrollRef}
      >
        <div className={styles['contents']}>
          {renderedItems}
        </div>
      </div>
      <button
        className={`${styles['arrow-button']} ${styles['bt-next']}`}
        onClick={() => {
          scrollRef.current.scrollLeft += 200;
        }}
      >
        <KeyboardArrowRightOutlinedIcon />
      </button>
    </div>
  );
}

export default InvoiceMonthSummary;
