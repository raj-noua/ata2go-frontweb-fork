import styled from "styled-components";
import { Button, Nav } from "react-bootstrap";
import { Colors } from "../../../config/colors";

export const SiteNav = styled(Nav)`
    align-items: center;
    gap: 2rem;
    padding-top: 0;
    padding-bottom: 0;

    > a:last-child {
        margin-right: 1.5rem;
    }

    .nav-link {
        text-align: center;
        font-weight: 500;
        padding: 0 !important;

        color: #ffffff;

        svg path {
            stroke: #ffffff !important;
        }

        &.active {
            /* color: ${Colors.primaryColor}; */
            color: #ffffff;

            svg path {
                stroke: ${Colors.primaryColor};
            }
        }
    }

    &.scrolled {
        /* .nav-link {
            color: ${Colors.grayColor};

            svg path {
                stroke: ${Colors.grayColor} !important;
            }

            &.active {
                color: ${Colors.primaryColor};

                svg path {
                    stroke: ${Colors.primaryColor};
                }
            }
        } */
    }
`;

export const LoginButton = styled(Button)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 26px !important;
    gap: 10px;

    background: #2148b8;
    border-radius: 8px;

    font-family: "Open Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    text-align: center;

    color: #ffffff;
`;
