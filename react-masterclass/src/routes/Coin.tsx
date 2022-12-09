import { useEffect, useState } from "react";
import { useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { BrowserRouter, Routes, Route, Link, RouteMatch } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchPriceInfo } from "../api";

const Container = styled.div`
    padding: 0px 20px;
`;
const Loader = styled.span`
    color: ${(props)=>props.theme.textColor};
    text-align: center;
    display: block;
`;
const Title = styled.h2`
    color: ${(props)=>props.theme.textColor};
`;
const Img = styled.img`
    width: 24px;
    height: 24px;
    margin: 0px 10px;
`;
const OWrapper = styled.div`
    display: flex;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    @media all and (min-width: 1024px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
    }
`;
const IWrapper = styled.div`
    display: flex;
    flex-direction: column;
    .down{
        position: relative;
        top: 25px;
    }
`;
const Overview = styled.div`
    background-color: ${(props)=>props.theme.primaryColor};
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    justify-content: space-evenly;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 80vw;
    }
    @media all and (min-width: 1024px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        width: 30vw;
    }
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    padding: 15px 5px;
`;
const OverviewTitle = styled.div`
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50px;
    padding-top: 5px;
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
    background-color: ${(props)=>props.theme.subBgColor};
    border-radius: 10px;
    padding: 20px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 80vw;
    }
    @media all and (min-width: 1024px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        width: 30vw;
}
`;
const Tabs = styled.div`
    background-color: ${(props)=>props.theme.primaryColor};
    border: 0px;
    font-weight: 600;
    border-radius: 10px 10px 0px 0px; 
    margin: 0px 5px;
    display: flex;
    flex-direction: row;
    jusitfy-content: center;
    width: 150px;
    height: 28px;
`;
const Tab = styled.div<{ isActive:boolean }>`
    padding: 5px 15px;
    color: ${(props)=>props.isActive ? props.theme.secondaryColor: props.theme.textColor}
`;
const SubPage = styled.div`
    background-color: ${(props)=>props.theme.subBgColor};
    border-radius: 10px;
    margin-bottom: 15px;
    height: 450px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 80vw;
    }
    @media all and (min-width: 1024px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        width: 60vw;
    }
`;

interface RouteParams {
    coinId: string;
}
interface RouteState {
    state:{
        name: string;
    }
}
interface InfoInterface {
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
    const {coinId} = useParams();
    const {isLoading:infoLoading, data:infoData} = useQuery<InfoInterface>(["info",coinId], ()=>fetchCoinInfo(coinId));
    const {isLoading:priceLoading, data:priceData} = useQuery<PriceInterface>(["price",coinId], ()=>fetchPriceInfo(coinId));
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const loading = infoLoading || priceLoading;
    const {state} = useLocation() as RouteState;
    // const [info,setInfo] = useState<InfoInterface>();
    // const [priceInfo,setPriceInfo] = useState<PriceInterface>();
    // useEffect(()=>{
    //     (async()=>{
    //         const infoData = await(
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await(
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}?quotes=KRW`)
    //         ).json();

    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // },[coinId]);
    return (<Container>
        <Title>{state?.name ? state.name : loading ? "Loading..." : <><Img src={infoData?.logo} />{infoData?.name} ({infoData?.symbol})</> }</Title>
        {loading ? (<Loader>Loading...</Loader>):(
            <OWrapper>
                <IWrapper>
                <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`chart`}>Chart</Link>
                        </Tab>
                        <hr />
                        <Tab isActive={priceMatch !== null}>
                        <Link to={`price`}>Price</Link>
                        </Tab>
                    </Tabs>

                    <SubPage>
                        <Routes>
                            <Route path="price" element={<Price coinId={coinId} />} />
                            <Route path="chart" element={<Chart coinId={coinId} />} />
                        </Routes>
                    </SubPage>
                </IWrapper>
                <IWrapper>
                    <Overview className="down">            
                        <OverviewItem>
                            <OverviewTitle>Rank</OverviewTitle>
                            <OverviewContent>
                                {infoData?.rank}
                            </OverviewContent>
                        </OverviewItem>
                    
                        <OverviewItem>
                            <OverviewTitle>가격<br/>(단위: 만)</OverviewTitle>
                            <OverviewContent>
                                ₩{(Number(priceData?.quotes.KRW.price)/10000).toFixed(2)}
                            </OverviewContent>
                        </OverviewItem>
                
                        <OverviewItem>
                            <OverviewTitle>총 시가<br />(단위: 조)</OverviewTitle>
                            <OverviewContent>
                                ₩{(Number(priceData?.quotes.KRW.market_cap)/1000000000000).toFixed(2)}
                            </OverviewContent>
                        </OverviewItem>
                    </Overview>
                    <Description className="down">
                        {infoData?.description}
                    </Description>
                </IWrapper>
            </OWrapper>
        )}
 </Container>);
}

export default Coin;
