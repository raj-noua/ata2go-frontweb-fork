import styled from "styled-components";
import { Images } from "../../../config/images";

import FONTS from "../../../config/fonts";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { motion } from "framer-motion";
import { Colors } from "../../../config/colors";

export const SignInPage = styled.div`
    height: 100%;
    min-height: 100vh;
    position: relative;
    background-image: url(${Images.bannerBgImage});
    background-position: center center;
    background-size: cover;
    color: #ffffff;
    padding: 3em;
    transition: all 0.3s ease-in-out;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 1025px) {
        height: auto;
        max-height: 100%;
    }
`;
export const InnerContent = styled(motion.div)`
    max-width: 992px;
    width: 100%;
    /* height: auto;
    min-height: 637px; */
    margin-top: 17px;
    margin-bottom: 17px;
    padding: 3.5em 3.5em;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: inset 0px 1px 40px rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(50px);
    border-radius: 20px;
`;

export const PageTitle = styled.h3`
    /* H3 */
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 1.2;
    color: #ffffff;
    text-align: center;
`;

export const TitleContainer = styled.div`
    text-align: center;
    margin-bottom: 30px;

    p {
        /* 16-Line */
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.2;
        color: #ffffff;
        text-align: center;
    }
`;

export const SignInForm = styled(motion(Form))`
    /* width: 100%;
    max-width: 410px;
    padding: 40px 0; */
    margin-bottom: 50px;
`;

export const InvoiceForm = styled(motion(Form))`
    /* width: 100%;
    max-width: 410px;
    padding: 40px 0; */
    margin-bottom: 50px;
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

    &.dark {
        color: #000;
    }
`;
export const FormControlField = styled(motion(FormControl))`
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 14px 16px;
    gap: 10px;

    /* Stroke */
    border: 1px solid ${Colors.placeHolderColor};
    border-radius: 5px;

    &.form-control {
        background-color: transparent;
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.2;
        color: #ffffff;

        &.dark {
            color: #000;
        }
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
    background: ${Colors.primaryColor};
    border-radius: 8px;
    opacity: 1 !important;
    display: flex !important;
    justify-content: center;
    align-items: center;
    span {
        font-family: ${FONTS.openSans};
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.2;
        text-align: center;
        color: #ffffff;
    }

    &.sm-width {
        max-width: 200px;
    }
    &.rightBtn {
        margin-left: auto !important;
        margin-right: 0 !important;
    }
`;

export const ShowHidePassField = styled(motion.div)`
    position: relative;

    .form-control {
        padding-right: 5.5em !important;
    }

    button {
        position: absolute !important;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none !important;

        svg {
            width: 24px;
            height: 24px;
            path {
                stroke: ${Colors.placeHolderColor};
            }
        }

        &:hover {
            background-color: transparent !important;
        }
    }

    &:focus {
        border-color: #ffffff;
    }
`;

export const SignUpText = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.2;

    span {
        color: #ffffff;
    }

    a {
        color: ${Colors.secondaryColor};
    }
`;
export const FormCheckField = styled(motion.div)`
    .form-check {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 15px;

        &.dark {
            .form-check-label {
                color: #000 !important;
            }
        }
    }

    .form-check-input {
        width: 20px;
        height: 20px;
        &:checked {
            background-color: ${Colors.secondaryColor};
            border-color: ${Colors.secondaryColor};
        }

        &:focus {
            box-shadow: 0 0 0 0.25rem rgba(${Colors.secondaryColorRgba}, 0.25);
        }
    }
    .form-check-label {
        width: calc(100% - 20px);

        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.2;
        align-items: center;
        color: #ffffff;
    }
`;
