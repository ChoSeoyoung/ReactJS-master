import { useState } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { isLightAtom } from "../atoms";
import { useSetRecoilState } from "recoil";

const Container = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 20px;
`;
const Title = styled.h1`
    font-size: 40px;
    color: ${(props)=>props.theme.primaryColor};
`;

function Header(){
    const setLightAtom = useSetRecoilState(isLightAtom);

    return (<Container>
        <Helmet title="코인" />
        <Link to={`/`}>
            <Title>코인</Title>
        </Link>
        <div style={{margin:"20px"}}>
          👇🏻LightMode/DarkMode<br/>
          <button 
            style={{margin: "10px 0px" }}
            onClick={()=>setLightAtom((current)=>!current)}>Change Mode</button>
        </div>
    </Container>);
}

export default Header;
