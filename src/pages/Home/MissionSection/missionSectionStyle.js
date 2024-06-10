import styled from "styled-components";
import { Images } from "../../../config/images";
import FONTS from "../../../config/fonts";
import { Colors } from "../../../config/colors";
import { motion } from "framer-motion";

export const MissionWrapper = styled(motion.section)`
    height: auto;
    min-height: 100vh;
    padding: 3em;
    position: relative;
    background-color: rgba(33, 72, 184, 0.06);
    background-image: url(${Images.affiliatemarketing});
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    @media only screen and (max-width: 767.98px) {
        background-position: right center;
        padding: 3em 0em;

        .container {
            max-width: 100%;
        }
    }
`;

export const ContentBox = styled(motion.div)`
    text-align: justify;
    padding: 2em;
    background: rgb(243 246 255 / 95%);
    color: ${Colors.darkColor};

    box-shadow: 0px 3px 6px 0px #00000029;
    border-radius: 8px;
    width: 100%;
    max-width: 860px;
    margin-left: auto;
    margin-right: 0;

    @media only screen and (max-width: 992.98px) {
        background: rgb(243 246 255 / 100%);
    }

    p {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.8;

        &:last-child {
            margin-bottom: 0;
        }

        @media only screen and (max-width: 767px) {
            text-align: justify;
        }
    }
`;
export const SectionTitleText = styled(motion.h3)``;
export const ScrollBottomText = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;

    span {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 1.2;

        text-align: center;
        letter-spacing: 0.28em;
        color: ${Colors.primaryColor};
    }

    svg {
        animation: scrollDownMove 1s infinite cubic-bezier(0.42, 0, 1, 1);
    }
`;
