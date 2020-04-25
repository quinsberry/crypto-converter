import { getCoins } from '../../api/api'
import { ThunkAction } from 'redux-thunk'

import { TCoin, TCoinDiff, TConverterCoin, TConverter, TAppState } from '../../types/types'


const SET_ALL_COINS = 'coins/SET_ALL_COINS'
const SET_DIFF_CURRENCIES = 'coins/SET_DIFF_CURRENCIES'
const DIFF_COINS_NULLED = 'coins/DIFF_COINS_NULLED'
const SET_FIRST_COIN = 'coins/SET_FIRST_COIN'
const SET_SECOND_COIN = 'coins/SET_SECOND_COIN'
const IS_FETCHING_TOGGLE = 'coins/IS_FETCHING_TOGGLE'

type ATSetAllCoins = {
  type: typeof SET_ALL_COINS,
  coinsArr: TCoin[] | null
}

type ATSetCoinsDiff = {
  type: typeof SET_DIFF_CURRENCIES,
  coins: Array<TCoin>
}

type ATSetFirstConverterCoin = {
  type: typeof SET_FIRST_COIN,
  coin: TConverterCoin
}

type ATSetSecondConverterCoin = {
  type: typeof SET_SECOND_COIN,
  coin: TConverterCoin
}

type ATDiffCoinsNulled = {
  type: typeof DIFF_COINS_NULLED
}

type ATIsFetching = {
  type: typeof IS_FETCHING_TOGGLE
}

type TInitioalState = {
  coins: null | TCoin[]
  diffCoins: TCoinDiff | {}
  converter: TConverter
  isFetching: boolean
}


const diffCurrencies = (arr1: Array<TCoin>, arr2: Array<TCoin>) => {
  return arr1.filter((obj, index) => {
    if (obj.price !== arr2[index].price) {
      return true
    }
    return false
  })
}


const initialState: TInitioalState = {
  coins: null,
  diffCoins: {},
  converter: {
    firstCoin: { name: 'BTC', price: 1111 },
    secondCoin: { name: 'ETH', price: 125 }
  },
  isFetching: false
}


const coinsReducer = (state = initialState, action: any): TInitioalState => {
  switch (action.type) {
    case SET_ALL_COINS:
      return {
        ...state,
        coins: action.coinsArr
      }
    case SET_DIFF_CURRENCIES:
      if (state.coins) {
        const result = diffCurrencies(action.coins, state.coins).reduce((initObj: TCoinDiff, newObj: TCoin) => {
          const oldObj: TCoin = state.coins!.find((oldObjItem: any) => oldObjItem.name === newObj.name) || newObj
          const color: string = newObj.price === oldObj.price ? '' : (newObj.price > oldObj.price ? 'green' : 'red')
          initObj[newObj.name] = color
          return initObj
        }, {})
        return {
          ...state,
          diffCoins: result
        }
      }
      return state
    case DIFF_COINS_NULLED:
      return {
        ...state,
        diffCoins: {}
      }
    case SET_FIRST_COIN:
      return {
        ...state,
        converter: {
          ...state.converter,
          firstCoin: action.coin
        }
      }
    case SET_SECOND_COIN:
      return {
        ...state,
        converter: {
          ...state.converter,
          secondCoin: action.coin
        }
      }
    case IS_FETCHING_TOGGLE:
      return {
        ...state,
        isFetching: !state.isFetching
      }
    default:
      return state
  }
}


export const setAllCoins = (coinsArr: TCoin[]): ATSetAllCoins => {
  return {
    type: SET_ALL_COINS,
    coinsArr
  }
}

export const setDiffCurrencies = (coins: Array<TCoin>): ATSetCoinsDiff => {
  return {
    type: SET_DIFF_CURRENCIES,
    coins
  }
}

export const setFirstConverterCoin = (coin: TConverterCoin): ATSetFirstConverterCoin => {
  return {
    type: SET_FIRST_COIN,
    coin
  }
}

export const setSecondConverterCoin = (coin: TConverterCoin): ATSetSecondConverterCoin => {
  return {
    type: SET_SECOND_COIN,
    coin
  }
}

export const diffCoinsNulled = (): ATDiffCoinsNulled => {
  return {
    type: DIFF_COINS_NULLED
  }
}

export const isFetching = (): ATIsFetching => {
  return {
    type: IS_FETCHING_TOGGLE,
  }
}

type TActions = ATSetAllCoins | ATSetCoinsDiff | ATSetFirstConverterCoin | ATSetSecondConverterCoin | ATDiffCoinsNulled | ATIsFetching

type TThunk = ThunkAction<Promise<void>, TAppState, unknown, TActions>

export const setAllCoinsTC = (): TThunk => {
  return async (dispatch) => {
    dispatch(isFetching())

    const res = await getCoins()
    const coins: TCoin[] = res.map((coin: any) => {
      const obj: TCoin = {
        name: coin.CoinInfo.Name,
        fullName: coin.CoinInfo.FullName,
        imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
        price: Number(coin.RAW.USD.PRICE.toFixed(3)),
        volume24hour: parseInt(coin.RAW.USD.VOLUME24HOUR)
      }
      return obj
    })

    dispatch(isFetching())
    dispatch(setAllCoins(coins))

  }
}

export const setCoinsDiffTC = (): TThunk => {
  return async (dispatch) => {
    // dispatch(isFetching())

    const res = await getCoins()
    const coins: TCoin[] = res.map((coin: any) => {
      const obj: TCoin = {
        name: coin.CoinInfo.Name,
        fullName: coin.CoinInfo.FullName,
        imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
        price: Number(coin.RAW.USD.PRICE.toFixed(3)),
        volume24hour: parseInt(coin.RAW.USD.VOLUME24HOUR)
      }
      return obj
    })


    dispatch(setDiffCurrencies(coins))
    dispatch(setAllCoins(coins))
    setTimeout(() => {
      dispatch(diffCoinsNulled())
    }, 10 * 1000);
    // dispatch(isFetching())

  }
}

export default coinsReducer