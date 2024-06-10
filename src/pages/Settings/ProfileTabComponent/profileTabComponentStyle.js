import styled from "styled-components";
import { Colors } from "../../../config/colors";
import FONTS from "../../../config/fonts";

export const TabComponentWrapper = styled.div`
    /* min-height: 800px;
    overflow: hidden; */
    height: auto;
    border-radius: 0px;
    background: transparent;
    overflow: hidden;
    margin: 0.5em auto; /* JJ modified */
    /* box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075); */
    display: flex;
    flex-direction: column;

    .tabs {
        flex-grow: 1;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        flex-wrap: nowrap;
        width: 100%;
    }

`;
export const TabNavHeader = styled.nav`
    background: transparent;
    /* border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0; */
    border-bottom: 1px solid ${Colors.placeHolderColor};
    position: relative;

    &::after {
        content: "";
        width: 50px;
        height: 100%;
        background-image: linear-gradient(to left, #ffffff, transparent);
        position: absolute;
        right: 0;
        top: 0;
        z-index: 5;
    }

    > ul,
    > li {
        list-style: none;
        padding: 0;
        margin: 0;
        font-family: ${FONTS.lexend};
        font-weight: 500;
        font-size: 14px;
    }
`;
export const TabNavList = styled.ul`
    display: flex;
    width: 100%;
    position: relative;
    padding-right: 30px !important;

    @media only screen and (max-width: 767.98px) {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .slider {
        position: absolute;
        left: 0;
        bottom: 0;
        transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);

        .indicator {
            position: relative;
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            height: 2px;
            background: ${Colors.primaryColor};
            border-radius: 1px;
        }
    }

    > li:last-child {
        span {
            color: red;
        }
    }
`;
export const TabNavItem = styled.li`
    /* border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0; */
    padding: 15px 15px;
    position: relative;
    background: transparent;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    user-select: none;
    flex-shrink: 0;
    /* flex: 1; */

    &:last-child {
        margin-right: 50px !important;
        span {
            color: red !important;
        }
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
        color: ${Colors.darkColor};
        opacity: 0.6;
    }

    &.selected {
        /* background: #eee; */
        color: ${Colors.primaryColor};

        span {
            transition: all 0.2s ease-in-out;
            color: ${Colors.primaryColor};
            font-weight: 400;
            opacity: 1;
        }

        svg {
            transition: all 0.2s ease-in-out;
            color: ${Colors.primaryColor};
        }
    }

    /* &:nth-of-type(4).selected ~ .slider {
        transform: translateX(300%);
    } */
`;
export const TabContentBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;

    > div {
        width: 100%;
    }

    &.mb-60 {
        margin-bottom: 60px !important;
    }
`;
export const CustomTabHeader = styled.div``;
