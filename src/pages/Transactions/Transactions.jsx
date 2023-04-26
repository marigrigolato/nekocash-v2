import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styles from './Transactions.module.css';
import Select from 'react-select'
import TextField from '../../components/TextField/TextField';
import YesOrNoRadioButton from '../../components/RadioButton/YesOrNoRadioButton';

const transactions = [
  {
    id: 1,
    date: '2023-04-03',
    description: 'Almoço',
    tags: ['Casa', 'Refeição'],
    value: 30,
    isPlanned: true
  },
  {
    id: 2,
    date: '2023-04-07',
    description: 'Remédios',
    tags: ['Saúde', 'Vitamina D'],
    value: 70,
    isPlanned: true
  },
  {
    id: 3,
    date: '2023-04-08',
    description: 'Ração Cobasi',
    tags: ['Dogs', 'Ração'],
    value: 320,
    isPlanned: true
  },
  {
    id: 4,
    date: '2023-04-09',
    description: 'Abastecimento',
    tags: ['Abastecimento', 'Ida Pilar'],
    value: 214,
    isPlanned: true
  },
  {
    id: 5,
    date: '2023-04-10',
    description: 'Mercado',
    tags: ['Casa', 'Despensa'],
    value: 500,
    isPlanned: true
  },
  {
    id: 6,
    date: '2023-04-13',
    description: 'Almoço',
    tags: ['Casa', 'Refeição'],
    value: 35,
    isPlanned: true
  },
  {
    id: 7,
    date: '2023-04-15',
    description: 'Remédios dengue',
    tags: ['Saúde', 'Outros'],
    value: 65,
    isPlanned: false
  }
]

const INITIAL_FORM_VALUES = {
  date: '',
  description: '',
  tags: [],
  value: '',
  isPlanned: true
}

const tags = transactions.reduce((allTags, transaction) => {
  transaction.tags.forEach(tag => {
    if (!allTags.includes(tag)) {
      allTags.push(tag);
    }
  });
  return allTags;
}, []);

const Transactions = () => {

  const [ filter, setFilter ] = useState(INITIAL_FORM_VALUES);
  const [ appliedFilter, setAppliedFilter ] = useState(null);
  const [ asyncTransactions, setAsyncTransactions ] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    container.scrollLeft = container.scrollWidth - container.clientWidth;
  }, []);

  useEffect(() => {
    if(appliedFilter ===  null) {
      setAsyncTransactions(null);
      return;
    }
    setAsyncTransactions({ status: 'loading' });
    setTimeout(() => {
      setAsyncTransactions({
        status: 'loaded',
        data: transactions
          .filter(transaction => {
            let matches = true;
            if(appliedFilter.date) {
              matches = matches && transaction.date === appliedFilter.date;
            }
            if (appliedFilter.description) {
              matches = matches && transaction.description.toLocaleLowerCase().includes(appliedFilter.description.toLocaleLowerCase());
            }
            if (appliedFilter.tags.length > 0) {
              console.log(transaction.tags.every(tag => appliedFilter.tags.includes(tag)))
              matches = matches && transaction.tags.every(tag => appliedFilter.tags.includes(tag));
            }
            if (appliedFilter.value) {
              matches = matches && transaction.value.toString() === appliedFilter.value;
            }
            if (appliedFilter.isPlanned || !appliedFilter.isPlanned) {
              matches = matches && transaction.isPlanned === appliedFilter.isPlanned;
            }
            return matches;
          })
      });
    }, 1000);
  }, [appliedFilter] );

  return (
    <section className={styles['section']}>
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
            <div className={styles['items-contents']}>
              <h3>Jan/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Fev/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Mar/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Abr/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Mai/22</h3>
              <span>R$10.9987,25</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Jun/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Jul/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Ago/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Set/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Out/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Nov/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Dez/22</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Jan</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Fev</h3>
              <span>R$9.5987,00</span>
            </div>
            <div className={styles['items-contents']}>
              <h3>Mar</h3>
              <span>R$9.5987,00</span>
            </div>
            <div
              className={styles['items-contents']}
              onClick={() => {
                console.log('oi')
              }}
            >
              <h3>Abr</h3>
              <span>R$9.5987,00</span>
            </div>
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
      <div className={styles['main']}>
        <div className={styles['content']}>
          <div className={styles['form']}>
            <div className={styles.value}>R$9.587,00</div>
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
                options={tags.map(x => ({ tag: x }))}
                getOptionLabel={option => option.tag}
                getOptionValue={option => option.tag}
                className={styles['select']}
                value={filter.tags.map(x => ({ tag: x }))}
                onChange={options => {
                  const selectedTags = options ? options.map(option => option.tag) : [];
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
              {asyncTransactions && asyncTransactions.status === 'loading' && <p>Carregando...</p>}
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
                          const type = transaction.isPlanned ? '' : '-invalid';
                          return (
                            <tr key={transaction.id} className={styles['transaction']}>
                              <td className={styles['date']}>{transaction.date}</td>
                              <td className={`${styles['description' + type]}`}>{transaction.description}</td>
                              <td className={styles['tags']}>
                                {transaction.tags.map(tag => {
                                  return (
                                    <div key={tag} className={styles['tag']}>{tag}</div>
                                  );
                                })}
                              </td>
                              <td className={`${styles['amount' + type]}`}>{transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
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
