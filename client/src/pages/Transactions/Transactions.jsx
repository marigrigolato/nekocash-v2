import React, { useState, useEffect, useCallback } from 'react';
import InvoiceMonthSummary from './InvoiceMonthSummary/InvoiceMonthSummary';
import TransactionFilter from './TransactionFilter/TransactionFilter';
import TransactionTable from './TransactionTable/TransactionTable';
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
  const [ selectedInvoiceMonth, setSelectedInvoiceMonth ] = useState(null);
  const [ invoices, setInvoices ] = useState(null);
  const [ asyncTransactions, setAsyncTransactions ] = useState(null);

  useEffect(() => {
    fetch('/invoices')
      .then(response => response.json())
      .then(setInvoices);
  }, []);

  const fetchInvoiceTransactions = useCallback(() => {
    const tagIds = appliedFilter.tags.map(tag => tag.id);
    fetch(`/transactions?year_month=${selectedInvoiceMonth}&date=${appliedFilter.date}&description=${appliedFilter.description}&tags=${tagIds}&value=${appliedFilter.value}&isPlanned=${appliedFilter.isPlanned}`)
      .then(response => response.json())
      .then(data => {
        setAsyncTransactions({ status: 'loaded', data: data });
      });
  }, [ appliedFilter, selectedInvoiceMonth ]);

  useEffect(() => {
    if (invoices !== null && invoices.length > 0 && selectedInvoiceMonth === null) {
      const lastInvoice = invoices[invoices.length - 1];
      setSelectedInvoiceMonth(lastInvoice.year_month);
    }
  }, [ invoices, selectedInvoiceMonth ]);

  useEffect(() => {
    if (selectedInvoiceMonth !== null) {
      fetchInvoiceTransactions();
    }
  }, [ fetchInvoiceTransactions, selectedInvoiceMonth ]);

  return (
    <section className={styles['section']}>
      <InvoiceMonthSummary
        value={invoices}
        onMonthSelected={setSelectedInvoiceMonth}
      />
      <div className={styles['main']}>
        <div className={styles['content']}>
          <TransactionFilter
            appliedFilter={appliedFilter}
            asyncTransactions={asyncTransactions}
            onAppliedFilterChange={setAppliedFilter}
          />
          <TransactionTable
            asyncTransactions={asyncTransactions}
          />
        </div>
      </div>
    </section>
  );
}

export default Transactions;
