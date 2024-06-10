import styled       from "styled-components";
import { motion }   from "framer-motion";
import { Colors }   from "../../config/colors";
import FONTS        from "../../config/fonts";

export const SectionTitleText = styled(motion.div)`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    flex-direction: column;
    margin-bottom: 30px;
    width: 100%;

    &:not(.noSep) {
        &::after {
            content: "";
            width: calc(100% + 0px);
            height: 1px;
            background: linear-gradient(90deg, rgba(5, 138, 212, 0.38) 0%, rgb(5, 138, 212) 52.08%, rgba(5, 138, 212, 0.38) 100%);
        }
    }
`;
export const SectionTitleH3 = styled(motion.h3)`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 1;
    text-align: left;
    color: ${Colors.grayColor} !important;
    background: -webkit-linear-gradient(52deg, ${Colors.primaryColor}, ${Colors.secondaryColor});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &.light {
        color: #ffffff !important;
    }

    span {
        font-size: 48px;
    }
`;
