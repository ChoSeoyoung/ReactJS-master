import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistory, fetchPriceInfo } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const CoinWrapper = styled.div`
`;

interface PriceProps {
    coinId: string;
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
function Price({coinId} : PriceProps){
    const {isLoading,data} = useQuery<PriceInterface>(["price",coinId],()=>fetchPriceInfo(coinId));
    return(
        <CoinWrapper>
            {isLoading ? "Loading...":
            <ApexChart 
                type="line"
                series={[
                    {
                        name: "prices",
                        data: [data?.quotes.KRW.percent_change_1y,data?.quotes.KRW.percent_change_30d,data?.quotes.KRW.percent_change_24h,data?.quotes.KRW.percent_change_12h,data?.quotes.KRW.percent_change_6h,data?.quotes.KRW.percent_change_1h,data?.quotes.KRW.percent_change_30m] as number[],
                    },
                ]}
                options={{
                    theme: {
                        mode:"light"
                    },
                    chart:{
                        height: 900,
                        width: 900,
                    },
                    stroke:{
                        curve: "smooth",
                        width: 4,
                    },
                    yaxis:{
                        labels:{show:false},
                    },
                    xaxis:{
                        axisBorder: {show:false},
                        axisTicks: {show:false},
                        labels: {show:false},
                    },
                    fill: {
                        type: "gradient",
                    }
                }}>
            </ApexChart>}
        </CoinWrapper>
    );
}

export default Price;

