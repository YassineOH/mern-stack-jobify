import styled from "styled-components";

const Wrapper = styled.section`
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap : 3rem;

    .myStyle {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        border-top: 5px solid var(--primary-500);
        gap: 3rem
    }
`



export default Wrapper