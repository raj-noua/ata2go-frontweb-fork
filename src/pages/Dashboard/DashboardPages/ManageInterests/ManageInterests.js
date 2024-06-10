import React, { useContext, useState } from "react";
import "./ManageInterests.css";
import { MdRemoveCircle } from "react-icons/md";
import { toast } from "react-toastify";
import {
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery,
    useUpdateCategoryMutation
} from "../../../../services/categoryApi";
import { Button, Form, Modal } from "react-bootstrap";
import { UserContext } from "../../../../App";
import DeleteModal from "../../../../components/Modal/DeleteModal";
const ManageCategories = () => {
    const [category, setCategory] = useState("");
    const [updateCat, setUpdateCat] = useState("");
    const [updateSubCat, setUpdateSubCat] = useState([]);
    const [updateTemp, setUpdateTemp] = useState("");
    const [temp, setTemp] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [addCategory] = useAddCategoryMutation();
    const [selectedCategory, setSelectedCategory] = useState({
        categoryName: "Select Category"
    });
    const { data } = useGetAllCategoriesQuery();
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState("");
    const [deleteCategory] = useDeleteCategoryMutation();
    const { user } = useContext(UserContext);
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const handleSubCategories = () => {
        setSubCategories([...subCategories, temp]);
        setTemp("");
    };

    const handleAddCategory = () => {
        const data = {
            categoryName: category,
            subCategories: subCategories
        };
        if (category) {
            if (subCategories.length > 0) {
                addCategory(data).then(res => {
                    if (res?.data?.status) {
                        toast.success(res?.data?.message);
                        setCategory("");
                        setSubCategories([]);
                        setTemp("");
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

    const handleDeleteSubCat = subCat => {
        const subCats = subCategories?.filter(s => s !== subCat);
        setSubCategories(subCats);
    };

    const handleViewCategory = e => {
        const value = e.target.value;

        setSelectedCategory(JSON.parse(value));
        setSelected(value);
    };
    const handleDeleteCat = id => {
        deleteCategory(id).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setSelectedCategory(JSON.stringify({ categoryName: "Select Category" }));
                setSelected("");
                setDeleteModal(false);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    const handleAddSubCat = () => {
        setUpdateSubCat([...updateSubCat, updateTemp]);
        setUpdateTemp("");
    };

    const handleDeleteUpdateSubCat = subCat => {
        const subCats = updateSubCat?.filter(s => s !== subCat);
        setUpdateSubCat(subCats);
    };

    const handleUpdate = () => {
        const data = {
            categoryName: updateCat,
            subCategories: updateSubCat
        };
        if (updateCat) {
            if (updateSubCat.length > 0) {
                updateCategory({ id: selectedCategory?._id, data: data }).then(res => {
                    if (res?.data?.status) {
                        toast.success(res?.data?.message);
                        setShow(false);
                        setUpdateTemp("");
                        setUpdateSubCat([]);
                        setSelectedCategory(res?.data?.result);
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

    return (
        <div className="manage-video-page">
            <div className="video-upload-container">
                <div className="video-input-box">
                    <h2 className="video-page-title text-center">Add Interest Categories</h2>
                    <div className="input-wrapper">
                        <label htmlFor="categoryName">Category Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Enter Category Name"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="title">Add Sub-category</label>
                        <div className="d-flex justify-content-start align-items-center">
                            <input
                                type="text"
                                id="subCategory"
                                placeholder="Enter Sub-Category"
                                value={temp}
                                onChange={e => setTemp(e.target.value)}
                            />
                            <button onClick={handleSubCategories} className="extra-btn">
                                Add
                            </button>
                        </div>
                        <div className="">
                            <h5 className="mb-3 mt-3">Added Sub-categories</h5>
                            {subCategories?.length > 0 ? (
                                <>
                                    {subCategories?.map((e, i) => (
                                        <span key={i} className="sub-category-style">
                                            {e}{" "}
                                            <span onClick={() => handleDeleteSubCat(e)} className="sub-category-remove">
                                                <MdRemoveCircle />
                                            </span>
                                        </span>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <p className="text-danger">
                                        <small>No Sub-Categories Added!</small>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="input-button mt-3">
                        <button onClick={handleAddCategory}>Add Interest Category</button>
                    </div>
                </div>
            </div>

            <div className="video-upload-container mt-4">
                <div className="video-input-box">
                    <div className="input-wrapper mb-3">
                        <label htmlFor="text">View Interest Categories</label>
                        <Form.Select
                            onChange={handleViewCategory}
                            value={selected?.categoryName}
                            name="selectedCategory"
                            aria-label="Default select example"
                            className="shadow-none"
                        >
                            <option value={JSON.stringify({ categoryName: "Select Category" })}>Select Category</option>
                            {data?.data
                                ?.slice() // Create a shallow copy of the array
                                .sort((a, b) => a.categoryName.localeCompare(b.categoryName)) // Sort based on the 'system' property
                                .map(d => (
                                    <option key={d?._id} value={JSON.stringify(d)}>
                                        {d?.categoryName}
                                    </option>
                                ))}
                        </Form.Select>
                        <div className="sub-cat-div mt-3">
                            {selectedCategory &&
                                selectedCategory?.subCategories?.map((e, i) => (
                                    <span key={i} className="sub-category-style pt-2">
                                        {e}
                                    </span>
                                ))}
                        </div>
                        {selectedCategory?.categoryName !== "Select Category" && (
                            <>
                                {user?.role === "power" || user?.role === "admin" || user?.role === "support" ? (
                                    <div>
                                        <Button
                                            onClick={() => {
                                                setShow(true);
                                                setUpdateCat(selectedCategory?.categoryName);
                                                setUpdateSubCat(selectedCategory?.subCategories);
                                            }}
                                            size="md"
                                        >
                                            Modify
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setDeleteModal(true);
                                                setSelectedItem(selectedCategory?._id);
                                            }}
                                            className="ms-3 danger-btn"
                                            variant="danger"
                                            size="md"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Button disabled style={{ background: "grey" }} size="md">
                                            Modify
                                        </Button>
                                        <Button
                                            disabled
                                            style={{ background: "grey" }}
                                            className="ms-3 danger-btn"
                                            variant="danger"
                                            size="md"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <div className="modal-form">
                        <div className="video-input-box-modal">
                            <h2 className="video-page-title text-center">Modify Categories</h2>
                            <div className="input-wrapper">
                                <label htmlFor="categoryName">Category Name</label>
                                <input
                                    type="text"
                                    id="categoryName"
                                    placeholder="Category Name"
                                    value={updateCat}
                                    onChange={e => setUpdateCat(e.target.value)}
                                />
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="title">Add Sub-category</label>
                                <div className="d-flex justify-content-start align-items-center">
                                    <input
                                        type="text"
                                        id="subCategory"
                                        placeholder="Sub-Category"
                                        value={updateTemp}
                                        onChange={e => setUpdateTemp(e.target.value)}
                                    />
                                    <button onClick={handleAddSubCat} className="extra-btn">
                                        Add
                                    </button>
                                </div>
                                <div className="">
                                    <h5 className="mb-3 mt-3">Added Sub-categories</h5>
                                    {updateSubCat?.length > 0 ? (
                                        <>
                                            {updateSubCat?.map((e, i) => (
                                                <span key={i} className="sub-category-style">
                                                    {e}{" "}
                                                    <span onClick={() => handleDeleteUpdateSubCat(e)} className="sub-category-remove">
                                                        <MdRemoveCircle />
                                                    </span>
                                                </span>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-danger">
                                                <small>No Sub-Categories Added!</small>
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="input-button mt-3">
                                <Button variant="secondary danger-btn" onClick={() => setShow(false)}>
                                    Close
                                </Button>
                                <Button className="ms-2" onClick={handleUpdate} variant="info">
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <DeleteModal
                question={"Do you really delete the Interest?"}
                heading={"Delete Interest"}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                handleDeleteItem={handleDeleteCat}
                id={selectedItem}
            ></DeleteModal>
        </div>
    );
};

export default ManageCategories;
