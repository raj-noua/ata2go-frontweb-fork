import React, { useState } from "react";
import "./ManageCarParts.css";
import { Button, Form, Modal } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import { MdRemoveCircle } from "react-icons/md";
import { toast } from "react-toastify";
import cloneDeep from "lodash/cloneDeep";
import {
  useAddCarPartMutation,
  useDeleteCarPartMutation,
  useGetAllCarPartsQuery,
  useUpdateCarPartMutation,
  useUpdateCarPartsByIdMutation,
} from "../../../../services/carPartsApi";
import Papa from "papaparse";
const ManageCarParts = () => {
  const [show, setShow] = useState(false);
  const [system, setSystem] = useState("");
  const [subSystem, setSubSystem] = useState("");
  const [carParts, setCarParts] = useState([]);
  const [tempName, setTempName] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [selectedSystem, setSelectedSystem] = useState({
    system: "Select System",
  });
  const [selectedSubSystem, setSelectedSubSystem] =
    useState("Select Sub-System");
  const [selectedItem, setSelectedItem] = useState({
    partName: "Select Car Part",
  });
  const [addingSystem, setAddingSystem] = useState("Select Adding System");
  const [updateCarPart] = useUpdateCarPartMutation();
  const [selectedItemString, setSelectedItemString] = useState("");
  const [items, setItems] = useState([]);
  const [subSystems, setSubSystems] = useState([]);
  const [selected, setSelected] = useState("");
  const [partName, setPartName] = useState("");
  const [partImage, setPartImage] = useState("");
  const [addCarPart] = useAddCarPartMutation();
  const [deleteCarPart] = useDeleteCarPartMutation();
  const [updateCarPartsById] = useUpdateCarPartsByIdMutation();
  const { data, isLoading } = useGetAllCarPartsQuery();
  const [csvData, setCsvData] = useState("");
  const [jsonData, setJsonData] = useState([]);

  const handleCsvInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvContent = e.target.result;
      setCsvData(csvContent);
    };

    reader.readAsText(file);
  };

  const handleConvertClick = () => {
    Papa.parse(csvData, {
      header: true,
      complete: (result) => {
        setJsonData(result.data);
        result.data.pop();
        setCarParts(result.data);
        // console.log(result.data)
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  };

  const handleAddImage = (e) => {
    Resizer.imageFileResizer(
      e.target.files[0],
      150,
      150,
      "JPEG",
      70,
      0,
      (uri) => {
        setTempImage(uri);
        setPartImage(uri);
      },
      "base64",
      150,
      150
    );
  };

  const handleAddPart = (e) => {
    e.preventDefault();
    setCarParts([...carParts, { partName: tempName, partImage: tempImage }]);
    setTempName("");
    setTempImage("");
    setPartImage("");
    e.target.reset();
  };

  const handleDeletePart = (part) => {
    const subParts = carParts?.filter((s) => s !== part);
    setCarParts(subParts);
  };

  const handleAddSystem = () => {
    const data = {
      system: system,
      subSystem: subSystem,
      carParts: carParts,
    };
    if (system) {
      if (carParts.length > 0) {
        addCarPart(data).then((res) => {
          if (res?.data?.status) {
            toast.success(res?.data?.message);
            setSystem("");
            setCarParts([]);
            setSubSystem("");
          } else {
            toast.error(res?.data?.message);
          }
        });
      } else {
        toast.error("Please add at least one sub-category!");
      }
    } else {
      toast.error("Please add the Category Name!");
    }
  };

  const handleViewCategory = (e) => {
    const value = e.target.value;
    setSelectedSystem(JSON.parse(value));
    setSelected(value);
    const filteredSystem = data?.data?.filter(
      (d) => d?.system === JSON.parse(value)?.system
    );
    const keysArray = filteredSystem[0]?.subSystems?.map(
      (obj) => Object.keys(obj)[0]
    );
    setSubSystems(keysArray);
    setSelectedSubSystem("Select Sub-System");
  };

  const handleShowItems = (e) => {
    const value = e.target.value;
    setSelectedSubSystem(value);
    if (value !== "Select Sub-System") {
      setItems(selectedSystem?.subSystems[subSystems.indexOf(value)][value]);
    }
    setSelectedItemString("");
    setSelectedItem({
      partName: "Select Car Part",
    });
  };

  const handleSelectedItem = (e) => {
    const value = e.target.value;
    setSelectedItem(JSON.parse(value));
    setSelectedItemString(value);
    setPartName(JSON.parse(value)?.partName);
    setPartImage(JSON.parse(value)?.partImage);
  };

  const handleUpdateCarPart = (task) => {
    const tempItem = cloneDeep(selectedSystem); // Perform deep copy here
    let updateItem;
    if (selectedSubSystem !== "Select Sub-System") {
      updateItem =
        tempItem?.subSystems[subSystems.indexOf(selectedSubSystem)][
          selectedSubSystem
        ];
    }
    if (task === "update") {
      for (let i of updateItem) {
        if (selectedItem?.partName === i?.partName) {
          i.partName = partName;
          i.partImage = partImage;
        }
      }
      const data = {
        system: selectedSystem.system,
        subSystem: selectedSubSystem,
        carParts: updateItem,
      };
      if (selectedSystem?.system) {
        if (updateItem.length > 0) {
          updateCarPart({ id: selectedSystem?._id, data: data }).then((res) => {
            if (res?.data?.status) {
              toast.success(res?.data?.message);
              setSystem("");
              setCarParts([]);
              setSubSystem("");
            } else {
              toast.error(res?.data?.message);
            }
          });
        } else {
          toast.error("Please add at least one sub-category!");
        }
      } else {
        toast.error("Please add the Category Name!");
      }
    } else {
      const removedItem = updateItem?.filter(
        (item) => item?.partName !== selectedItem?.partName
      );
      const data = {
        system: selectedSystem.system,
        subSystem: selectedSubSystem,
        carParts: removedItem,
      };
      if (selectedSystem?.system) {
        if (updateItem.length > 0) {
          updateCarPart({ id: selectedSystem?._id, data: data }).then((res) => {
            if (res?.data?.status) {
              toast.success(res?.data?.message);
              setSystem("");
              setCarParts([]);
              setSubSystem("");
            } else {
              toast.error(res?.data?.message);
            }
          });
        } else {
          toast.error("Please add at least one sub-category!");
        }
      } else {
        toast.error("Please add the Category Name!");
      }
    }
  };

  const handleRemoveSystem = () => {
    deleteCarPart(selectedSystem?._id).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        setSystem("");
        setCarParts([]);
        setSubSystem("");
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const handleRemoveSubSystem = () => {
    const removedSubSystems = [...selectedSystem?.subSystems];
    removedSubSystems.splice(subSystems.indexOf(selectedSubSystem), 1);

    updateCarPartsById({
      id: selectedSystem?._id,
      data: { subSystems: removedSubSystems },
    }).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        setSystem("");
        setCarParts([]);
        setSubSystem("");
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  return (
    <div className="manage-video-page">
      <div className="video-upload-container">
        <div className="video-input-box">
          <h2 className="video-page-title text-center">Manage Car Parts</h2>
          <div className="input-wrapper mb-3">
            <label htmlFor="categoryName">System</label>
            <input
              type="text"
              id="system"
              placeholder="System Name"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
            />
          </div>

          <div className="input-wrapper mb-3">
            <label htmlFor="categoryName">Sub-System</label>
            <input
              type="text"
              id="subSystem"
              placeholder="Sub-System Name"
              value={subSystem}
              onChange={(e) => setSubSystem(e.target.value)}
            />
          </div>
          <div className="input-button mt-3">
            <label htmlFor="text">Select Adding System</label>
            <Form.Select
              onChange={(e) => setAddingSystem(e.target.value)}
              value={addingSystem}
              name="selectedSystem"
              aria-label="Default select example"
              className="shadow-none"
            >
              <option value={"Select Adding System"}>
                Select Adding System
              </option>
              <option value={"from csv"}>From CSV</option>
              <option value={"manual"}>Manual </option>
            </Form.Select>
          </div>
          <div className="input-wrapper mt-3">
            {addingSystem === "from csv" && (
              <>
                <label htmlFor="title">Add Car-Parts</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvInputChange}
                />
                <button className="extra-btn ms-0" onClick={handleConvertClick}>Load</button>
              </>
            )}
            {addingSystem === "manual" && (
              <>
                {" "}
                <label htmlFor="title">Add Car-Parts</label>
                <form
                  onSubmit={handleAddPart}
                  className="d-flex justify-content-start align-items-center"
                >
                  <input
                    type="text"
                    id="partName"
                    placeholder="Part Name"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                  <input
                    type="file"
                    id="subCategory"
                    className="car-part-image"
                    placeholder="Part Image"
                    onChange={handleAddImage}
                  />
                  <button className="extra-btn">Add</button>
                </form>
              </>
            )}
            <div className="">
              <h5 className="mb-3 mt-3">Added Sub-categories</h5>
              <div className="row g-0">
                {carParts?.length > 0 ? (
                  <>
                    {carParts?.map((e, i) => (
                      <div
                        key={i}
                        className="col-12 col-md-4 col-lg-4 car-part-style"
                      >
                        {
                          e?.partImage && <img
                          src={e?.partImage}
                          height={"150px"}
                          width={"100%"}
                          alt="part"
                        />
                        }
                        <div className="p-2 pb-0">
                          <p className="carParts-name">{e?.partName}</p>
                        </div>
                        <span
                          onClick={() => handleDeletePart(e)}
                          className="car-parts-remove"
                        >
                          <MdRemoveCircle />
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="text-danger">
                      <small>No Car Parts Added!</small>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="input-button mt-3">
            <button onClick={handleAddSystem}>Add System</button>
          </div>
        </div>
      </div>

      <div className="video-upload-container mt-4">
        <div className="video-input-box">
          <div className="input-wrapper mb-3">
            <label htmlFor="text">View Systems</label>
            <Form.Select
              onChange={handleViewCategory}
              value={selected}
              name="selectedSystem"
              aria-label="Default select example"
              className="shadow-none"
            >
              <option value={JSON.stringify({ system: "Select System" })}>
                Select System
              </option>
              {data?.data?.map((d) => (
                <option key={d?._id} value={JSON.stringify(d)}>
                  {d?.system}
                </option>
              ))}
            </Form.Select>

            {selectedSystem?.system !== "Select System" && (
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
                  {subSystems?.map((d) => (
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
                      <option
                        value={JSON.stringify({ partName: "Select Car Part" })}
                      >
                        Select Car Parts
                      </option>
                      {items?.map((d) => (
                        <option key={d} value={JSON.stringify(d)}>
                          {d?.partName}
                        </option>
                      ))}
                    </Form.Select>
                  </>
                )}

                <div className="sub-cat-div mt-3">
                  {selectedItem?.partName !== "Select Car Part" ? (
                    <>
                      <div className="col-12 col-md-4 col-lg-4 car-part-style">
                        {
                          selectedItem?.partImage && <img
                          src={selectedItem?.partImage}
                          height={"150px"}
                          width={"100%"}
                          alt="part"
                        />
                        }
                        <div className="p-2 pb-0">
                          <p className="carParts-name">
                            {selectedItem?.partName}
                          </p>
                          <button
                            onClick={() => setShow(true)}
                            className="btn btn-success btn-sm me-2"
                          >
                            Modify
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              handleUpdateCarPart("remove");
                            }}
                          >
                            Remove
                          </button>
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
              </>
            )}

            <div className="mt-3">
              <button
                onClick={handleRemoveSystem}
                className="btn btn-danger me-2"
              >
                Remove System
              </button>
              <button
                onClick={handleRemoveSubSystem}
                className="btn btn-danger me-2"
              >
                Remove Sub-System
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="modal-form">
            <div className="video-input-box-modal">
              <div className="input-wrapper">
                <label htmlFor="title">Update Car-Part</label>
                <form className="d-flex justify-content-start align-items-center">
                  <input
                    type="text"
                    id="partName"
                    placeholder="Part Name"
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                  />
                  <input
                    type="file"
                    id="subCategory"
                    className="car-part-image"
                    placeholder="Part Image"
                    onChange={handleAddImage}
                  />{" "}
                </form>
              </div>

              <div className="input-button mt-3 d-flex justify-content-evenly align-items-center">
                <Button
                  className="btn btn-danger"
                  onClick={() => setShow(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleUpdateCarPart("update");
                  }}
                  variant="info"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageCarParts;
