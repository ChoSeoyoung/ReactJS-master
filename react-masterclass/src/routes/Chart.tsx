import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
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
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
function Chart({coinId} : ChartProps){
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId));
    return(
        <CoinWrapper>
            {isLoading ? "Loading...":
            <ApexChart 
                type="line"
                series={[
                    {
                        name: "prices",
                        data: data?.map(price  => price.close) as number[]
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

export default Chart;

