import styles from '../../../styles/Game.module.scss';

type GridProps = {
  children: React.ReactNode;
};
export const Grid: React.FC<GridProps> = ({ children }: GridProps) => {
  return <div className={styles.grid}>{children}</div>;
};
