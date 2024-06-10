import styled from "styled-components";
import { Colors } from "../../../../../config/colors";
import FONTS from "../../../../../config/fonts";

export const CoursePlanWrapper = styled.div`
    background: rgba(255, 255, 255, 0.2);
    padding: 24px;

    background: rgba(255, 255, 255, 0.1);
    box-shadow: inset 0px 1px 40px rgba(33, 72, 184, 0.2);
    backdrop-filter: blur(50px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 10px;
`;

export const PlanInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-bottom: 16px;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        opacity: 0.2;
        width: 100%;
        height: 1px;
        border-radius: 20px;
        background-color: ${Colors.grayColor};
        left: 0;
        bottom: 0;
    }
`;
export const PlanPrice = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`;

export const Price = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;

    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 1;
    text-align: center;
    margin-bottom: 0;
    color: ${Colors.primaryColor};

    span {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.2;
        text-align: left;
        margin-bottom: 0.1rem;
        color: ${Colors.grayColor};
        display: block;
    }
`;

export const PlanSpeed = styled.ul`
    display: inline-flex;
    gap: 10px;
    list-style: none;
    margin: 0;
    padding: 0;

    @media only screen and (min-width: 1026px) and (max-width: 1200px) {
        justify-content: space-evenly;
        width: 100%;
    }

    li {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        gap: 4px;

        span {
            font-family: ${FONTS.lexend};
            font-style: normal;
            font-weight: 300;
            font-size: 16px;
            line-height: 1.2;

            color: ${Colors.grayColor};
        }
    }
`;

export const CourseInfo = styled.div`
    font-family: ${FONTS.lexend};
    font-style: normal;
    text-align: left;

    h2 {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: ${Colors.darkColor};
    }

    span {
        font-weight: 300;
        font-size: 14px;
        line-height: 1.2;
        color: #ffffff;
        padding: 4px 10px;
        background: ${Colors.primaryColor};
        border-radius: 5px;
    }
`;

export const PlanContent = styled.div`
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 6px;

    p {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 1.5;
        text-align: left;
        margin-bottom: 0;
        color: ${Colors.grayColor};
        position: relative;
        padding-left: 26px;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto auto;
            width: 8px;
            height: 8px;
            border-radius: 30px;
            background: ${Colors.primaryColor};
        }
    }
`;
