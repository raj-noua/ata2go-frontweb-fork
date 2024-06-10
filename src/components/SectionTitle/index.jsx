import { tileVariants }                     from "../../utils/FmVariants";
import { SectionTitleH3, SectionTitleText } from "./sectionTitleStyle";

const SectionTitle = ({ children, separator = true, variant = "dark" }) => {
    return (
        <SectionTitleText className={`${!separator ? "noSep" : ""}`} variants={tileVariants}>
            <SectionTitleH3 variants={tileVariants} className={`${variant === "light" ? "light" : "dark"}`}>
                {children}
            </SectionTitleH3>
        </SectionTitleText>
    );
};

export default SectionTitle;