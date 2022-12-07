import {Link} from "react-router-dom";
import styled from "styled-components";

const Container = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 40px;
    color: ${(props)=>props.theme.primaryColor};
`;

function Header(){
    return (<Container>
        <Link to={`/`}><Title>코인</Title></Link>

    </Container>);
}

export default Header;
