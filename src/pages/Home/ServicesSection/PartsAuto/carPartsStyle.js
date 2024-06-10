import { Button }    from "react-bootstrap";
import { styled } from "styled-components";
import { Images } from "../../../../config/images";
import { Colors } from "../../../../config/colors";

export const CarPartsInnerContent = styled.div`
    padding: 3em 3em;
    backdrop-filter: blur(50px);

    width: 100%;
    height: 100%;
    min-height: 587px;
    background-image: linear-gradient(320deg, rgba(${Colors.secondaryColorRgba}, 1) 0%, rgba(${Colors.primaryColorRgba}, 0.8) 100%),
        url(${Images.carPartsSectionBg});
    background-position: center center;
    background-size: contain;
    border-radius: 15px;
    overflow: hidden;
    position: relative;

    @media only screen and (max-width: 767.98px) {
        padding: 3em 15px;
    }

    h3,
    p {
        color: #ffffff !important;
    }
    p {
        font-size: 500;
        text-align: left !important;
    }
`;


export const PartsOrderButtonBox = styled.div`
    padding: 3em 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const PartsOrderButton = styled(Button)`
    padding: 12px 26px;

    width: 100%;
    max-width: 406px;
    border-radius: 8px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.2;
    text-align: center;
    color: #ffffff;
`;

export const RestrictionText = styled.p`
    color: #ff3333 !important;
    margin-top: 30px;
`;