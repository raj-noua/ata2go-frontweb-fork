import styled from "styled-components";
import { Images } from "../../../config/images";
import FONTS from "../../../config/fonts";
import { Colors } from "../../../config/colors";
import { motion } from "framer-motion";

export const BannerWrapper = styled.section`
    min-height: 100vh;
    position: relative;
    background-image: url(${Images.homeBannerImage});
    background-position: center center;
    background-size: cover;
    color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .container {
        position: relative;
        z-index: 1;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, ${Colors.primaryColor}, ${Colors.darkColor});
        opacity: 0.6;
        margin: auto;
        z-index: 0;
    }

    .floatImg {
        position: absolute;
        bottom: 25px;
        left: 0;
        right: 0;
        margin: auto;
        animation: scrollDownMove 1s infinite cubic-bezier(0.42, 0, 1, 1);
        z-index: 2;
        cursor: pointer;
    }
`;
export const H1Title = styled(motion.h1)`
    color: #ffffff;
    position: relative;
    padding-bottom: 0.5em;
    margin-bottom: 1em;
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 900;
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: 15px;
    text-align: left;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 150px;
        height: 3px;
        border-radius: 20px;
        background-color: #ffffff;
    }

    @media only screen and (max-width: 767.98px) {
        text-align: center;

        &::after {
            right: 0;
            margin: auto;
        }
    }
`;
export const H2Title = styled(motion.h2)`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 600;
    font-size: 45px;
    line-height: 1.2;
    margin-bottom: 0.5em;
    color: #ffffff;

    @media only screen and (max-width: 767.98px) {
        font-size: 32px;
        text-align: center;
    }
`;
export const SubTitle = styled(motion.p)`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 200;
    font-size: 32px;
    line-height: 1.2;
    text-align: left;

    color: #ffffff;

    @media only screen and (max-width: 767.98px) {
        font-size: 22px;
        text-align: center;
    }
`;
