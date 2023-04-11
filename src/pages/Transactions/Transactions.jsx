import styles from './Transactions.module.css';

const Transactions = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.items}>
          <div className={styles.card}>
            <h3>Jan</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Fev</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Mar</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Abr</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Mai</h3>
            <span>R$10.9987,25</span>
          </div>
          <div className={styles.card}>
            <h3>Jun</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Jul</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Ago</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Set</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Out</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Nov</h3>
            <span>R$9.5987,00</span>
          </div>
          <div className={styles.card}>
            <h3>Dez</h3>
            <span>R$9.5987,00</span>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.form}>
            <div>R$0,00</div>
            <input type='text' placeholder='Valor' />
            <input type='text' placeholder='Tags' />
            <input type='text' placeholder='Descrição'/>
            <input type='date' placeholder='Data'/>
            <fieldset>
              <span>Exibir transações:</span>
              <div>
                <input type="checkbox" id="yes" name="yes" />
                <label for="yes">Todas, exceto não planejadas</label>
              </div>
              <div>
                <input type="checkbox" id="no" name="no" />
                <label for="no">Todas, exceto planejadas</label>
              </div>
            </fieldset>
            <button>Filtrar</button>
          </div>
          <div className={styles.table}>
            <div>
              <span className={styles.currency}>Valores em R$</span>
            </div>
            <div className={styles}>
              <div className={styles.transaction}>
                <div className={styles.date}>03 ABR</div>
                <div className={styles.description}>Refeição</div>
                <div className={styles.tags}>
                  <div className={styles.tag}>ifood</div>
                </div>
                <div className={styles.amount}>30,00</div>
              </div>
              <div className={styles.transaction}>
                <div className={styles.date}>10 ABR</div>
                <div className={styles.descriptionInvalid}>Remédios</div>
                <div className={styles.tags}>
                  <div className={styles.tag}>saúde</div>
                </div>
                <div className={styles.amountInvalid}>50,00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transactions;
