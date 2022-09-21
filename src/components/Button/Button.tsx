import React from 'react';
import styles from './Button.module.css';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface IProps extends ButtonProps {}

const Button: React.FC<IProps> = (props) => {
  return <button {...props} className={`${styles.btn} ${props.className || ''}`} />;
};

export default Button;
