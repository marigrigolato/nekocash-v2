import React from 'react';
import styles from './TextField.module.css'

const TextField = ({ type, placeholder, value, onChange }) => {
  return (
    <div className={styles['root']}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

export default TextField;
