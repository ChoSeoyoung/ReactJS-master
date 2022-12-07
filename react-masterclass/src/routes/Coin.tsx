import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled
 from "styled-components";
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 40px;
    color: ${(props)=>props.theme.accentColor};
`;
const Loader = styled.span`
    color: ${(props)=>props.theme.textColor};
    text-align: center;
    display: block;
`;
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;


interface RouterParams {
    coinId: string;
}
interface RouteState {
    name: string;
}
function Coin(){
    const [loading,setLoading] = useState(true);
    const {coinId}  = useParams<RouterParams>();
    const {
        state
    } = useLocation<RouteState>();
    return (<Container>
        <Header>
            <Title>{state?.name || "Loading"}</Title>
        </Header>
        {loading ? (<Loader>Loading...</Loader>):null}
    </Container>);
}

export default Coin;
