import { useEffect, useState }                                              from "react";
import { toast }                                                            from "react-toastify";
import { Button, Form }                                                     from "react-bootstrap";
import { FormCheckField, TabContentContainer, TableContainer }              from "../../Tabs/tabContentStyle";
import TableComponent                                                       from "../../../components/UI/TableComponent";
import { staggerVariants, titleVariants }                                   from "../../../utils/FmVariants";
import { useAddNotificationsMutation, useGetNotificationsByUserIdQuery }    from "../../../services/notificationApi";


const SetNotifications = ({ user }) => {
    const [addNotifications] = useAddNotificationsMutation();
    const { data, isSuccess } = useGetNotificationsByUserIdQuery(user?._id);
    const [notif, setNotif] = useState({
        notificationSms: false,
        notificationCourriel: false,
        notificationAppel: false,
        facturationSms: false,
        facturationCourriel: false,
        facturationAppel: false,
        sondagesCourriel: false,
        sondagesAppel: false,
        marketingAppel: false,
    });
    useEffect(() => {
        if (isSuccess) {
            setNotif({
                notificationSms: data?.data[0]?.notificationSms,
                notificationCourriel: data?.data[0]?.notificationCourriel,
                notificationAppel: data?.data[0]?.notificationAppel,
                facturationSms: data?.data[0]?.facturationSms,
                facturationCourriel: data?.data[0]?.facturationCourriel,
                facturationAppel: data?.data[0]?.facturationAppel,
                sondagesCourriel: data?.data[0]?.sondagesCourriel,
                sondagesAppel: data?.data[0]?.sondagesAppel,
                marketingAppel: data?.data[0]?.marketingAppel,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);
    console.log(data);
    const handleNotif = e => {
        setNotif({ ...notif, [e.target.name]: e.target.checked });
    };
    const handleSelectAllCom = () => {
        setNotif({
            notificationSms: true,
            notificationCourriel: true,
            notificationAppel: true,
            facturationSms: true,
            facturationCourriel: true,
            facturationAppel: true,
            sondagesCourriel: true,
            sondagesAppel: true,
            marketingAppel: true,
        });
    };

    const handleDeselectAllCom = () => {
        setNotif({
            notificationSms: false,
            notificationCourriel: false,
            notificationAppel: false,
            facturationSms: false,
            facturationCourriel: false,
            facturationAppel: false,
            sondagesCourriel: false,
            sondagesAppel: false,
            marketingAppel: false,
        });
    };

    const handleSave = () => {
        addNotifications({ userId: user?._id, data: notif }).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };
    return (
        <TabContentContainer variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
            <TableContainer>
                <TableComponent variants={titleVariants} isDataTable={+false}>
                    <thead>
                        <tr>
                            <th width={"200px"}>NOTIFICATION</th>
                            <th width={"200px"}>SMS</th>
                            <th width={"200px"}>Email</th>
                            <th width={"200px"}>Call</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Appointment</td>
                            <td>
                                <FormCheckField key={`notificationSms`} className="mb-3"> <Form.Check type="checkbox" name="notificationSms" id="notification-sms" checked={notif?.notificationSms} onChange={handleNotif} /> </FormCheckField>
                            </td>
                            <td>
                                <FormCheckField key="notificationCourriel" className="mb-3"> <Form.Check type="checkbox" name="notificationCourriel" id="notification-courriel" checked={notif?.notificationCourriel} onChange={handleNotif} /> </FormCheckField>
                            </td>
                            <td>
                                <FormCheckField key="notificationAppel" className="mb-3"> <Form.Check type="checkbox" name="notificationAppel" id="notificationAppel" checked={notif?.notificationAppel} onChange={handleNotif} /> </FormCheckField>

                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Billing</td>
                            <td>
                                <FormCheckField key="facturationSms" className="mb-3"> <Form.Check type="checkbox" name="facturationSms" id="notification-sms" checked={notif?.facturationSms} onChange={handleNotif} /> </FormCheckField>
                            </td>
                            <td>
                                <FormCheckField key="facturationCourriel" className="mb-3"> <Form.Check type="checkbox" name="facturationCourriel" id="facturationCourriel" checked={notif?.facturationCourriel} onChange={handleNotif} /> </FormCheckField>
                            </td>
                            <td>
                                <FormCheckField key="facturationAppel" className="mb-3"> <Form.Check type="checkbox" name="facturationAppel" id="notification-appel" checked={notif?.facturationAppel} onChange={handleNotif} /> </FormCheckField>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Surveys</td>
                            <td></td>
                            <td>
                                <FormCheckField key="sondagesCourriel" className="mb-3"> <Form.Check type="checkbox" id="sondagesCourriel" name="sondagesCourriel" checked={notif?.sondagesCourriel} onChange={handleNotif} /> </FormCheckField>
                            </td>
                            <td>
                                <FormCheckField key="sondagesAppel" className="mb-3"> <Form.Check type="checkbox" name="sondagesAppel" id="notification-appel" checked={notif?.sondagesAppel} onChange={handleNotif} /> </FormCheckField>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Marketing</td>
                            <td></td>
                            <td>
                                <FormCheckField key={`marketingAppel`} className="mb-3">
                                    <Form.Check type="checkbox" id="marketingAppel" name="marketingAppel" checked={notif?.marketingAppel} onChange={handleNotif} />
                                </FormCheckField>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </TableComponent>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <Button onClick={handleSelectAllCom} className="btn btn-success d-block me-3">          Select All      </Button>
                        <Button onClick={handleDeselectAllCom} className="btn btn-success d-block ms-auto">     Deselect All    </Button>
                    </div>
                    <div>
                        <Button onClick={handleSave} className="btn btn-success d-block ms-auto">           Save Preferences    </Button>
                    </div>
                </div>
            </TableContainer>
        </TabContentContainer>
    );
};

export default SetNotifications;
