import { Colors } from "../../../../config/colors";
import { CheckBoxLabel } from "./labelCheckBoxStyle";
const LabelCheckBox = ({ children, checkboxStyle, onChange, checked, isCategoryBox = false, checkboxOnly = false }) => {
    const isCategory = isCategoryBox ? "outerBox categoryBox" : "outerBox";

    return (
        <CheckBoxLabel className={`${checkboxStyle || ""} ${checked ? "selected" : ""}`}>
            <div className={`${isCategory} ${checked ? "selected" : ""}`}>
                <input type="checkbox" onChange={onChange} />
                <svg className={`checkbox ${checked ? "checkbox--active" : ""}`} width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                        d={`M8 3H24V-3H8V3ZM29 8V24H35V8H29ZM24 29H8V35H24V29ZM3 24V8H-3V24H3ZM8 29C5.23858 29 3 26.7614 3 24H-3C-3 30.0751 
                    1.92487 35 8 35V29ZM29 24C29 26.7614 26.7614 29 24 29V35C30.0751 35 35 30.0751 35 24H29ZM24 3C26.7614 3 29 5.23858 
                    29 8H35C35 1.92487 30.0751 -3 24 -3V3ZM8 -3C1.92487 -3 -3 1.92487 -3 8H3C3 5.23858 5.23858 3 8 3V-3Z`}
                        fill={Colors.secondaryColor}
                    />
                    <path
                        d="M8 14.7949L13.0374 20.2125C13.433 20.6379 14.1065 20.6379 14.502 20.2126L24 10"
                        stroke={checked ? "#fff" : "none"} // only show the checkmark when `isCheck` is `true`
                        className="check-mark"
                        strokeWidth={checked ? "3" : "0"}
                        strokeLinecap="round"
                    />
                </svg>
                {!checkboxOnly ? children : null}
            </div>
        </CheckBoxLabel>
    );
};

export default LabelCheckBox;
