import { useState }                                     from "react";
import { toast }                                        from "react-toastify";
import { Button, Form }                                 from "react-bootstrap";
import { TabContentContainer }                          from "../../Tabs/tabContentStyle";
import { useGetAllCarPartsQuery }                       from "../../../services/carPartsApi";
import { useGetAllCarsQuery, useRequestQuoteMutation }  from "../../../services/carApi";
import { staggerVariants }                              from "../../../utils/FmVariants";

const SubsPartsOrders = ({ user }) => {
    const [selectedParts, setSelectedParts] = useState([]);
    const [carPartsCheck, setCarPartsCheck] = useState([]);

    const [selectedSystem, setSelectedSystem] = useState({
        system: "Select System"
    });
    const [selectedSubSystem, setSelectedSubSystem] = useState("Select Sub-System");
    const [selectedItem, setSelectedItem] = useState({
        partName: "Select Car Part"
    });
    const [additional, setAdditional] = useState("");
    const [vin, setVin] = useState("");
    const [brand, setBrand] = useState("Select Brand");
    const [brandObj, setBrandObj] = useState({});
    const [model, setModel] = useState("Select Model");
    const [selectedItemString, setSelectedItemString] = useState("");
    const [items, setItems] = useState([]);
    const [subSystems, setSubSystems] = useState([]);
    const [selected, setSelected] = useState("");
    const { data } = useGetAllCarPartsQuery();
    const { data: carsData } = useGetAllCarsQuery();
    const currentYear = new Date().getFullYear();
    const [requestQuote] = useRequestQuoteMutation();
    const years = Array.from({ length: currentYear - 1980 + 1 }, (_, index) => 1980 + index);

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleYearChange = event => {
        setSelectedYear(parseInt(event.target.value));
    };
    const handleViewCategory = e => {
        const value = e.target.value;
        setSelectedSystem(JSON.parse(value));
        setSelected(value);
        const filteredSystem = data?.data?.filter(d => d?.system === JSON.parse(value)?.system);
        const keysArray = filteredSystem[0]?.subSystems?.map(obj => Object.keys(obj)[0]);
        setSubSystems(keysArray);
        setSelectedSubSystem("Select Sub-System");
        setSelectedItemString("");
    };

    const handleShowItems = e => {
        const value = e.target.value;
        setSelectedSubSystem(value);
        if (value !== "Select Sub-System") {
            setItems(selectedSystem?.subSystems[subSystems.indexOf(value)][value]);
        }
        setSelectedItemString("");
        setSelectedItem({
            partName: "Select Car Part"
        });
    };

    const handleSelectedItem = e => {
        const value = e.target.value;
        setSelectedItem(JSON.parse(value));
        setSelectedItemString(value);
    };

    const handleSelectCarParts = item => {
        const data = {
            system: selectedSystem?.system,
            subSystem: selectedSubSystem,
            partName: item.partName,
            model: model,
            brand: brandObj?.car,
            year: selectedYear,
            vin: vin
        };
        const foundObject = selectedParts.find(
            obj =>
                obj.system === data.system &&
                obj.subSystem === data.subSystem &&
                obj.partName === data.partName &&
                obj.brand === data.brand &&
                obj.model === data.model &&
                obj.year === data.year &&
                obj.vin === data.vin
        );

        if (foundObject) {
            toast.error("This Part has been already added!");
        } else {
            setCarPartsCheck([...carPartsCheck, data]);
            setSelectedParts([
                ...selectedParts,
                {
                    ...data,
                    quantity: 1,
                    additional: additional,
                    partImage: item?.partImage
                }
            ]);
        }
        setSelectedItemString("");
        setSelectedItem({
            partName: "Select Car Part"
        });
        setSelected(JSON.stringify({ system: "Select System" }));
    };

    const handleRemoveCarParts = data => {
        console.log("data", data);
        const filtered = selectedParts?.filter(obj => obj !== data);
        setSelectedParts(filtered);
    };

    const handleBrandChange = e => {
        const value = e.target.value;
        if (value === "Select Brand") {
            setBrand(value);
        } else {
            setBrand(value);
            setBrandObj(JSON.parse(value));
        }
    };

    const handleValue = (index, value) => {
        selectedParts[index].quantity = value;
        setSelectedParts([...selectedParts]);
    };

    const handleRequestQuote = () => {
        if (brand === "" || brand === "Select Brand") {
            toast.error("Please select a brand!");
        } else {
            if (model === "" || model === "Select Model") {
                toast.error("Please select a Model!");
            } else {
                if (
                    selectedSystem.system !== "Select System" &&
                    selectedSubSystem !== "Select Sub-System" &&
                    selectedParts.length > 0 &&
                    selectedParts[0]?.quantity > 0
                ) {
                    requestQuote({ userEmail: user?.email, userId: user?._id, carInfo: selectedParts }).then(res => {
                        if (res?.data?.status) {
                            toast.success(res?.data?.message);
                            setSelectedItemString("");
                            setSelectedItem({
                                partName: "Select Car Part"
                            });
                            setSelectedSystem({
                                system: "Select System"
                            });
                            setSelectedSystem({ system: "Select System" });
                            setSelectedSubSystem("Select Sub-System");
                            setCarPartsCheck([]);
                            setSelectedParts([]);
                            setBrand("Select Brand");
                        } else {
                            toast.error(res?.data?.message);
                        }
                    });
                } else {
                    toast.error("You must Select at least one car part!");
                }
            }
        }
    };

    console.log(brand);
    return (
        <TabContentContainer variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
            <div className="video-input-box">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 pb-0">Select Part</h5>
                    <button onClick={handleRequestQuote} className="btn btn-primary d-block">
                        Request Quotes
                    </button>
                </div>
                <hr className="mt-1" />

                <div className="row">
                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-4">
                        <Form.Select
                            id="year"
                            value={selectedYear}
                            onChange={handleYearChange}
                            name="year"
                            aria-label="Default select example"
                            className="shadow-none"
                        >
                            <option value={JSON.stringify({ system: "Select System" })}>Select System</option>
                            {years.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-4">
                        <Form.Select
                            id="brand"
                            value={brand}
                            onChange={handleBrandChange}
                            name="brand"
                            aria-label="Default select example"
                            className="shadow-none"
                        >
                            <option value={"Select Brand"}>Select Brand</option>
                            {carsData?.data?.map(car => (
                                <option key={car?._id} value={JSON.stringify(car)}>
                                    {car.car}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-4">
                        <Form.Select
                            id="model"
                            value={model}
                            onChange={e => setModel(e.target.value)}
                            name="model"
                            aria-label="Default select example"
                            className="shadow-none"
                        >
                            <option value={"Select Model"}>Select Model</option>
                            {brandObj?.models?.map(model => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-6">
                        <Form.Label htmlFor="additional">Additional Info</Form.Label>
                        <Form.Control
                            type="text"
                            id="additional"
                            aria-describedby="additional"
                            value={additional}
                            onChange={e => setAdditional(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-6">
                        <Form.Label htmlFor="vin">Vehicle VIN</Form.Label>
                        <Form.Control type="text" id="vin" aria-describedby="vin" value={vin} onChange={e => setVin(e.target.value)} />
                    </div>
                </div>

                {brand !== "" && brand !== "Select Brand" && model !== "" && model !== "Select Model" && (
                    <>
                        <h5 className="mb-0 pb-0">Select Part</h5>
                        <hr />
                        <div className="row">
                            <div className="col-12 col-md-8 col-lg-8">
                                <div className="input-wrapper mb-3">
                                    <label htmlFor="text">View Systems</label>
                                    <Form.Select
                                        onChange={handleViewCategory}
                                        value={selected}
                                        name="selectedSystem"
                                        aria-label="Default select example"
                                        className="shadow-none"
                                    >
                                        <option value={JSON.stringify({ system: "Select System" })}>Select System</option>
                                        {data?.data?.map(d => (
                                            <option key={d?._id} value={JSON.stringify(d)}>
                                                {d?.system}
                                            </option>
                                        ))}
                                    </Form.Select>

                                    {selected !== JSON.stringify({ system: "Select System" }) && (
                                        <>
                                            <label className="mt-3" htmlFor="text">
                                                View Sub-Systems
                                            </label>
                                            <Form.Select
                                                onChange={handleShowItems}
                                                value={selectedSubSystem}
                                                name="selectedSystem"
                                                aria-label="Default select example"
                                                className="shadow-none"
                                            >
                                                <option value={"Select Sub-System"}>Select Sub-System</option>
                                                {subSystems?.map(d => (
                                                    <option key={d} value={d}>
                                                        {d}
                                                    </option>
                                                ))}
                                            </Form.Select>

                                            {selectedSubSystem !== "Select Sub-System" && (
                                                <>
                                                    <label className="mt-3" htmlFor="text">
                                                        View Car Parts
                                                    </label>
                                                    <Form.Select
                                                        onChange={handleSelectedItem}
                                                        value={selectedItemString}
                                                        name="selectedSystem"
                                                        aria-label="Default select example"
                                                        className="shadow-none"
                                                    >
                                                        <option value={JSON.stringify({ partName: "Select Car Part" })}>
                                                            Select Car Parts
                                                        </option>
                                                        {items?.map(d => (
                                                            <option key={d} value={JSON.stringify(d)}>
                                                                {d?.partName}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            {selectedItemString && (
                                <div className="col-12 col-md-4 col-lg-4 d-flex flex-column justify-content-center">
                                    <button onClick={() => handleSelectCarParts(selectedItem)} className="btn btn-primary mt-3">
                                        Add
                                    </button>
                                    <div className="sub-cat-div w-100 mt-3">
                                        {selectedItem?.partName !== "Select Car Part" ? (
                                            <>
                                                <div className="car-part-style w-100">
                                                    {selectedItem?.partImage && (
                                                        <img src={selectedItem?.partImage} height={"100px"} width={"100%"} alt="part" />
                                                    )}
                                                    <div className="p-2 pb-0">
                                                        <p className="carParts-name">{selectedItem?.partName}</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-danger">
                                                    <small>No Car Parts selected!</small>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <h5 className="mb-0 pb-0">Parts</h5>
                        <hr />
                        <div className="row">
                            {selectedParts?.map((s, i) => (
                                <div key={i} className="col-12 col-md-5 col-lg-5 mx-2 my-2 card-style-part">
                                    <div className="d-flex justify-content between align-items-center gap-2">
                                        <div className="">
                                            <p className="mb-0 fw-bold">Part #{i + 1}</p>
                                            <p className="partName-style">{s.partName}</p>
                                        </div>
                                        <div>
                                            <p className="mb-0 fw-bold">Quantity</p>
                                            <input
                                                onChange={e => handleValue(i, e.target.value)}
                                                value={s.quantity}
                                                className="quantity-style"
                                                placeholder="Qt"
                                            />
                                        </div>
                                    </div>
                                    <div>{s?.partImage && <img height={"170px"} src={s?.partImage} alt="part" />}</div>
                                    <Button
                                        className="danger-btn d-block mx-auto mt-2 mb-2"
                                        variant="danger"
                                        onClick={() => handleRemoveCarParts(s)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </TabContentContainer>
    );
};

export default SubsPartsOrders;
