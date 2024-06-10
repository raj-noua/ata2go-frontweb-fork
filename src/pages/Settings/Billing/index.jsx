import { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import "./billing.css";
import { TabContentContainer, TableContainer } from "../../Tabs/tabContentStyle";
import TableComponent from "../../../components/UI/TableComponent";
import { staggerVariants, titleVariants } from "../../../utils/FmVariants";
import { useGetAllBillingsQuery } from "../../../services/billingApi";
import { UserContext } from "../../../App";

const SetBilling = () => {
    const { data: billingList } = useGetAllBillingsQuery();
    const [show, setShow] = useState(false);
    const [billDetail, setBillDetail] = useState([]);
    const [billList, setBillList] = useState([]);
    const { user } = useContext(UserContext);

    const options = {
        filename: "ata2go-invoice.pdf",
        method: "save",
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.EXTREME,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.SMALL,
            // default is 'A4'
            format: "letter",
            // default is 'portrait'
            orientation: "landscape",
        },
        canvas: {
            // default is 'image/jpeg' for better size performance
            mimeType: "image/jpeg",
            qualityRatio: 1,
        },
        // Customize any value passed to the jsPDF instance and html2canvas
        // function. You probably will not need this and things can break,
        // so use with caution.
        overrides: {
            // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
            pdf: {
                compress: true,
            },
            // see https://html2canvas.hertzen.com/configuration for more options
            canvas: {
                useCORS: true,
            },
        },
    };
    const getTargetElement = () => document.getElementById("container");

    const downloadPdf = () => generatePDF(getTargetElement, options);

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
        console.log("Address", user);
        if (user !== undefined) {
            return user[0].address + ", " + user[0].city;
        } else {
            return "";
        }
    };

    const getCompanyName = user => {
        if (user !== undefined) {
            return user[0].companyName;
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

    useEffect(() => {
        // Some effect logic
        if (billingList) {
            const newBillingList = [];

            billingList.data.forEach(billing => {
                const product = [];
                billing.items.forEach(item => {
                    if (item?.itemType === "courses") {
                        billing?.courses?.forEach(courses => {
                            if (courses._id === item.item) {
                                product.push({
                                    service: courses.courseName + " - " + courses.courseLevel,
                                    price: courses?.price,
                                    quantity: item.quantity,
                                    total: getTotal(courses?.price, item.quantity),
                                });
                            }
                        });
                    } else {
                        billing?.internets?.forEach(internets => {
                            if (internets._id === item.item) {
                                product.push({
                                    service: internets.uploadSpeed + " Mbps - " + internets.downloadSpeed + " Mbps",
                                    price: internets?.price,
                                    quantity: item.quantity,
                                    total: getTotal(internets?.price, item.quantity),
                                });
                            }
                        });
                    }
                });
                const allTotal = product.reduce((acc, item) => acc + item.total, 0);
                newBillingList.push({
                    invoiceNumber: billing.invoiceNumber,
                    date: billing.date,
                    totalPrice: billing.totalPrice,
                    fullAddress: fullAddress(billing.users),
                    fullname: fullname(billing.users),
                    items: product,
                    subTotal: allTotal,
                    tax: getTax(allTotal),
                    user: billing.user,
                    companyName: getCompanyName(billing.users),
                });
            });
            if (user?.role === "admin") {
                setBillList(newBillingList);
            } else {
                const billList = newBillingList.filter(item => item.user === user?._id);
                setBillList(billList);
            }
        }
    }, [billingList, user]);

    return (
        <>
            <TabContentContainer
                variants={staggerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}>
                <TableContainer>
                    <TableComponent variants={titleVariants} isDataTable={+false}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Invoice Number</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billList?.map((data, i) => (
                                <tr key={i + 1}>
                                    <td>{i < 100 ? `00${i + 1}` : `${i}`}</td>
                                    <td>{data?.invoiceNumber}</td>
                                    <td>
                                        {new Date(data?.date).getDate()}-{new Date(data?.date).getMonth() + 1}-
                                        {new Date(data?.date).getFullYear()}
                                    </td>
                                    <td>${data?.totalPrice?.toFixed(2)}</td>
                                    <td
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setBillDetail(data);
                                            setShow(true);
                                        }}>
                                        View
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </TableComponent>
                </TableContainer>
            </TabContentContainer>

            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>Billing Invoice</Modal.Header>
                <Modal.Body>
                    <div>
                        <button className="button" onClick={downloadPdf}>
                            Download Invoice PDF
                        </button>
                        <div id="container" className="invoice">
                            <h2>Invoice</h2>
                            <div className="invoice-number">
                                <p>Invoice Number: {billDetail?.invoiceNumber}</p>
                            </div>
                            <div className="invoice-personal-details">
                                <div className="personal-row">
                                    <div>
                                        <h6>Full Name</h6>
                                        <span> {billDetail?.fullname} </span>
                                    </div>
                                    <div>
                                        <h6>Client Name</h6>
                                        <span>{billDetail?.companyName}</span>
                                    </div>
                                    <div>
                                        <h6>Billing Date</h6>
                                        <span>
                                            {new Date(billDetail?.date).getDate()}-{new Date(billDetail?.date).getMonth() + 1}-
                                            {new Date(billDetail?.date).getFullYear()}
                                        </span>
                                    </div>
                                </div>
                                <div className="address-personal">
                                    <h6>Address</h6>
                                    <span>{billDetail?.fullAddress}</span>
                                </div>
                            </div>
                            {/* <div className="invoice-detail-fecture">
            <div className="invoice-details">Detail facture</div>
            <div className="invoice-object">
              <h6>Object : </h6>
              <span> Facture : 01/04/2024</span>
            </div>
          </div> */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {billDetail?.items?.map((item, i) => (
                                        <tr key={i + 1}>
                                            <td>{item.service}</td>
                                            <td>${item?.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item?.total}</td>

                                            {/* {item?.itemType === "courses" ? (
                        <>
                          {billDetail?.courses?.map((course, i) => (
                            <>
                              {course._id === item.item && (
                                <>
                                  <td>
                                    {course.courseName} - {course.courseLevel}
                                  </td>
                                  <td>${course?.price}</td>
                                  <td>{item.quantity}</td>
                                  <td>
                                    {getTotal(course?.price, item.quantity)}
                                  </td>
                                </>
                              )}
                            </>
                          ))} 
                        </>
                      ) : (
                        <>
                          {billDetail?.internets?.map((internet, i) => (
                            <>
                              {internet._id === item.item && (
                                <>
                                  <td>
                                    Upload Speed {internet.uploadSpeed}Mbps -
                                    Download Speed {internet.downloadSpeed}Mbps{" "}
                                  </td>
                                  <td>${internet?.price}</td>
                                  <td>{item.quantity}</td>
                                  <td>
                                    {getTotal(internet?.price, item.quantity)}
                                  </td>
                                </>
                              )}
                            </>
                          ))}
                        </>
                      )} */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="invoice-final-total">
                                <div className="label">
                                    Total : <span>{billDetail?.subTotal?.toFixed(2)} $</span>
                                </div>
                                <div className="label">
                                    Taxes (TPS + TVQ) : <span>{billDetail?.tax?.toFixed(2)} $</span>
                                </div>
                                <div className="label">
                                    Total taxes incluses : <span>{billDetail?.totalPrice?.toFixed(2)} $</span>
                                </div>
                            </div>
                            <div className="invoice-footer-address">
                                <p>Bravo Telecom</p>
                                <p>6001 Jean Talon Est</p>
                                <p>Montreal H1S1M5 QC</p>
                                <p>www.bravotelecom.com</p>
                                <p>Tel: (514) 217-4661</p>
                                <p>Fax: (514) 316-4741</p>
                                <br />
                                <p>TPS: 802385153-RT0001</p>
                                <p>TVQ: 1214127225 TQ0001</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SetBilling;
