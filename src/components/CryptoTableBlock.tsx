import React from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

import { TCoin, TCoinDiff, TConverterCoin } from '../types/types'

type Props = {
  items: Array<TCoin>
  diffCoins: TCoinDiff
  classes: any
  setFirstConverterCoin: (coin: TConverterCoin) => void
  setSecondConverterCoin: (coin: TConverterCoin) => void
}



const CryptoTableBlock: React.FC<Props> = ({ classes, items, diffCoins, setFirstConverterCoin, setSecondConverterCoin }) => {


  const onClickRow = (coin: TCoin) => {
    const obj = {
      name: coin.name,
      price: coin.price
    }
    if (checker) {
      setChecker(false)
      return setFirstConverterCoin(obj)
    } else {
      setChecker(true)
      return setSecondConverterCoin(obj)
    }
  }


  const [checker, setChecker] = React.useState(true)
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Full name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Volume 24 hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items && items.map((coin: TCoin) => (
            // @ts-ignore
            <TableRow
              onClick={() => onClickRow(coin)} className={classes.rowCurrency} hover key={coin.name}>
              <TableCell><img className={classes.currencyIcon} src={coin.imageUrl} alt={`${coin.name} icon`} /></TableCell>
              <TableCell align="left">{coin.name}</TableCell>
              <TableCell align="left">{coin.fullName}</TableCell>
              <TableCell className={diffCoins[coin.name] && classes[`${diffCoins[coin.name]}Column`]} align="left">${coin.price}</TableCell>
              <TableCell align="left">${coin.volume24hour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CryptoTableBlock