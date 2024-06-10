import { Link } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../config/colors";

export const HeaderBar = styled.header`
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    transition: all 0.3s ease-in-out;

    &.scrolled {
        /* background-color: #ffffff; */
        transition: all 0.3s ease-in-out;
        /* box-shadow: 0px 3px 6px 0px #00000029; */

        @media only screen and (max-width: 767.98px) {
            background-color: #ffffff;
            backdrop-filter: blur(5px);
        }
    }

    .container {
        @media only screen and (max-width: 992.98px) {
            max-width: 100%;
        }
    }
`;
export const SiteLogo = styled(Link)`
    img {
        width: 80px;
        transition: all 0.3s ease-in-out;
    }
    &.scrolled {
        img {
            width: 70px;
        }
    }
`;
export const RespinsiveView = styled.div`
    &.desktop_only {
        @media only screen and (max-width: 767.98px) {
            display: none;
        }
    }
    &.mobile_only {
        @media only screen and (min-width: 768px) {
            display: none;
        }
    }
`;
export const MobileMenu = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .toggleMenu {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;
        height: 45px;
        width: 45px;
        margin-left: 10px;
        border-color: transparent !important;
        padding: 8px !important;
        background-color: transparent !important;

        &:focus,
        &:focus-visible {
            box-shadow: unset;
        }

        span {
            width: 20px;
            height: 2px;
            background-color: ${Colors.secondaryColor};
            transition: all 0.3s ease-in-out 0s;
            border-radius: 10px;

            &.centerLine {
                width: 18px;
            }

            &:not(:last-child) {
                margin-bottom: 4px;
            }
        }

        &.scrolled {
            span {
                //background-color: ${Colors.primaryColor};
            }
        }
    }

    .menu.profile {
        ul {
            right: unset !important;
            left: -130% !important;
        }
    }
    .menu.profileMenu {
        ul {
            right: unset !important;
            left: -130% !important;
        }
    }
`;
