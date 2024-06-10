import styled from "styled-components";
import FONTS from "../../../config/fonts";

export const ScrollTextWrapper = styled.div`
    position: absolute;
    z-index: 100;
    left: 50px;
    bottom: ${props => (props.$bottom ? `calc(-${props.$bottom}% + 20px)` : "0")};
    -webkit-transform-origin: 0 center;
    -ms-transform-origin: 0 center;
    transform-origin: 0 center;
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
    -webkit-transition: -webkit-transform 0.3s linear;
    transition: -webkit-transform 0.3s linear;
    -o-transition: transform 0.3s linear;
    transition: transform 0.3s linear;
    transition:
        transform 0.3s linear,
        -webkit-transform 0.3s linear,
        bottom 0.5s linear;
    opacity: ${props => (props.$isAcitve ? "0" : "1")};
    z-index: 25;
    cursor: pointer;

    @media only screen and (max-width: 1024px) {
        left: 25px;
    }
    @media only screen and (max-width: 992px) {
        display: none;
    }

    /* @media only screen and (max-width: 767px) {
        -webkit-transform: rotate(-90deg) scale(0.6);
        transform: rotate(-90deg) scale(0.6);
        left: 20px;
    } */

    .ScrollInfo {
        &_Contents {
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
        }

        &_Text {
            font-style: normal;
            font-weight: 500;
            font-size: 16px !important;
            text-align: center;
            color: ${props => (props.$color ? props.$color : "#303030")};
            font-family: ${FONTS.lexend};
            padding-right: 1.6rem;

            transition: color 0.5s ease;
        }

        &_Line {
            background-color: ${props => (props.$color ? props.$color : "#303030")};
            width: 6.2rem;
            height: 0.01rem;
            -webkit-transition: background-color 0.5s ease;
            -o-transition: background-color 0.5s ease;
            transition: background-color 0.5s ease;
        }
    }
`;
