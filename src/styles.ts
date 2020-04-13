import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(10)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cryptoInputBox: {
    marginBottom: '10px'
  },
  currencyInput: {
    minWidth: 'calc(75% - 20px)',
    marginRight: 20
  },
  currencyType: {
    minWidth: '25%',
  },
  table: {
    minWidth: 650,
  },
  currencyIcon: {
    width: 20,
    height: 20,
    borderRadius: 30
  },
  redColumn: {
    backgroundColor: '#ffdada'
  },
  greenColumn: {
    backgroundColor: '#d8ffc4'
  },
  rowCurrency: {
    cursor: 'pointer'
  }
}));

export default useStyles;