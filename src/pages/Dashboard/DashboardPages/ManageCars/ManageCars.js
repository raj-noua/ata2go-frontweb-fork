import React, { useState } from "react";
import "./ManageCars.css";
import { MdRemoveCircle } from "react-icons/md";
import { toast } from "react-toastify";

import { Button, Form, Modal } from "react-bootstrap";
import { useAddCarMutation, useDeleteCarMutation, useGetAllCarsQuery,  useUpdateCarsMutation } from "../../../../services/carApi";
const ManageCars = () => {
  const [car, setCar] = useState("");
  const [updateCar, setUpdateCar] = useState("");
  const [updateModel, setUpdateModel] = useState([]);
  const [updateTemp, setUpdateTemp] = useState("");
  const [temp, setTemp] = useState("");
  const [models, setModels] = useState([]);
  const [addCar] = useAddCarMutation();
  const [selectedCar, setSelectedCar] = useState({
    car: "Select Car",
  });
  const { data, isLoading } = useGetAllCarsQuery();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [deleteCar] = useDeleteCarMutation();
  const [updateCars] = useUpdateCarsMutation();
  const handleSubCars = () => {
    setModels([...models, temp]);
    setTemp("");
  };

  const handleAddCar = () => {
    const data = {
      car: car,
      models: models,
    };
    if (car) {
      if (models.length > 0) {
        addCar(data).then((res) => {
          if (res?.data?.status) {
            toast.success(res?.data?.message);
            setCar("");
            setModels([]);
            setTemp("");
          } else {
            toast.error(res?.data?.message);
          }
        });
      } else {
        toast.error("Please add at least one sub-category!");
      }
    } else {
      toast.error("Please add the Car Name!");
    }
  };

  const handleDeleteModels = (subCat) => {
    const subCats = models?.filter((s) => s !== subCat);
    setModels(subCats);
  };

  const handleViewCar = (e) => {
    const value = e.target.value;
    setSelectedCar(JSON.parse(value));
    setSelected(value);
  };
  const handleDeleteCat = (id) => {
    deleteCar(id).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        setSelectedCar(
          JSON.stringify({ car: "Select Car" })
        );
        setSelected("");
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const handleAddModels = () => {
    setUpdateModel([...updateModel, updateTemp]);
    setUpdateTemp("");
  };

  const handleDeleteUpdateModels = (model) => {
    const filteredModels = updateModel?.filter((s) => s !== model);
    setUpdateModel(filteredModels);
  };

  const handleUpdate = () => {
    const data = {
      car: updateCar,
      models: updateModel,
    };
    if (updateCar) {
      if (updateModel.length > 0) {
        updateCars({ id: selectedCar?._id, data: data }).then(
          (res) => {
            if (res?.data?.status) {
              toast.success(res?.data?.message);
              setShow(false);
              setUpdateTemp("");
              setUpdateModel([]);
              setSelectedCar(
                JSON.stringify({ car: "Select Car" })
              );
              setSelected(JSON.stringify({ car: "Select Car" }));
            } else {
              toast.error(res?.data?.message);
            }
          }
        );
      } else {
        toast.error("Please add at least one model!");
      }
    } else {
      toast.error("Please add the Car Name!");
    }
  };

  return (
    <div className="manage-video-page">
      <div className="video-upload-container">
        <div className="video-input-box">
          <h2 className="video-page-title text-center">Add Cars</h2>
          <div className="input-wrapper">
            <label htmlFor="car">Car Name</label>
            <input
              type="text"
              id="carName"
              placeholder="Car Name"
              value={car}
              onChange={(e) => setCar(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="title">Add Car Models</label>
            <div className="d-flex justify-content-start align-items-center">
              <input
                type="text"
                id="models"
                placeholder="Models"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
              />
              <button onClick={handleSubCars} className="extra-btn">
                Add
              </button>
            </div>
            <div className="">
              <h5 className="mb-3 mt-3">Added Models</h5>
              {models?.length > 0 ? (
                <>
                  {models?.map((e, i) => (
                    <span key={i} className="sub-category-style">
                      {e}{" "}
                      <span
                        onClick={() => handleDeleteModels(e)}
                        className="sub-category-remove"
                      >
                        <MdRemoveCircle />
                      </span>
                    </span>
                  ))}
                </>
              ) : (
                <>
                  <p className="text-danger">
                    <small>No models Added!</small>
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="input-button mt-3">
            <button onClick={handleAddCar}>Add Car</button>
          </div>
        </div>
      </div>

      <div className="video-upload-container mt-4">
        <div className="video-input-box">
          <div className="input-wrapper mb-3">
            <label htmlFor="text">View Cars</label>
            <Form.Select
              onChange={handleViewCar}
              value={selected}
              name="selectedCar"
              aria-label="Default select example"
              className="shadow-none"
            >
              <option
                value={JSON.stringify({ car: "Select Car" })}
              >
                Select Car
              </option>
              {data?.data?.map((d) => (
                <option key={d?._id} value={JSON.stringify(d)}>
                  {d?.car}
                </option>
              ))}
            </Form.Select>
            <div className="sub-cat-div mt-3">
              {selectedCar &&
                selectedCar?.models?.map((e, i) => (
                  <span key={i} className="sub-category-style pt-2">
                    {e}
                  </span>
                ))}
            </div>
            {selectedCar?.car !== "Select Car" && (
              <div>
                <Button
                  onClick={() => {
                    setShow(true);
                    setUpdateCar(selectedCar?.car);
                    setUpdateModel(selectedCar?.models);
                  }}
                  size="md"
                >
                  Modify
                </Button>
                <Button
                  onClick={() => handleDeleteCat(selectedCar?._id)}
                  variant="danger"
                  size="md"
                  className="ms-3"
                >
                  Delete
                </Button>
              </div>
            )}
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
              <h2 className="video-page-title text-center">
                Modify Cars
              </h2>
              <div className="input-wrapper">
                <label htmlFor="car">Car Name</label>
                <input
                  type="text"
                  id="car"
                  placeholder="Car Name"
                  value={updateCar}
                  onChange={(e) => setUpdateCar(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="title">Add Sub-category</label>
                <div className="d-flex justify-content-start align-items-center">
                  <input
                    type="text"
                    id="subCar"
                    placeholder="Sub-Car"
                    value={updateTemp}
                    onChange={(e) => setUpdateTemp(e.target.value)}
                  />
                  <button 
                  onClick={handleAddModels}
                   className="extra-btn">
                    Add
                  </button>
                </div>
                <div className="">
                  <h5 className="mb-3 mt-3">Added Sub-categories</h5>
                  {updateModel?.length > 0 ? (
                    <>
                      {updateModel?.map((e, i) => (
                        <span key={i} className="sub-category-style">
                          {e}{" "}
                          <span
                            onClick={() => handleDeleteUpdateModels(e)}
                            className="sub-category-remove"
                          >
                            <MdRemoveCircle />
                          </span>
                        </span>
                      ))}
                    </>
                  ) : (
                    <>
                      <p className="text-danger">
                        <small>No Sub-Cars Added!</small>
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="input-button mt-3">
                <Button variant="secondary me-3" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button 
                onClick={handleUpdate}
                 variant="info">
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

export default ManageCars;
