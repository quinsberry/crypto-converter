import React from 'react'
import { connect } from 'react-redux'

import CryptoTableBlock from './components/CryptoTableBlock'
import ConverterBlock from './components/ConverterBlock'
import { setAllCoinsTC, setCoinsDiffTC, setFirstConverterCoin, setSecondConverterCoin } from './redux/reducers/coins-reducer'
import { getCoins, getDiffCoins, getConverter } from './redux/selectors/coins-reducerSelector'

import { Container, Grid } from '@material-ui/core'
import useStyles from './styles'

import { TCoin, TCoinDiff, TConverter, TConverterCoin, TAppState } from './types/types'


type Props = TMapState & TMapDispatch

type TMapState = {
  coins: Array<TCoin> | null
  diffCoins: TCoinDiff
  converter: TConverter
}

type TMapDispatch = {
  setAllCoinsTC: () => void
  setCoinsDiffTC: () => void
  setFirstConverterCoin: (coin: TConverterCoin) => void
  setSecondConverterCoin: (coin: TConverterCoin) => void
}



const App: React.FC<Props> = ({ coins, diffCoins, setCoinsDiffTC, setAllCoinsTC, setFirstConverterCoin, setSecondConverterCoin, converter }) => {

  const classes = useStyles()

  React.useEffect(() => {

    setAllCoinsTC()

    setInterval(() => {
      setCoinsDiffTC()
    }, 60 * 1000)

  }, [])



  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {coins && (
            <CryptoTableBlock setFirstConverterCoin={setFirstConverterCoin} setSecondConverterCoin={setSecondConverterCoin} classes={classes} diffCoins={diffCoins} items={coins} />
          )}
        </Grid>
        <Grid item xs={4}>
          {coins && (
            <ConverterBlock converter={converter} setFirstConverterCoin={setFirstConverterCoin} setSecondConverterCoin={setSecondConverterCoin} classes={classes} items={coins} />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}


const mapStateToProps = (state: TAppState): TMapState => {
  return {
    coins: getCoins(state),
    diffCoins: getDiffCoins(state),
    converter: getConverter(state)
  }
}

export default connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
  setAllCoinsTC,
  setCoinsDiffTC,
  setFirstConverterCoin,
  setSecondConverterCoin
})(App)
