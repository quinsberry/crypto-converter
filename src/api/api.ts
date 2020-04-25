import axios from 'axios'

import { TFetchedCoin } from '../types/types'


type TGetCoins = {
  Data: Array<TFetchedCoin>
  HasWarning: boolean
  Message: string
  RateLimit: {}
  SponsoredData: []
  Type: number
}

const API_PATH = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'

export const getCoins = () => {
  return (
    axios
      .get<TGetCoins>(API_PATH)
      .then(res => res.data.Data)
  )
}