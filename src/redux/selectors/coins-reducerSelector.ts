import { createSelector } from 'reselect'
import { TAppState } from '../store'

const getCoinsS = (state: TAppState) => {
  return state.coinsReducer.coins;
}

const getDiffCoinsS = (state: TAppState) => {
  return state.coinsReducer.diffCoins;
}

const getConverterS = (state: TAppState) => {
  return state.coinsReducer.converter;
}

export const getCoins = createSelector(getCoinsS, (coins) => {
  return coins
})

export const getDiffCoins = createSelector(getDiffCoinsS, (diffCoins) => {
  return diffCoins
})

export const getConverter = createSelector(getConverterS, (coins) => {
  return coins
})

