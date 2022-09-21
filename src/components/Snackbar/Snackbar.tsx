import React from 'react';

import styles from './Snackbar.module.css';

interface IProps {
  children: string;
  show: boolean;
  onClose?: () => void;
}

interface IClassName {
  [key: string]: boolean;
}

const classNames = (classNameList: IClassName) => {
  const result = Object.entries(classNameList)
    .filter(([, value]) => value)
    .map(([key]) => key);
  return result.join(' ');
};

const Snackbar: React.FC<IProps> = ({ children, show, onClose }) => {
  const [appear, setAppear] = React.useState(false);

  React.useEffect(() => {
    if (show) {
      setAppear(true);
    } 
  }, [show]);

  const onAnimationEnd = (e: React.TransitionEvent) => {
    if (appear) {
      setTimeout(() => setAppear(false), 3000);
    };

    if (!appear){
      onClose?.();
    }
  };

  return (
    <div
      className={classNames({
        [styles.snackbar]: true,
        [styles.appear]: appear,
        [styles.show]: show,
      })}
      onTransitionEnd={onAnimationEnd}
    >
      {children}
      <div className={styles.progressbar}></div>
    </div>
  );
};

export default Snackbar;
