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
