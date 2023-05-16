import React, { useMemo } from 'react';
import styles from './YesOrNoRadioButton.module.css';

let _id = 0;

const YesOrNoRadioButton = ({ label, value, onChange }) => {

  const id = useMemo(() => _id++, []);

  return (
    <div className={styles['root']}>
      <span>{label}</span>
      <div>
        <input
          type="radio"
          name={`yes-no-radio-${id}`}
          id={`yes-no-radio-${id}-yes`}
          checked={value === true}
          onChange={e => {
            if (e.target.checked) {
              onChange(true);
            }
          }}
        />
        <label htmlFor={`yes-no-radio-${id}-yes`}>Planejadas</label>
      </div>
      <div>
        <input
          type="radio"
          name={`yes-no-radio-${id}`}
          id={`yes-no-radio-${id}-no`}
          checked={value === false}
          onChange={e => {
            if (e.target.checked) {
              onChange(false);
            }
          }}
        />
        <label htmlFor={`yes-no-radio-${id}-no`}>Não planejadas</label>
      </div>
    </div>
  );
}

export default YesOrNoRadioButton;
