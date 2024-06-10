import styled from "styled-components";
import { Colors } from "../../../../config/colors";
import FONTS from "../../../../config/fonts";

export const ServiceContentsTabs = styled.div`
    /* min-height: 2000px; */
    height: 100%;
    border-radius: 10px;
    background: transparent;
    /* overflow: hidden; */
    /* box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075); */
    display: flex;
    gap: 2em;

    .tabs {
        flex-grow: 1;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        flex-wrap: nowrap;
        width: 100%;
    }

    @media only screen and (max-width: 1025px) {
        flex-direction: column;
    }
`;
export const TabNavHeader = styled.nav`
    padding: 5px 5px 0;
    border-radius: 10px;
    width: 320px;
    height: 100%;

    @media only screen and (min-width: 1025px) {
        position: sticky !important;
        top: 90px;
        width: auto;
    }

    > p {
        color: #191919;

        @media only screen and (max-width: 1025px) {
            display: none;
        }
    }

    > ul,
    > li {
        list-style: none;
        padding: 0;
        margin: 0;
        font-family: ${FONTS.lexend};
        font-weight: 500;
        font-size: 14px;

        @media only screen and (max-width: 1025px) {
            display: inline-flex;
            gap: 1em;
            justify-content: center;
            flex-wrap: wrap;
        }
    }

    @media only screen and (max-width: 1025px) {
        width: auto;
    }
`;

export const TabContentBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    width: calc(100% - 330px);

    @media only screen and (max-width: 1025px) {
        width: 100%;
    }

    > div {
        width: 100%;
    }
`;

export const TabNavList = styled.ul`
    width: 100%;
`;
export const TabNavItem = styled.li`
    border-radius: 65px;
    width: 100%;
    padding: 5px 15px;
    position: relative;
    background: 0 0/0 100% no-repeat #ffffff;
    background-image: linear-gradient(354deg, ${Colors.secondaryColor}, ${Colors.primaryColor});
    transition: background 0.5s ease-in-out;

    @media only screen and (max-width: 1025px) {
        width: auto !important;
        margin-bottom: 0px;
        flex: unset;
    }

    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
    flex: 1;
    min-width: 0;
    user-select: none;
    margin-bottom: 10px;

    svg {
        position: relative;
        z-index: 3;
        transition: all 0.2s ease-in-out;
    }

    span {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 400;
        font-size: clamp(1em, 1.3vw, 16px);
        line-height: 1.2;
        position: relative;
        z-index: 3;
        transition: all 0.2s ease-in-out;
        color: ${Colors.primaryColor};
        width: calc(100% - 35px);
    }

    svg {
        width: 28px;
        height: 28px;
        transition: all 0.3s ease-in-out;
        color: #ffffff;
        background-color: ${Colors.secondaryColor};
        border-radius: 60px;
        border: 1px solid ${Colors.secondaryColor};
        padding: 2px;
        transform: translateX(-5px);
    }

    .underline {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: ${Colors.secondaryColor};
        width: 20px;
        /* max-width: 200px; */
        margin: auto;
        z-index: 2;
    }

    &.selected,
    &:hover {
        background-size: 100% 100%;
        color: #ffffff;

        span {
            transition: all 0.2s ease-in-out;
            color: #ffffff;
        }

        svg {
            transition: all 0.2s ease-in-out;
            transform: translateX(0px);
            /* color: #ffffff; */
        }
    }
`;
