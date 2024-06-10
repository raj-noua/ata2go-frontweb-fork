import { useCallback, useEffect, useState }             from "react";
import { toast }                                        from "react-toastify";
import { Button, Form }                                 from "react-bootstrap";
import { TabContentContainer }                          from "../../Tabs/tabContentStyle";
import { useGetAllCarPartsQuery }                       from "../../../services/carPartsApi";
import { useGetAllCarsQuery, useRequestQuoteMutation }  from "../../../services/carApi";
import { staggerVariants }                              from "../../../utils/FmVariants";

const SubsPartsOrders = ({ user }) => {
    
    const DFLT_Year = "Select Year";
    const DFLT_Brand = "Select Brand";
    const DFLT_Model = "Select Model";
    const DFLT_System = "Select System";
    const DFLT_SubSystem = "Select Sub-System";
    const DFLT_CarParts = "Select Car Part";

    const currentYear                                   = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1980 + 1 }, (_, index) => 1980 + index);
    const [brand, setBrand]                             = useState(DFLT_Brand);
    const [brandObj, setBrandObj]                       = useState({});
    const [model, setModel]                             = useState(DFLT_Model);
    const [additional, setAdditional]                   = useState("");
    const [vin, setVin]                                 = useState("");
    
    const [selectedYear, setSelectedYear]               = useState(currentYear);
    const [selectedSystem, setSelectedSystem]           = useState({system: DFLT_System});
    const [selectedSubSystem, setSelectedSubSystem]     = useState(DFLT_SubSystem);
    const [selectedItem, setSelectedItem]               = useState({partName: DFLT_CarParts});
    const [selectedItemString, setSelectedItemString]   = useState("");
    const [selectedParts, setSelectedParts]             = useState([]);
    const [carPartsCheck, setCarPartsCheck]             = useState([]);
    
    const [items, setItems]                             = useState([]);
    const [subSystems, setSubSystems]                   = useState([]);
    const [selected, setSelected]                       = useState("");
    const { data }                                      = useGetAllCarPartsQuery();
    const { data: carsData }                            = useGetAllCarsQuery();
    
    const [requestQuote]                                = useRequestQuoteMutation();
    
    
    const handleYearChange = event => {
        setSelectedYear(parseInt(event.target.value));
    };

    const handleBrandChange = e => {
        const value = e.target.value;
        if (value === DFLT_Brand) {
            setBrand(value);
        } else {
            setBrand(value);
            setBrandObj(JSON.parse(value));
        }
    };

    const handleModelChange = e => {
        const value = e.target.value;
        setModel(value);
    }

    const handleViewCategory = e => {
        const value = e.target.value;
        setSelectedSystem(JSON.parse(value));
        setSelected(value);
        const filteredSystem = data?.data?.filter(d => d?.system === JSON.parse(value)?.system);
        const keysArray = filteredSystem[0]?.subSystems?.map(obj => Object.keys(obj)[0]);
        setSubSystems(keysArray);
        setSelectedSubSystem(DFLT_SubSystem);
        setSelectedItemString("");

        // Reinitialize items list taking into account selected parts
        const allItems = filteredSystem[0]?.subSystems.reduce((acc, subSys) => {
            const subSystemName = Object.keys(subSys)[0];
            const parts = subSys[subSystemName].filter(part => 
                !selectedParts.some(selectedPart => selectedPart.partName === part.partName)
            );
            acc[subSystemName] = parts;
            return acc;
        }, {});

        setItems(allItems[DFLT_SubSystem] || []);


    };

    const handleShowItems = useCallback((e) => {
        const value = e.target.value;
        setSelectedSubSystem(value);
        if (value !== DFLT_SubSystem) {
            setItems(selectedSystem?.subSystems[subSystems.indexOf(value)][value].filter(part =>
                !selectedParts.some(selectedPart => selectedPart.partName === part.partName)
            ));
        }
        setSelectedItemString("");
        setSelectedItem({
            partName: DFLT_CarParts
        });
    }, [selectedSystem, subSystems, selectedParts]);

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
            // Remove the selected item from the items list
            setItems(prevItems => prevItems.filter(i => i.partName !== item.partName));


        }
        setSelectedItem({ partName: DFLT_CarParts });
        setSelectedItemString("");
        /* setSelectedSubSystem(DFLT_SubSystem);
        setSelectedSystem({ system: DFLT_System });
        setSelected("");*/
    };

    const handleRemoveCarParts = data => {
        console.log("data", data);
        const filtered = selectedParts?.filter(obj => obj !== data);
        setSelectedParts(filtered);
        // Add the removed item back to the items list
        setItems(prevItems => [...prevItems, data]);
    };



    const handleValue = (index, value) => {
        selectedParts[index].quantity = value;
        setSelectedParts([...selectedParts]);
    };

    const handleRequestQuote = () => {
        if (brand === "" || brand === DFLT_Brand) {
            toast.error("Please select a brand!");
        } else {
            if (model === "" || model === DFLT_Model) {
                toast.error("Please select a Model!");
            } else {
                if (
                    selectedSystem.system !== DFLT_System &&
                    selectedSubSystem !== DFLT_SubSystem &&
                    selectedParts.length > 0 &&
                    selectedParts[0]?.quantity > 0
                ) {
                    requestQuote({ userEmail: user?.email, userId: user?._id, carInfo: selectedParts }).then(res => {
                        if (res?.data?.status) {
                            toast.success(res?.data?.message);
                            setSelectedItemString("");
                            setSelectedItem({
                                partName: DFLT_CarParts
                            });
                            setSelectedSystem({
                                system: DFLT_System
                            });
                            setSelectedSystem({ system: DFLT_System });
                            setSelectedSubSystem(DFLT_SubSystem);
                            setCarPartsCheck([]);
                            setSelectedParts([]);
                            setBrand(DFLT_Brand);
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

    useEffect(() => {
        if (subSystems.length === 1) {
            setSelectedSubSystem(subSystems[0]);
            handleShowItems({ target: { value: subSystems[0] }});
        }
    }, [subSystems, handleShowItems]);

    useEffect(() => {
        if (items.length === 1) {
            handleSelectedItem({ target: { value: JSON.stringify(items[0]) } });
        }
    }, [items]);

    



    return (
        <TabContentContainer variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
            <div className="video-input-box">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="mt-4">
                        <h5 className="mb-0 pb-0" style={{ color: 'blue' }}>Vehicle Information: </h5>
                    </div>
                    <button onClick={handleRequestQuote} className="btn btn-primary d-block" disabled={selectedParts.length === 0}>Request Quotes</button>
                </div>
                <hr className="mt-1" />

                <div className="row"> 
                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-4"> 
                        <Form.Select    id="year"   className="shadow-none" name="year"     value={selectedYear}    onChange={handleYearChange}     aria-label={`Default ${DFLT_Year}`}>
                            <option value={DFLT_Year}>{DFLT_Year}</option>
                            {years.map(year => (            <option key={year}      value={year}>                        {year}      </option>   ))}
                        </Form.Select>
                    </div>

                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-4">
                        <Form.Select    id="brand"  className="shadow-none" name="brand"    value={brand}           onChange={handleBrandChange}    aria-label={`Default ${DFLT_Brand}`}>
                            <option value={DFLT_Brand}>{DFLT_Brand}</option>
                            {carsData?.data?.map(car => (   <option key={car?._id}  value={JSON.stringify(car)}>     {car.car}   </option>   ))}
                        </Form.Select>
                    </div>

                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-4">
                        <Form.Select    id="model"  className="shadow-none" name="model"    value={model}           onChange={handleModelChange}    aria-label={`Default ${DFLT_Model}`}
                            disabled={!brand || brand === DFLT_Brand}
                        >
                            <option value={DFLT_Model}>{DFLT_Model}</option>
                            {brandObj?.models?.map(model => (   <option key={model} value={model}>                      {model}     </option>   ))}
                        </Form.Select>
                    </div>


                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-6">
                        <Form.Label htmlFor="additional">Additional Info</Form.Label>
                        <Form.Control   id="additional"     type="text"     value={additional}      onChange={e => setAdditional(e.target.value)}    aria-describedby="additional info"
                        />
                    </div>

                    <div className="input-wrapper mb-3 col-12 col-md-6 col-lg-6">
                        <Form.Label htmlFor="vin">Vehicle VIN</Form.Label>
                        <Form.Control   id="vin"            type="text"     value={vin}             onChange={e => setVin(e.target.value)}          aria-describedby="vin"
                        />
                    </div>
                </div>


                <div className="mt-4">
                    <h5 className="mb-0 pb-0" style={{ color: 'blue' }}>Select Vehicle Part </h5>
                </div>


                <hr />
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-8">
                        <div className="input-wrapper mb-3">
                            <label className="mt-3" htmlFor="text">System:</label>
                            <Form.Select
                                onChange={handleViewCategory}   value={selected}    name="selectedSystem"   aria-label={`Default ${DFLT_System}`}     className="shadow-none"
                                disabled={brand === "" || brand === DFLT_Brand || model === "" || model === DFLT_Model}
                                default={DFLT_System}
                            >
                                <option value={JSON.stringify({ system: DFLT_System })}>{DFLT_System}</option>
                                {data?.data?.map(d => ( <option key={d?._id} value={JSON.stringify(d)}>     {d?.system}     </option>   ))}
                            </Form.Select>


                            <label className="mt-3" htmlFor="text">Sub-System:</label>
                            <Form.Select
                                onChange={handleShowItems}  value={selectedSubSystem}   name="selectedSystem"   aria-label={`Default ${DFLT_SubSystem}`} className="shadow-none"
                                disabled={selectedSystem.system === DFLT_System}
                            >
                                {subSystems.length > 1 ? (
                                    <>
                                        <option value={DFLT_SubSystem}>{DFLT_SubSystem}</option>
                                        {subSystems.map(d => (  <option key={d} value={d}>{d}</option>  ))}
                                    </>
                                ) : (
                                    subSystems.length === 1 && <option value={subSystems[0]}>{subSystems[0]}</option>
                                )}
                            </Form.Select>


                            <label className="mt-3" htmlFor="text">Part:</label>
                            <Form.Select
                                onChange={handleSelectedItem}   value={selectedItemString}  name="selectedSystem"   aria-label={`Default ${DFLT_CarParts}`} className="shadow-none"
                                disabled={selectedSubSystem === DFLT_SubSystem}
                            >
                                {items.length > 1 ? (
                                    <>
                                        <option value={JSON.stringify({ partName: DFLT_CarParts })}>{DFLT_CarParts}</option>
                                        {items.map(d => ( <option key={d} value={JSON.stringify(d)}>{d.partName}</option>   ))}
                                    </>
                                ) : (
                                    items.length === 1 && (
                                        <>
                                            <option value={JSON.stringify(items[0])}>{items[0].partName}</option>
                                        </>
                                    )
                                )}
                            </Form.Select>
                        </div>
                    </div>


                    {selectedItemString && (
                        <div className="col-12 col-md-4 col-lg-4 d-flex flex-column justify-content-center">
                            <button onClick={() => handleSelectCarParts(selectedItem)} className="btn btn-primary mt-3">
                                Add Part
                            </button>
                            <div className="sub-cat-div w-100 mt-3">
                                {selectedItem?.partName !== DFLT_CarParts ? (
                                    <>
                                        <div className="car-part-style w-100">
                                            {selectedItem?.partImage && (
                                                <img src={selectedItem?.partImage} height={"100px"} width={"auto"} alt="part" />
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


                <div className="mt-4">
                    <h5 className="mb-0 pb-0" style={{ color: 'blue' }}>
                        Parts {selectedParts.length >= 1 && `: ${selectedParts.length} selected`}
                    </h5>
                </div>



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
                                    <input  className="quantity-style"  value={s.quantity}  placeholder="Qt" onChange={e => handleValue(i, e.target.value)} />
                                </div>
                            </div>
                            <div>{s?.partImage && <img height={"170px"} src={s?.partImage} alt="part" />}</div>
                            <Button     className="danger-btn d-block mx-auto mt-2 mb-2"    variant="danger"        onClick={() => handleRemoveCarParts(s)}                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>




                
            </div>
        </TabContentContainer>
    );
};

export default SubsPartsOrders;
