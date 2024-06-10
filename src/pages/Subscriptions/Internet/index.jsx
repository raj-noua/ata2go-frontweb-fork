import { TabContentContainer, TabSubTitle, TableContainer } from "../../Tabs/tabContentStyle";
import { staggerVariants, titleVariants }                   from "../../../utils/FmVariants";
import TableComponent                                       from "../../../components/UI/TableComponent";

const SubsInternet = () => {
    return (
        <TabContentContainer variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
            <TableContainer>
                <TabSubTitle>Internet Service Details</TabSubTitle>
                <TableComponent variants={titleVariants} isDataTable={+false}>
                    <tbody>
                        <tr>
                            <td>Bill Method</td>
                            <td>Invoice</td>
                        </tr>
                        <tr>
                            <td>Payment Method</td>
                            <td>eTransfert (Credit Card coming soon)</td>
                        </tr>
                        <tr>
                            <td>Points accumulated</td>
                            <td>15</td>
                        </tr>
                    </tbody>
                </TableComponent>
            </TableContainer>
        </TabContentContainer>
    );
};

export default SubsInternet;
