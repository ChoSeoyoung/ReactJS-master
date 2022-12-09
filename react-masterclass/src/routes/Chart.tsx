import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistory, fetchPriceInfo } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const CoinWrapper = styled.div`
`;
interface ChartProps {
    coinId: string;
}
interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
//https://apexcharts.com/docs/series/
function Chart({coinId} : ChartProps){
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId));
    console.log(data);
    return(
        <CoinWrapper>
            {isLoading ? "Loading...": 
            <ApexChart 
                type="candlestick"
                series={[
                    {
                        data: data?.map((hist)=>
                        {return{
                            x:hist.close,
                            y:[Number(hist.open).toFixed(3),Number(hist.high).toFixed(3),Number(hist.close).toFixed(3),Number(hist.low).toFixed(3)]
                        }})
                    },
                ] as any }
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
            }} /> }
        </CoinWrapper>
    );
}

export default Chart;

