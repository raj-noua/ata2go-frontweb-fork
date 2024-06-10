import styled from "styled-components";
import FONTS from "../../../config/fonts";
import { Colors } from "../../../config/colors";
import { Images } from "../../../config/images";
import { motion } from "framer-motion";

export const AboutWrapper = styled.section`
    /* height: 100%;
    min-height: 800px; */
    position: relative;
    /* Light-Blue */
    background: ${Colors.lightBlueColor};
    overflow: hidden;

    .container-fluid {
        height: 100%;
    }
`;
export const AboutImageContainer = styled(motion.div)`
    width: 100%;
    height: 100%;

    div.aboutImage {
        width: 100%;
        height: 100%;
        background-image: url(${Images.aboutUsSectionImage});
        background-position: center center;
        background-size: cover;
    }
`;

export const InnerContent = styled(motion.div)`
    width: 100%;
    max-width: 560px;
    margin: auto;
    text-align: left;
    height: 100%;
    min-height: 100vh;
    padding: 3em 15px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    @media only screen and (max-width: 767.98px) {
        max-width: 100%;
    }
`;

export const SectionTitleBox = styled(motion.h3)`
    /* H2 */
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 1;
    text-align: left;
    margin-bottom: 30px;

    /* Dark-400 */
    color: ${Colors.darkColor};
`;

export const ContentBox = styled(motion.div)`
    text-align: justify;
    margin-bottom: 30px;

    /* Gray-300 */
    color: ${Colors.grayColor};

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
