import { TabContentContainer, TableContainer }  from "../../Tabs/tabContentStyle";
import { staggerVariants, titleVariants }       from "../../../utils/FmVariants";
import TableComponent                           from "../../../components/UI/TableComponent";

const SubsLearning = () => {
    return (
        <TabContentContainer variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
            <TableContainer>
                <TableComponent variants={titleVariants} isDataTable={+false}>
                    <thead>
                        <tr>
                            <th>Nb</th>
                            <th>Description</th>
                            <th>Date Started</th>
                            <th>Cost</th>
                            <th>Service Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Excel</td>
                            <td>20230408</td>
                            <td>20.00</td>
                            <td>Beginner</td>
                            <td>Current</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Excel</td>
                            <td>20230408</td>
                            <td>20.00</td>
                            <td>Beginner</td>
                            <td>Current</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Excel</td>
                            <td>20230408</td>
                            <td>20.00</td>
                            <td>Beginner</td>
                            <td>Current</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Excel</td>
                            <td>20230408</td>
                            <td>20.00</td>
                            <td>Beginner</td>
                            <td>Current</td>
                        </tr>
                    </tbody>
                </TableComponent>
            </TableContainer>
        </TabContentContainer>
    );
};

export default SubsLearning;
