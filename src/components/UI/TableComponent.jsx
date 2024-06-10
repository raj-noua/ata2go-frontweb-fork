import { Table }    from "react-bootstrap";
import { styled }   from "styled-components";
import { motion }   from "framer-motion";
import FONTS        from "../../config/fonts";
import { Colors }   from "../../config/colors";

const TableWrapper = styled(motion.div)`
    border-radius: 20px 20px !important;
    overflow: hidden;
    border: 1px solid ${Colors.grayColor};
`;
const SiteTable = styled(motion(Table))`
    margin-bottom: 0;
    th,
    td {
        padding: 15px;
    }

    thead {
        tr {
            background-color: transparent;
            height: 60px;
            th {
                background-color: ${Colors.primaryColor};
                vertical-align: middle;
                font-family: ${FONTS.lexend};
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 1.2;
                color: #ffffff;
            }
        }
    }

    tbody {
        tr {
            td {
                font-family: ${FONTS.lexend};
                font-style: normal;
                font-weight: 300;
                font-size: 14px;
                line-height: 1.2;
                /* Gray-300 */
                color: ${Colors.grayColor};
            }
        }
    }
`;
const SiteDataTable = styled(motion.div)`
    margin-bottom: 0;

    th,
    td {
        padding: 15px;
    }

    thead {
        tr {
            background-color: transparent;
            height: 60px;
            th {
                background-color: ${Colors.primaryColor};
                vertical-align: middle;
                font-family: ${FONTS.lexend};
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 1.2;
                color: #ffffff;
            }
        }
    }

    tbody {
        tr {
            td {
                background-color: transparent !important;
                font-family: ${FONTS.lexend};
                font-style: normal;
                font-weight: 300;
                font-size: 14px;
                line-height: 1.2;
                /* Gray-300 */
                color: ${Colors.grayColor};
                --bs-table-color-type: transparent;
                --bs-table-bg-type: transparent;

                &.selection-cell {
                    input {
                        opacity: 0;
                    }
                }
            }

            &.active {
                td {
                    --bs-table-color-type: rgba(202, 216, 255, 0.1) !important;
                    --bs-table-bg-type: rgba(202, 216, 255, 0.1) !important;
                    color: ${Colors.primaryColor};
                }
            }

            &.clickable {
            }
        }
    }

    .react-bootstrap-table {
        table {
            table-layout: auto;
            margin-bottom: 0;

            &.clickable {
                tbody {
                    tr {
                        cursor: pointer;
                    }
                }
            }

            &.table-hover {
                tbody {
                    tr:hover {
                        background-color: rgba(${Colors.primaryColorRgba}, 0.2);
                        td {
                            color: ${Colors.grayColor};
                        }
                    }
                }
            }
        }
    }
`;

const TableComponent = props => {
    return (
        <TableWrapper variants={props.variants}>
            {!props.isDataTable ? (
                <SiteTable striped responsive>
                    {props.children}
                </SiteTable>
            ) : (
                <SiteDataTable className="custData">{props.children}</SiteDataTable>
            )}
        </TableWrapper>
    );
};

export default TableComponent;
