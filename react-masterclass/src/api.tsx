const BASE_URL = `https://api.coinpaprika.com/v1`

export function fetchCoins(){
    return fetch(`${BASE_URL}/tickers?quotes=KRW`).then(response=>response.json());
}
export function fetchCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}?quotes=KRW`).then(response=>response.json());
}
export function fetchPriceInfo(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}?quotes=KRW`).then(response=>response.json());
}
