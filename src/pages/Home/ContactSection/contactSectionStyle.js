import styled from "styled-components";
import FONTS from "../../../config/fonts";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { Colors } from "../../../config/colors";
import { motion } from "framer-motion";

export const ContactWrapper = styled.section`
    height: auto;
    position: relative;

    /* Dark-400 */
    background: ${Colors.darkColor};
    color: #ffffff;
`;

export const GoogleMapContainer = styled(motion.div)`
    width: 100%;
    height: 100%;

    iframe {
        width: 100%;
        height: 100%;
    }

    @media only screen and (max-width: 767px) {
        height: 640px;
    }
`;
export const ContactContentBox = styled(motion.div)`
    width: 100%;
    max-width: 85%;
    height: 100%;
    margin-left: auto;
    margin-right: 0;
    color: #ffffff;
    padding: 3em 0 3em;

    @media only screen and (min-width: 1600px) {
        max-width: 90%;
        padding: 6em 0 6em;
    }
    @media only screen and (max-width: 992px) {
        max-width: 95%;
        padding: 3em 0;
    }

    @media only screen and (max-width: 575px) {
        max-width: 100%;
        padding: 3em 15px;
        margin: auto;
    }
`;
export const SectionTitleText = styled(motion.h3)`
    /* H3 */
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 1.2;
    margin-bottom: 30px;

    /* White */
    color: #ffffff;
`;
export const ContactInfoBox = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5em;
    margin-bottom: 40px;

    @media only screen and (max-width: 767px) {
        margin-bottom: 30px;
        gap: 1em;
    }

    .contactItem {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        span,
        a {
            /* 14-Light */
            font-family: ${FONTS.lexend};
            font-style: normal;
            font-weight: 300;
            font-size: 14px;
            line-height: 1.2;
            text-decoration: none;

            /* White */
            color: #ffffff;

            /* Inside auto layout */
            flex: none;
            order: 1;
            flex-grow: 0;
        }
    }

    /* White */
    color: #ffffff;
`;
export const ContactForm = styled(motion(Form))`
    width: 100%;
    max-width: 410px;
    padding: 40px 0;
    margin-bottom: 50px;

    @media only screen and (min-width: 1600px) {
        max-width: 70%;
    }

    @media only screen and (max-width: 767px) {
        margin-bottom: 30px;
        max-width: 600px;
        padding-right: 2em;
    }

    @media only screen and (max-width: 575px) {
        padding-right: 0em;
    }
`;

export const FormLabelText = styled(motion(FormLabel))`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.2;
    display: flex;
    align-items: center;
    color: #ffffff;
    flex: none;
    order: 0;
    flex-grow: 0;
`;
export const FormControlField = styled(motion(FormControl))`
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 14px 16px;
    gap: 10px;

    /* Stroke */
    border: 1px solid ${Colors.strokeColor};
    border-radius: 5px;

    &.form-control {
        background-color: transparent;
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.2;
        color: #ffffff;
    }

    &:focus {
        outline: none !important;
        box-shadow: unset !important;
        border-color: #ffffff !important;
    }
`;

export const FormControlTextArea = styled(FormControlField)``;

export const FormButton = styled(motion(Button))`
    width: 100%;
    padding: 12px 26px;
    height: 46px;
    /* background: ${Colors.primaryColor}; */
    border-radius: 8px;

    span {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 200;
        font-size: 16px;
        line-height: 1;
        text-align: center;
        color: #ffffff;
    }
`;

export const CopyRightText = styled(motion.div)`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 200;
        font-size: 16px;
        line-height: 1;
        text-align: left;
        color: #ffffff;
        padding-right: 2em;
        background-color: ${Colors.darkColor};
        position: relative;
        z-index: 2;
    }

    &::after {
        content: "";
        width: 100%;
        height: 1px;
        background-color: ${Colors.strokeColor};

        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        z-index: 0;
    }

    @media only screen and (max-width: 575px) {
        justify-content: center;

        span {
            padding: 0px;
            text-align: center;
            line-height: 1.5;
        }

        &::after {
            display: none !important;
        }
    }
`;
