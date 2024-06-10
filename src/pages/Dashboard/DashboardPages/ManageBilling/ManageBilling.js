/* eslint-disable no-unused-vars */
import { UserContext } from "../../../../App";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useSignupMutation } from "../../../../services/userApi";
import { useGetAllBillingsQuery, useCreateInvoiceMutation, useUpdateInvoiceMutation } from "../../../../services/billingApi";
import { useGetAllUsersQuery } from "../../../../services/userApi";
import { useGetAllCoursesQuery } from "../../../../services/courseApi";
import { useGetAllInternetsQuery } from "../../../../services/internetApi";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./ManageBilling.css";
import {
    FormButton,
    FormCheckField,
    FormControlField,
    FormLabelText,
    ShowHidePassField,
    InvoiceForm,
} from "../../../Auth/SignUp/signUpStyle";
import { staggerVariants, tileVariants } from "../../../../utils/FmVariants";

import { IoCloseSharp } from "react-icons/io5";
import { SVGImages } from "../../../../config/images";
import Select from "react-select";

const ManageBilling = ({ show, handleClose }) => {
    const { data: billingList } = useGetAllBillingsQuery();
    const { data: userLists } = useGetAllUsersQuery();
    const { data: couresLists } = useGetAllCoursesQuery();
    const { data: internetLists } = useGetAllInternetsQuery();
    const [billList, setBillList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [couresList, setCouresList] = useState([]);
    const [internetList, setInternetList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [finalTotal, setFinalTotal] = useState(0);
    const [createInvoice] = useCreateInvoiceMutation();
    const [updateInvoice] = useUpdateInvoiceMutation();

    const columns = [
        {
            dataField: "_id",
            text: "ID",
            sort: true,
            formatter: cell => {
                return <span>{cell?.toString().slice(cell.length - 7, cell.length)}</span>;
            },
        },
        {
            dataField: "invoiceNumber",
            text: "InvNumber",
            sort: true,
        },
        {
            dataField: "fullname",
            text: "Member Full Name",
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: "fullAddress",
            text: "Billing Address",
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: "date",
            text: "Create-Date",
            sort: true,
            formatter: cell => {
                return <span>{moment(cell).format("YYYY-MM-DD")}</span>;
            },
        },
        {
            dataField: "dueDate",
            text: "Due-Date",
            sort: true,
            formatter: cell => {
                return <span>{moment(cell).format("YYYY-MM-DD")}</span>;
            },
        },
        {
            dataField: "services",
            text: "Services",
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: "totalPrice",
            text: "Amount",
            sort: true,
            formatter: cell => {
                return <span>{cell?.toFixed(2)}</span>;
            },
        },
        {
            dataField: "payment",
            text: "Payment",
            sort: true,
            formatter: cell => {
                return <span>{cell?.toFixed(2)}</span>;
            },
        },
        {
            dataField: "balance",
            text: "Bal.",
            sort: true,
            formatter: cell => {
                return <span>{cell?.toFixed(2)}</span>;
            },
        },
    ];

    const [createModal, setCreateModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [error, setError] = useState("");
    const [verifCaptcha, setverifCaptcha] = useState(false);
    const [phone, setPhone] = useState("");
    const [subscribe, setSubscribe] = useState(false);
    const [error1, setError1] = useState(false);
    const [errorPayment, setErrorPayment] = useState(false);
    const [remainingTotal, setRemainingTotal] = useState(0);
    const [formData, setFormData] = useState({
        invoiceNumber: "INV",
        member: "",
        createDate: new Date().toISOString(),
        dueDate: "",
        payment: "",
    });
    const [subMainList, setSubMainList] = useState([
        {
            value: "Learning",
            label: "Learning",
        },
        {
            value: "Internet",
            label: "Internet",
        },
        // {
        //     value: 'AutoParts',
        //     label: 'AutoParts',
        // }
    ]);
    const [formArray, setFormArray] = useState([]);

    const handleInputChange = (field, event) => {
        if (field === "member") {
            const tempObject = userLists?.data.find(item => item._id === event.value);
            const newValue = {
                value: tempObject._id,
                label: tempObject.firstName + " " + tempObject.lastName,
            };
            setFormData({
                ...formData,
                member: newValue,
            });
        } else if (field === "dueDate") {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        } else if (field === "payment") {
            if (isEdit) {
                if (remainingTotal < Number(event.target.value)) {
                    setErrorPayment(true);
                } else {
                    setErrorPayment(false);
                }
            } else {
                if (finalTotal < Number(event.target.value)) {
                    setErrorPayment(true);
                } else {
                    setErrorPayment(false);
                }
            }
            setFormData({
                ...formData,
                payment: event.target.value,
            });
        }
    };

    const getBalance = data => {
        if (isEdit) {
            return (remainingTotal - data).toFixed(2);
        } else {
            return (finalTotal - data).toFixed(2);
        }
    };

    const handleSubmitData = () => {
        if (!errorPayment) {
            if (formData.member && formData.dueDate) {
                const serviceValues = formArray
                    .map(item => (item.service && item.service.value ? item.service.value : null))
                    .filter(value => value);
                if (serviceValues.length === formArray.length) {
                    setError("");
                    const tempArr = formArray.map(item => {
                        return {
                            itemType: item.serviceMain.value,
                            item: item.service.value,
                        };
                    });
                    const data = {
                        invoiceNumber: formData.invoiceNumber,
                        user: formData.member.value,
                        totalPrice: finalTotal,
                        date: formData.createDate,
                        dueDate: formData.dueDate,
                        items: tempArr,
                        payment: Number(formData.payment),
                        balance: getBalance(Number(formData.payment)),
                        status: getStatus(Number(formData.payment)),
                    };
                    if (isEdit) {
                        updateInvoice({
                            id: selectedId,
                            data: data,
                        }).then(res => {
                            if (res?.data?.status) {
                                toast.success(res?.data?.message);
                                setError("");
                                setCreateModal(false);
                            } else {
                                toast.error(res?.data?.message);
                            }
                        });
                    } else {
                        createInvoice(data).then(res => {
                            if (res?.data?.status) {
                                toast.success(res?.data?.message);
                                setError("");
                                setCreateModal(false);
                            } else {
                                toast.error(res?.data?.message);
                            }
                        });
                    }
                } else {
                    setError("Please fill out the required information!");
                }
            } else {
                setError("Please fill out the required information!");
            }
        } else {
            if (isEdit) {
                setError(` You cannot pay more than your remaining amount of ${remainingTotal}.`);
            } else {
                setError(` You cannot pay more than your final amount of ${finalTotal}.`);
            }
        }
    };

    const handleRowSelect = (row, isSelect, rowIndex, e) => {
        if (isSelect) {
            setIsEdit(true);
            setSelectedId(row?._id);

            const tempUser = userLists?.data.find(item => item._id === row.user);
            const tempMember = {
                value: tempUser._id,
                label: tempUser.firstName + " " + tempUser.lastName,
            };
            const newData = {
                invoiceNumber: row.invoiceNumber,
                member: tempMember,
                createDate: row.date,
                dueDate: row.dueDate.split("T")[0],
                payment: '',
            };
            setFormData(newData);
            setRemainingTotal(row.balance);

            const newRecord = [];
            row.serviceList.forEach(service => {
                const submain = subMainList.find(subMain => subMain.value === service.itemType);
                let tempObject;
                let newValue;
                if (submain.value === "Internet") {
                    tempObject = internetLists?.data.find(item => item._id === service.item);
                    newValue = {
                        value: tempObject._id,
                        label: tempObject.serviceCode,
                    };
                } else if (submain.value === "Learning") {
                    tempObject = couresLists?.data.find(item => item._id === service.item);
                    newValue = {
                        value: tempObject._id,
                        label: tempObject.serviceCode,
                    };
                }

                const newServices = {
                    serviceMain: submain,
                    service: newValue,
                    amount: Number(tempObject.price),
                    tps: Number(getTaxTPS(tempObject.price)),
                    tvq: Number(getTaxTVQ(tempObject.price)),
                    total: Number(getTotalAmount(tempObject.price)),
                };

                newRecord.push(newServices);
            });

            setFormArray(newRecord);
            const allTotal = newRecord.reduce((acc, item) => acc + item.total, 0);
            setFinalTotal(Number(allTotal).toFixed(2));
            setCreateModal(true);
        }
    };

    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        onSelect: handleRowSelect,
    };

    const getTotal = (price, qnty) => {
        return price * qnty;
    };

    const fullname = user => {
        if (user !== undefined) {
            return user[0].firstName + " " + user[0].lastName;
        } else {
            return "";
        }
    };

    const fullAddress = user => {
        if (user !== undefined) {
            return user[0].address + ", " + user[0].city;
        } else {
            return "";
        }
    };

    const getTax = amount => {
        const tpsRate = 0.05; // TPS rate (5%)
        const tvqRate = 0.09975; // TVQ rate (9.975%)

        // Calculate taxes
        const tps = amount * tpsRate;
        const tvq = amount * tvqRate;

        return tps + tvq;
    };

    const getTaxTPS = amount => {
        const tpsRate = 0.05; // TPS rate (5%)
        const tps = amount * tpsRate;
        return parseFloat(tps).toFixed(2);
    };

    const getTaxTVQ = amount => {
        const tvqRate = 0.09975; // TVQ rate (9.975%)
        const tvq = amount * tvqRate;
        return parseFloat(tvq).toFixed(2);
    };

    const getTotalAmount = amount => {
        const tax = getTax(amount);
        const amounts = parseFloat(amount);
        return parseFloat(amounts + tax).toFixed(2);
    };

    const getCommaText = uniqueItems => {
        if (uniqueItems.length > 1) {
            const result = uniqueItems.join(", ");
            return result;
        } else {
            const result = uniqueItems[0];
            return result;
        }
    };

    const getLastInvoiceNumber = invoices => {
        if (invoices.length === 0) return "INV000";

        const lastInvoice = invoices.reduce((prev, current) => {
            const prevNumber = parseInt(prev.invoiceNumber.replace("INV", ""), 10);
            const currentNumber = parseInt(current.invoiceNumber.replace("INV", ""), 10);
            return currentNumber > prevNumber ? current : prev;
        });

        return lastInvoice;
    };

    const generateNextInvoiceNumber = lastInvoiceNumber => {
        const numericPart = parseInt(lastInvoiceNumber.invoiceNumber.replace("INV", ""), 10);
        const nextNumericPart = numericPart + 1;
        const formattedNumber = nextNumericPart.toString().padStart(3, "0");
        return `INV${formattedNumber}`;
    };

    const formatDate = isoString => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const year = date.getFullYear();
        return `${year}-${month}-${day}`; // Format for input type date
    };

    const handleAddMore = () => {
        setFormArray([
            ...formArray,
            {
                serviceMain: "",
                service: "",
                amount: "",
                tps: "",
                tvq: "",
                total: "",
            },
        ]);
    };

    const handleFormArrayChange = (index, field, value) => {
        const newFormArray = formArray.slice();
        if (field === "serviceMain") {
            if (value === "Internet") {
                setServiceList(internetList);
            } else if (value === "Learning") {
                setServiceList(couresList);
            }
            const newValue = {
                value: value,
                label: value,
            };
            newFormArray[index][field] = newValue;
        } else if (field === "service") {
            if (newFormArray[index]["serviceMain"].value === "Internet") {
                const tempObject = internetLists?.data.find(item => item._id === value);
                const newValue = {
                    value: tempObject._id,
                    label: tempObject.serviceCode,
                };
                newFormArray[index][field] = newValue;
                newFormArray[index]["amount"] = Number(tempObject.price);
                newFormArray[index]["tps"] = Number(getTaxTPS(tempObject.price));
                newFormArray[index]["tvq"] = Number(getTaxTVQ(tempObject.price));
                newFormArray[index]["total"] = Number(getTotalAmount(tempObject.price));
            } else if (newFormArray[index]["serviceMain"].value === "Learning") {
                const tempObject = couresLists?.data.find(item => item._id === value);
                const newValue = {
                    value: tempObject._id,
                    label: tempObject.serviceCode,
                };
                newFormArray[index][field] = newValue;
                newFormArray[index]["amount"] = Number(tempObject.price);
                newFormArray[index]["tps"] = Number(getTaxTPS(tempObject.price));
                newFormArray[index]["tvq"] = Number(getTaxTVQ(tempObject.price));
                newFormArray[index]["total"] = Number(getTotalAmount(tempObject.price));
            }
        }

        const allTotal = newFormArray.reduce((acc, item) => acc + item.total, 0);
        setFinalTotal(Number(allTotal).toFixed(2));
        setFormArray(newFormArray);
    };

    const removeFormField = index => {
        setFormArray(formArray.filter((_, i) => i !== index));
    };

    const getStatus = data => {
        if (isEdit) {
            const bal = (remainingTotal - data).toFixed(2);
            if (bal > 0) {
                return "Partial";
            } else {
                return "Paid";
            }
        } else {
            const bal = (finalTotal - data).toFixed(2);
            if (bal === finalTotal) {
                return "Submitted";
            } else if (bal > 0) {
                return "Partial";
            } else {
                return "Paid";
            }
        }
    };

    const openInvoicePopup = () => {
        const lastInvoiceNumber = getLastInvoiceNumber(billingList.data);
        const nextInvoiceNumber = generateNextInvoiceNumber(lastInvoiceNumber);
        setFormData({
            invoiceNumber: nextInvoiceNumber,
            member: "",
            createDate: new Date().toISOString(),
            dueDate: "",
            payment: "",
        });
        setFinalTotal(0);
        setFormArray([
            {
                serviceMain: "",
                service: "",
                amount: "",
                tps: "",
                tvq: "",
                total: "",
            },
        ]);
        setCreateModal(true);
        setIsEdit(false);
    };

    const getPayment = data => {
        if (data.balance === 0.00) {
            return data.totalPrice
        } else {
            return data.totalPrice - data.balance
        }
    };

    useEffect(() => {
        if (billingList) {
            const newBillingList = [];

            billingList.data.forEach(billing => {
                const service = [];
                billing.items.forEach(item => {
                    service.push(item?.itemType);
                });
                const uniqueItems = [...new Set(service)];
                newBillingList.push({
                    _id: billing._id,
                    invoiceNumber: billing.invoiceNumber,
                    date: billing.date,
                    totalPrice: billing.totalPrice,
                    fullAddress: fullAddress(billing.users),
                    fullname: fullname(billing.users),
                    services: getCommaText(uniqueItems),
                    status: billing.status,
                    payment: getPayment(billing),
                    balance: billing.balance,
                    dueDate: billing.dueDate,
                    user: billing.user,
                    serviceList: billing.items,
                });
            });
            setBillList(newBillingList);
        }

        if (userLists && userLists?.data?.length) {
            const tempArr = userLists?.data.map(item => {
                return {
                    value: item._id,
                    label: item.firstName + " " + item.lastName,
                };
            });
            setUserList(tempArr);
        }

        if (couresLists && couresLists?.data?.length) {
            const tempArr = couresLists?.data.map(item => {
                return {
                    value: item._id,
                    label: item.serviceCode,
                };
            });
            setCouresList(tempArr);
        }

        if (internetLists && internetLists?.data?.length) {
            const tempArr = internetLists?.data.map(item => {
                return {
                    value: item._id,
                    label: item.serviceCode,
                };
            });
            setInternetList(tempArr);
        }

        if (formArray.length > 0) {
            const allTotal = formArray.reduce((acc, item) => acc + item.total, 0);
            setFinalTotal(Number(allTotal).toFixed(2));
        }
    }, [billingList, userLists, couresLists, internetLists, formArray]);

    return (
        <div>
            {/* table start  */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-2 mb-3">
                <h4>Manage Billing</h4>
                <Button onClick={() => openInvoicePopup()} className="btn btn-primary">
                    New Invoice
                </Button>
            </div>
            {/* table */}
            {billList?.length > 0 && (
                <div className="table-responsive">
                    <BootstrapTable
                        bootstrap4
                        keyField="_id"
                        data={billList}
                        columns={columns}
                        defaultSortDirection="asc"
                        striped
                        hover
                        condensed
                        responsive
                        scrollable
                        pagination={paginationFactory()}
                        selectRow={selectRow}
                        noDataIndication="No data found!"
                        filter={filterFactory()}
                        filterPosition="top"
                    />
                </div>
            )}
            {/* <ModalBody show={show} handleClose={handleClose} /> */}

            {/* Create User */}
            <Modal show={createModal} onHide={() => setCreateModal(false)} backdrop="static" keyboard={false}>
                <div className="create-user">
                    <IoCloseSharp onClick={() => setCreateModal(false)} className="close-btn-icon" />
                    <h3 className="text-center mb-3">{isEdit ? "Edit Invoice" : "Create Invoice"}</h3>
                    <InvoiceForm
                        variants={staggerVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="InvoiceNumber" className=" form-label">
                                    Invoice Number
                                </label>
                                <input type="text" placeholder="Invoice Number" readOnly value={formData.invoiceNumber} />
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="Member" className=" form-label">
                                    Member
                                </label>
                                <Select
                                    id="Member"
                                    className="mb-2"
                                    options={userList}
                                    value={formData.member}
                                    onChange={e => handleInputChange("member", e)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="createDate" className=" form-label">
                                    Create Date
                                </label>
                                <input type="date" value={formatDate(formData.createDate)} readOnly placeholder="Create Date" />
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="dueDate" className=" form-label">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    placeholder="Due Date"
                                    min={formatDate(formData.createDate)}
                                    required
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={e => handleInputChange("dueDate", e)}
                                />
                            </div>
                        </div>

                        {formArray.map((item, index) => (
                            <div key={index} className="form-array-border">
                                <div className="service-remove">
                                    <IoCloseSharp onClick={() => removeFormField(index)} className="close-btn" />
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor={`serviceMain-${index}`} className=" form-label">
                                            Main Service
                                        </label>
                                        <Select
                                            id={`serviceMain-${index}`}
                                            className="mb-2"
                                            options={subMainList}
                                            value={item.serviceMain}
                                            onChange={e => handleFormArrayChange(index, "serviceMain", e?.value)}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor={`service-${index}`} className=" form-label">
                                            Service
                                        </label>
                                        <Select
                                            id={`service-${index}`}
                                            className="mb-2"
                                            options={serviceList}
                                            value={item.service}
                                            onChange={e => handleFormArrayChange(index, "service", e?.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-3">
                                        <label htmlFor={`amount-${index}`} className=" form-label">
                                            Amount
                                        </label>
                                        <input type="text" value={item.amount} readOnly placeholder="amount" />
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <label htmlFor={`tps-${index}`} className=" form-label">
                                            TPS
                                        </label>
                                        <input type="text" value={item.tps} readOnly placeholder="tps" />
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <label htmlFor={`tvq-${index}`} className=" form-label">
                                            TVQ
                                        </label>
                                        <input type="text" value={item.tvq} readOnly placeholder="tvq" />
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <label htmlFor={`total-${index}`} className=" form-label">
                                            Total
                                        </label>
                                        <input type="text" value={item.total} readOnly placeholder="total" />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button type="button" className="mt-3 mb-3" onClick={handleAddMore}>
                            + Add More Service
                        </Button>

                        {isEdit ? (
                            <div className="row">
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="finaltotal" className=" form-label">
                                        Total Amount
                                    </label>
                                    <input type="text" value={finalTotal} readOnly placeholder="Final Total" />
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="remainingtotal" className=" form-label">
                                        Remaining Balance
                                    </label>
                                    <input type="text" value={remainingTotal} readOnly placeholder="Remaining Total" />
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="finalPayment" className=" form-label">
                                        Payment
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.payment}
                                        placeholder="Final Payment"
                                        onChange={e => handleInputChange("payment", e)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <label htmlFor="finaltotal" className=" form-label">
                                        Final Total
                                    </label>
                                    <input type="text" value={finalTotal} readOnly placeholder="Final Total" />
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <label htmlFor="finalPayment" className=" form-label">
                                        Final Payment
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.payment}
                                        placeholder="Final Payment"
                                        onChange={e => handleInputChange("payment", e)}
                                    />
                                </div>
                            </div>
                        )}

                        <Row>
                            <Col md={12}>
                                <div className="d-flex flex-column align-items-center">
                                    {error && <p className="error-message">{error}</p>}
                                </div>

                                {verifCaptcha ? (
                                    <FormButton variants={tileVariants} variant="primary" className="mt-3 " onClick={handleSubmitData}>
                                        <span>Create</span>
                                    </FormButton>
                                ) : (
                                    <FormButton
                                        variants={tileVariants}
                                        variant="primary"
                                        className="mt-3"
                                        onClick={() => setError("Please fill the captcha!")}
                                    >
                                        <span>Create</span>
                                    </FormButton>
                                )}
                            </Col>
                        </Row>
                    </InvoiceForm>
                </div>
            </Modal>
        </div>
    );
};

export default ManageBilling;
