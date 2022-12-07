import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.div``;
const Loader = styled.span`
    color: ${(props)=>props.theme.textColor};
    text-align: center;
    display: block;
`;
const BodyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Table = styled.table`
    border: 1px solid black;
    font-size: 14px;
    width: 100%;
    th {
        border: 1px solid black;
        text-align: right;
    }
    td{
        border: 1px solid black;
    }
    .center {
        text-align: center;
    }
    .left { 
        text-align: left;
    }
    .right {
        text-align: right;
    }
    .red {
        color: ${(props)=>props.theme.dangerColor};
    }
    .blue{
        color: ${(props)=>props.theme.successColor};
    }
    a{
        display: flex;
        align-items: center;
        font-weight: 600;
        &:link{
            color: ${(props)=>props.theme.successColor};
        }
        &:visited{
            color: ${(props)=>props.theme.successColor};
        }
        &:hover{
            font-size: 16px;
        }
    }
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: ${(props)=>props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a{
    }
    &: hover{
        a{
            color: ${(props)=>props.theme.primaryColor}
        }
    }
`;
const Img = styled.img`
    width: 16px;
    height: 16px;
    margin-left: 5px;
    margin-right: 10px;
`;
// const coins= [
//     //https://api.coinpaprika.com/v1/coins
//     {"id":"btc-bitcoin","name":"Bitcoin","symbol":"BTC","rank":1,"is_new":false,"is_active":true,"type":"coin"},
//     {"id":"eth-ethereum","name":"Ethereum","symbol":"ETH","rank":2,"is_new":false,"is_active":true,"type":"coin"},
//     {"id":"usdt-tether","name":"Tether","symbol":"USDT","rank":3,"is_new":false,"is_active":true,"type":"token"}
// ];

interface ICoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        KRW: {
            "price":number; 
            "volume_24h":number;
            "volume_24h_change_24h":number; 
            "market_cap":number; 
            "market_cap_change_24h":number; 
            "percent_change_15m":number; 
            "percent_change_30m":number; 
            "percent_change_1h":number; 
            "percent_change_6h":number; 
            "percent_change_12h":number;
            "percent_change_24h":number;
            "percent_change_7d":number; 
            "percent_change_30d":number;
            "percent_change_1y":number; 
            "ath_price":number; 
            "ath_date": string;
            "percent_from_price_ath":number; 
        }
    }
}

function Coins(){
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState<ICoinInterface[]>([]);
    const getCoins = async() => {
        const json = await(
            await(fetch('https://api.coinpaprika.com/v1/tickers?quotes=KRW'))
        ).json();
        setCoins(json.slice(0,100));
    }
    useEffect(()=>{
        getCoins();
        setLoading(false);
    },[]);
    

    return <Container>
        <Header />
        <BodyWrapper>
        {loading ? <Loader>Loading...</Loader> :
            <>
            <Table>
                <thead>
                    <tr>
                        <th className="center">#</th>
                        <th className="left">종목</th>
                        <th>기호</th>
                        <th>가격</th>
                        <th>총 시가<br />(단위: 조)</th>
                        <th>거래량(24H)<br />(단위: 조)</th>
                        <th>변동(24H)</th>
                        <th>변동(7D)</th>
                    </tr>
                </thead>
                <tbody>
                    {coins?.map((coin)=>(
                        <tr key={coin.id}>
                            <td className="center">{coin.rank}</td>
                            <td className="left">
                              <Link
                                to={{
                                    pathname:`/${coin.id}`,
                                    state: {name: coin.name}
                                }}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                    {coin.name} &rarr;
                                </Link>
                            </td>
                            <td className="right">{coin.symbol}</td>
                            <td className="right">₩{coin.quotes.KRW.price.toFixed(2)}</td>
                            <td className="right">₩{(coin.quotes.KRW.market_cap/1000000000000).toFixed(2)}</td>
                            <td className="right">{(coin.quotes.KRW.volume_24h/1000000000000).toFixed(2)}</td>
                            {coin.quotes.KRW.percent_change_24h>0 ? 
                                <td className="right red">▼{coin.quotes.KRW.percent_change_24h}</td>
                            : (coin.quotes.KRW.percent_change_24h<0)
                            ? <td className="right blue">▲{coin.quotes.KRW.percent_change_24h}</td>
                            : <td className="right">{coin.quotes.KRW.percent_change_24h}</td>}
                            {coin.quotes.KRW.percent_change_7d>0 ? 
                                <td className="right red">▼{coin.quotes.KRW.percent_change_7d}</td>
                            : (coin.quotes.KRW.percent_change_7d<0)
                            ? <td className="right blue">▲{coin.quotes.KRW.percent_change_7d}</td>
                            : <td className="right">{coin.quotes.KRW.percent_change_7d}</td>}
                        </tr>
                    ))}
                </tbody>
            </Table>
            </>
            }
        </BodyWrapper>
    </Container>;
}

export default Coins;
