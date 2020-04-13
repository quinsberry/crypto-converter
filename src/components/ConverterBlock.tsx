import React from 'react'

import { Paper, TextField, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'

import { TCoin, TConverterCoin, TConverter } from '../types/types'

type Props = {
  classes: any
  items: Array<TCoin>
  setFirstConverterCoin: (coin: TConverterCoin) => void
  setSecondConverterCoin: (coin: TConverterCoin) => void
  converter: TConverter
}



const ConverterBlock: React.FC<Props> = ({ classes, items, setFirstConverterCoin, setSecondConverterCoin, converter }) => {

  const { firstCoin, secondCoin } = converter

  const coinsArray: Array<TConverterCoin> = items.map(coin => {
    return {
      name: coin.name,
      price: coin.price
    }
  })

  React.useEffect(() => {
    setFirstConverterCoin(matchCoins(firstCoin.name))
    setSecondConverterCoin(matchCoins(secondCoin.name))
  }, [items])

  React.useEffect(() => {
    reCountingFirstField()
  }, [firstCoin])

  React.useEffect(() => {
    reCountingSecondField()
  }, [secondCoin])

  const matchCoins = (coinName: string): TConverterCoin => {
    return coinsArray.filter(coin => coin.name === coinName)[0]
  }

  const ChangingFirstCoin = (event: React.ChangeEvent<{ value: any }>) => {
    const matchCoin = matchCoins(event.target.value)
    setFirstConverterCoin(matchCoin)
  }
  const ChangingSecondCoin = (event: React.ChangeEvent<{ value: any }>) => {
    const matchCoin = matchCoins(event.target.value)
    setSecondConverterCoin(matchCoin)
  }

  const [firstField, setFirstField] = React.useState<any>(0)
  const [secondField, setSecondField] = React.useState<any>(0)

  const reCountingFirstField = () => {
    const recounted1Field = ((secondCoin.price / firstCoin.price) * secondField).toFixed(2)
    if (firstField !== recounted1Field) {
      setFirstField(recounted1Field)
    }
  }

  const reCountingSecondField = () => {
    const recounted2Field = ((firstCoin.price / secondCoin.price) * firstField).toFixed(2)
    if (secondField !== recounted2Field) {
      setSecondField(recounted2Field)
    }
  }

  const fieldChecking = (value: any, number: number) => {
    if (number === 1) {
      setFirstField(value)
      const countedOtherValue = ((firstCoin.price / secondCoin.price) * value).toFixed(2)
      setSecondField(countedOtherValue)
    } else {
      setSecondField(value)
      const countedOtherValue = ((secondCoin.price / firstCoin.price) * value).toFixed(2)
      setFirstField(countedOtherValue)
    }
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.cryptoInputBox}>
        <FormControl className={classes.currencyInput}>
          <TextField fullWidth label="Value" value={firstField} onChange={e => fieldChecking(e.target.value, 1)} />
        </FormControl>
        <FormControl className={classes.currencyType}>
          <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            value={firstCoin ? firstCoin.name : 'BTC'}
            onChange={ChangingFirstCoin}
          >
            {coinsArray.map((coin, index) => (
              <MenuItem key={index} value={coin.name}>{coin.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.cryptoInputBox}>
        <FormControl className={classes.currencyInput}>
          <TextField fullWidth label="Value" value={secondField} onChange={e => fieldChecking(e.target.value, 2)} />
        </FormControl>
        <FormControl className={classes.currencyType}>
          <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            value={secondCoin ? secondCoin.name : 'ETH'}
            onChange={ChangingSecondCoin}
          >
            {coinsArray.map((coin, index) => (
              <MenuItem key={index} value={coin.name}>{coin.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Paper>
  )
}

export default ConverterBlock