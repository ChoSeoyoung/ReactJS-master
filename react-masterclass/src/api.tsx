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
export function fetchCoinHistory(coinId:string){
    //const endDate = Math.floor(Date.now()/1000);
    //const startDate = endDate-60*60_24*6; //일주일전
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then(response=>response.json());
}