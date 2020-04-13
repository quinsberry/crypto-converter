import * as axios from 'axios'


const API_PATH = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';

export const getCoins = () => {
  return (
    axios
      .get(API_PATH)
      .then(res => res.data.Data)
  )
}