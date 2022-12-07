import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../theme";
import Header from "../components/Header";

const Container = styled.div``;
const Loader = styled.span`
    color: ${(props)=>props.theme.textColor};
    text-align: center;
    display: block;
`;
const Img = styled.img`
    width: 30px;
    height: 30px;
`;
const Overview = styled.div`
    background-color: ${(props)=>props.theme.primaryColor};
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    padding: 0px 80px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const OverviewTitle = styled.span`
    font-weight: 600;
    padding-top: 20px;
`
const OverviewContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 60px;
    text-align: center;
`
const Description = styled.p`
`;

interface RouterParams {
    coinId: string;
}
interface RouteState {
    name: string;
}
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface PriceInterface {
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

function Coin(){
    const [loading, setLoading] = useState(true);
    const {coinId}  = useParams<RouterParams>();
    const [info,setInfo] = useState<InfoData>();
    const [priceInfo,setPriceInfo] = useState<PriceInterface>();
    const {
        state
    } = useLocation<RouteState>();
    useEffect(()=>{
        (async()=>{
            const infoData = await(
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await(
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}?quotes=KRW`)
            ).json();

            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    },[coinId]);
    return (<Container>
        <Header />
        {loading ? (<Loader>Loading...</Loader>):(
            <>
            <Overview>
                <OverviewItem>
                    <OverviewTitle>Logo</OverviewTitle>
                    <OverviewContent>
                        <Img src={info?.logo} />
                    </OverviewContent>
                </OverviewItem>
                <hr />
                <OverviewItem className="line">
                    <OverviewTitle>Symbol</OverviewTitle>
                    <OverviewContent>
                        {info?.symbol}
                    </OverviewContent>
                </OverviewItem>
                <hr />
                <OverviewItem>
                    <OverviewTitle>Rank</OverviewTitle>
                    <OverviewContent>
                        {info?.rank}
                    </OverviewContent>
                </OverviewItem>
                <hr />
                <OverviewItem>
                    <OverviewTitle>가격</OverviewTitle>
                    <OverviewContent>
                        ₩{priceInfo?.quotes.KRW.price.toFixed(2)}
                    </OverviewContent>
                </OverviewItem>
                <hr />
                <OverviewItem>
                    <OverviewTitle>총 시가(단위: 조)</OverviewTitle>
                    <OverviewContent>
                        ₩{(Number(priceInfo?.quotes.KRW.market_cap)/1000000000000).toFixed(2)}
                    </OverviewContent>
                </OverviewItem>
            </Overview>
            <Description>
                {info?.description}
            </Description>
            </>
        )}
    </Container>);
}

export default Coin;
