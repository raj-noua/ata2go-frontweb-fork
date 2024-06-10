import styled from "styled-components";
import FONTS from "../../../config/fonts";
import { Colors } from "../../../config/colors";
import { motion } from "framer-motion";

export const PrivacyWrapper = styled(motion.section)`
    height: auto;
    /* min-height: 100vh; */
    padding: 6em 0;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 767px) {
        .container {
            max-width: 100%;
        }
    }
`;

export const ContentBox = styled(motion.div)`
    text-align: justify;
    color: ${Colors.darkColor};

    p {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.8;

        margin-bottom: 1.5rem !important;

        &:last-child {
            margin-bottom: 0;
        }

        @media only screen and (max-width: 767px) {
            text-align: justify;
        }
    }
`;
export const ImageBox = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    @media only screen and (max-width: 767px) {
        width: 50%;
        margin: auto;
    }
`;
