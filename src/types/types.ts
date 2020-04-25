import { TRootReducer } from '../redux/store'

export type TAppState = ReturnType<TRootReducer>

export type TFetchedCoin = {
  CoinInfo: {
    Name: string
    FullName: string
    ImageUrl: string
  }
  DISPLAY: any
  RAW: {
    USD: {
      PRICE: number
      VOLUME24HOUR: number
    }
  }
}

export type TCoin = {
  name: string;
  fullName: string;
  imageUrl: string;
  price: number;
  volume24hour: number;
}

export type TCoinDiff = { [key: string]: string }

export type TConverterCoin = {
  name: string
  price: number
}

export type TConverter = {
  firstCoin: TConverterCoin
  secondCoin: TConverterCoin
}