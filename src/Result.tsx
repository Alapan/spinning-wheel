import styles from './Result.module.css';
interface ResultProps {
  displayText?: string;
};

export const Result = ({ displayText }: ResultProps) => {
  return (
    <h2 className={styles.resultContainer}>{displayText}</h2>
  );
}