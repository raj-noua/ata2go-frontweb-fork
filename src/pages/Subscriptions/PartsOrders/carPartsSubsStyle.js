import { styled } from "styled-components";
import { Colors } from "../../../../config/colors";

export const HeadingContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 15px;

    h4 {
        margin: 0;
    }

    p {
        margin-bottom: 0;

        a {
            color: ${Colors.secondaryColor};
        }
    }
`;
