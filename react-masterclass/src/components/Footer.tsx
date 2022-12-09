import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: ${(props)=>props.theme.primaryColor};
    width: 100vw;
    height: 200px;
    margin-top: 100px;
`;
function Footer(){
    return(<Container></Container>)
}

export default Footer;

