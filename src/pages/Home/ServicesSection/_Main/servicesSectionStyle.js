import styled       from "styled-components";
import FONTS        from "../../../../config/fonts";
import { motion }   from "framer-motion";

export const ServicesSectionWrapper = styled(motion.section)`
    /* height: auto;
    min-height: 100vh; */
    padding: 6em 0;
    position: relative;
    background: rgb(243, 246, 255);
    background: radial-gradient(circle, rgba(243, 246, 255, 1) 0%, rgba(208, 240, 255, 1) 100%);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 1024px) {
        .container {
            max-width: 100% !important;
        }
    }
`;

export const ContentBox = styled(motion.div)`
    text-align: justify;
    padding: 2em 0;
    color: #57504d;

    -webkit-columns: 40px 2;
    /* Chrome, Safari, Opera */
    -moz-columns: 60px 2;
    /* Firefox */
    columns: 60px 2;

    p {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.8;
        margin: 0 1.5rem;
        margin-bottom: 1.5rem !important;

        &:last-child {
            margin-bottom: 0;
        }

        @media only screen and (max-width: 767px) {
            text-align: justify;
        }
    }

    @media only screen and (max-width: 1024.96px) {
        -webkit-columns: unset;
        /* Chrome, Safari, Opera */
        -moz-columns: unset;
        /* Firefox */
        columns: unset;

        p {
            margin-left: 0rem;
            margin-right: 0rem;
        }
    }
`;
export const ServicesContainer = styled(motion.div)`
    padding: 3em 0;
`;
