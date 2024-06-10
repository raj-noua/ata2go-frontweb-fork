import styled from "styled-components";

import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { motion } from "framer-motion";
import { Images } from "../../config/images";
import FONTS from "../../config/fonts";
import { Colors } from "../../config/colors";
import { Link } from "react-router-dom";

export const SignInPage = styled.div`
    height: 100%;
    min-height: 100vh;
    position: relative;
    background-image: url(${Images.bannerBgImage});
    background-position: center center;
    background-size: cover;
    color: #ffffff;
    padding: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: all 0.3s ease-in-out;

    @media only screen and (max-width: 1025px) {
        height: auto;
        max-height: 100%;
    }
`;
export const InnerContent = styled(motion.div)`
    max-width: 751px;
    width: 100%;
    /* height: 100%;
    min-height: 637px; */
    margin-top: 15px;
    margin-bottom: 15px;
    padding-top: 3.5em;
    padding-bottom: 3.5em;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: inset 0px 1px 40px rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(50px);
    border-radius: 20px;

    .container {
        max-width: 500px;
    }
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

export const TitleContainer = styled(motion.div)`
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
    }

    &:focus {
        outline: none !important;
        box-shadow: unset !important;
        border-color: #ffffff !important;
    }
`;

export const FormButton = styled(motion(Button))`
    width: 100%;
    padding: 12px 26px;
    height: 46px;
    /* background: ${Colors.primaryColor}; */
    border-radius: 8px;

    span {
        font-family: ${FONTS.openSans};
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.2;
        text-align: center;
        color: #ffffff;
    }
`;
export const ForgotPassLink = styled(motion(Link))`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.2;
    text-decoration: none;
    color: ${Colors.secondaryColor};
    transition: all 0.3s ease-in-out;

    &:hover {
        color: #ffffff;
        transition: all 0.3s ease-in-out;
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
