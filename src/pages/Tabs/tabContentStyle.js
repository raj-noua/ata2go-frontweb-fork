import { Button }    from "react-bootstrap";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Colors } from "../../config/colors";
import FONTS from "../../config/fonts";

export const TabContentContainer = styled(motion.div)`
    padding: 2em 15px 0;
    width: 100%;
    margin: auto;

    @media only screen and (max-width: 767.98px) {
        padding: 2em 0px 0;
    }
`;

export const TabTitle = styled.h3`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 1.2;
    color: ${Colors.darkColor};
    margin: 0 auto 30px;

    @media only screen and (max-width: 767.98px) {
        justify-content: flex-start;
        text-align: left !important;
    }
`;
export const TabSubTitle = styled.h4`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 1.2;
    color: ${Colors.darkColor};
    margin: 0 auto 30px;

    @media only screen and (max-width: 767.98px) {
        justify-content: flex-start;
        text-align: left !important;
    }
`;

export const BoldContent = styled.div`
    margin: 0 auto 30px;
    width: 100%;
    max-width: 946px;

    p {
        font-family: ${FONTS.lexend};
        color: ${Colors.grayColor};
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 1.5;
        text-align: center;

        @media only screen and (max-width: 767.98px) {
            text-align: left !important;
        }
    }
`;
export const TextContent = styled.div`
    margin: 0 auto 0px;
    width: 100%;
    max-width: 946px;

    &.full {
        max-width: 100%;
    }
    p {
        font-family: ${FONTS.lexend};
        color: ${Colors.grayColor};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.6;
        text-align: justify;
    }
`;

export const TableContainer = styled.div`
    margin: 0px auto 30px;
    /* width: 100%;
    max-width: 946px; */
    p {
        font-family: ${FONTS.lexend};
        color: ${Colors.grayColor};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.6;
        text-align: center;
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
        border-radius: 4px;
        border-color: ${Colors.strokeColor} !important;

        &:checked {
            background-color: ${Colors.primaryColor};
            border-color: ${Colors.primaryColor};
        }

        &:focus {
            box-shadow: 0 0 0 0.25rem rgba(${Colors.primaryColorRgba}, 0.25);
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


export const OrderButton = styled(Button)`
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