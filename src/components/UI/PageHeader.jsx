import { Container }    from "react-bootstrap";
import styled           from "styled-components";
import { Images }       from "../../config/images";
import FONTS            from "../../config/fonts";

const PageHeaderWrapper = styled.div`
    margin-bottom: 0px;
    /* height: 100%;
    min-height: 250px; */
    background-image: url(${Images.pageHeaderBgImage});
    background-size: cover;
    background-position: center center;
    padding: 70px 0 10px;
    position: sticky;
    top: 0;
    z-index: 998;

    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 1024.98px) {
        min-height: 150px; /* 350 */
    }
    @media only screen and (max-width: 767.98px) {
        min-height: 50px; /* 300 */
    }

    h1 {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 700;
        font-size: clamp(calc(1.375rem + 1.5vw), 5vw, 48px);
        line-height: 40px;
        text-align: center;

        color: #ffffff;
    }
`;

const PageHeader = ({ title }) => {
    return (
        <PageHeaderWrapper>
            <Container>
                <h1>{title}</h1>
            </Container>
        </PageHeaderWrapper>
    );
};

export default PageHeader;
