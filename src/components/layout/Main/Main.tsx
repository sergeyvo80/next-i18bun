import styles from './Main.module.scss';

interface Props {
  children?: React.ReactNode;
}

const Main = ({ children }: Props): React.ReactElement => (
  <div className={styles.Main}>
    {children}
  </div>
);

export default Main;
