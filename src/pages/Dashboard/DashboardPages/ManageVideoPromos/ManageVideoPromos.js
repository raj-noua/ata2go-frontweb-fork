import moment                           from 'moment';
import React, 
        { useContext, 
        useEffect, 
        useMemo,
        useState }                      from "react";
import { Button, Image, Modal,
         Row, Col, 
         Container}                     from "react-bootstrap";
import BootstrapTable                   from "react-bootstrap-table-next";
import filterFactory, { textFilter }    from "react-bootstrap-table2-filter";
import paginationFactory                from "react-bootstrap-table2-paginator";
import { BiSolidPencil }                from "react-icons/bi";
import { MdDelete }                     from "react-icons/md";
import { FaRegEye }                     from "react-icons/fa";
import Select                           from "react-select";
import { toast }                        from "react-toastify";
import { useNavigate }                  from "react-router-dom";

import {
    useDeleteVideoMutation,
    useGetAllVideosWithRatingQuery,
    useGetVideoByIdQuery,
    useUpdateVideoMutation,
    useUploadVideoMutation
}                                   from "../../../../services/videoApi";
import { useGetAllAffiliatesQuery } from "../../../../services/affiliateApi";
import { useGetAllCategoriesQuery } from "../../../../services/categoryApi";
import DeleteModal                  from "../../../../components/Modal/DeleteModal";
import { UserContext }              from "../../../../App";
import { Images }                   from "../../../../config/images";

import                              "../ManageStyle.css";



const ManageVideos = () => {
    const navigate                              = useNavigate();
    // **  Constants section
    const [showModal, setShowModal]             = useState(false);
    const [showComments, setShowComments]       = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [showDetails, setShowDetails]         = useState(false);
    const [showCampaign, setShowCampaign]       = useState(false);
    const [deleteModal, setDeleteModal]         = useState(false);
    const [isPublished, setIsPublished]             = useState(false);
    const [isNewPromotion, setIsNewPromotion]   = useState(false);

    
    const [affiliates, setAffiliates]           = useState([]);
    const [serviceCode, setServiceCode]         = useState("");
    const [couponCode, setCouponCode]           = useState("");
    const [campaignName, setCampaignName]       = useState("");
    const [categories, setCategories]           = useState([]);

    const [title, setTitle]                     = useState("");
    const [description, setDescription]         = useState("");
    const [validFromDate, setValidFromDate]     = useState("");
    const [validUntilDate, setValidUntilDate]   = useState("");

    const [viewComments, setViewComments]       = useState([]);
    const [videoUrl, setVideoUrl]               = useState("");
    const [selectedId, setSelectedId]           = useState("");
    const [selectedItem, setSelectedItem]       = useState("");
    const [videoLists, setVideoLists]           = useState([]);
    
    const [subcategoryOptionsList, setSubcategoryOptionsList]   = useState([]);
    const [selectedCategory, setSelectedCategory]               = useState(null);
    const [selectedSubCategory, setSelectedSubCategory]         = useState(null);
    const [selectedAffiliate, setSelectedAffiliate]             = useState(null);

    const { user }                       = useContext(UserContext);
    const { data: data1 }                = useGetVideoByIdQuery(selectedId);
    const { data }                       = useGetAllVideosWithRatingQuery();
    const { data: allCategory }          = useGetAllCategoriesQuery();
    const { data: userList }             = useGetAllAffiliatesQuery();
    const [deleteVideo]                  = useDeleteVideoMutation();
    const [updateVideo]                  = useUpdateVideoMutation();
    const [uploadVideo]                  = useUploadVideoMutation();

    const STG_Date_Format = "YYYY-MM-DD";
    const STG_DateTime_Format = "YYYY-MM-DD, HH:MM:SS";
    
    

    const findCategoryAndSubcategory = (categories, subcategoryNames) => {
        let categoryObj = null;
        console.log("-FIND-CATEGORY-AND-SUBCAT");
        //console.log("categories",categories);
        console.log("subcategoryNames",subcategoryNames); 
        categories.forEach(cat => {
            cat.subCategories.forEach(sub => {
                subcategoryNames.forEach(subCatName => {
                    const [catName, subName] = subCatName.split('|');
                    
                    if ((cat.categoryName === catName && sub === subName) || subcategoryNames.includes(sub)) {
                        categoryObj = cat;
                    }
                });
            });
        });

        if (!categoryObj) { 
            categoryObj = "notfound";
        }
        return { categoryObj };
    };
    
    const handleValidFromDateChange = (e) => {
        const newValidFromDate = e.target.value;
        setValidFromDate(newValidFromDate);
        if (moment(newValidFromDate).isAfter(validUntilDate)) {
            setValidUntilDate(newValidFromDate);
        }
    };

    const handlePublishChange = () => {
        setIsPublished(prev => !prev);
    };

    const handleDeleteVideo = id => {
        deleteVideo(id).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setDeleteModal(false);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    const getFullInterests = (selectedCategory, selectedSubCategory) => {
        console.log("GET-FULL-INTERESTS");
        console.log("selectedCategory",selectedCategory);
        console.log("selectedSubCategory",selectedSubCategory);
        if (!selectedCategory || !selectedSubCategory) return [];
        return selectedSubCategory.map(option => 
            option.label.includes('|') ? option.label : `${selectedCategory.label}|${option.label}`
        );
    };
    
    const handleUploadVideo = () => {
        const data = {
            title,
            description: description,
            serviceCode: serviceCode,
            couponCode: couponCode,
            videoUrl: videoUrl,
            campaignName: campaignName,
            validFromDate: moment(validFromDate).format(STG_Date_Format),
            validUntilDate: moment(validUntilDate).format(STG_Date_Format),
            interests: selectedSubCategory.map(option => option.value),
            affiliates: selectedAffiliate.value,
            postedBy: user?._id,  // check this line in the modal
            isPublic: user?.role === "admin" ? true : false, // check this line in the modal
        };
        uploadVideo(data).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setTitle("");
                setVideoUrl("");
                setDescription("");
                setServiceCode("");
                setCouponCode("");
                setCampaignName("");
                setValidFromDate(moment().format('YYYY-MM-DD'));
                setValidUntilDate(moment().format('YYYY-MM-DD'));
                setSelectedAffiliate(null);
                setSelectedCategory(null);
                setSelectedSubCategory(null);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    const handleUpdate = () => {
        if (!selectedCategory || !selectedSubCategory) {
            toast.error("Please select a category and subcategory.");
            return;
        }
    
        const formattedValidFromDate    = moment(validFromDate).format(STG_Date_Format);
        const formattedValidUntilDate   = moment(validUntilDate).format(STG_Date_Format);
        const fullInterests             = getFullInterests(selectedCategory, selectedSubCategory);

        console.log("FULL Interests:", fullInterests);

        console.log("ID:", selectedId);
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Service Code:", serviceCode);
        console.log("Coupon Code:", couponCode);
        console.log("Video URL:", videoUrl);
        console.log("Campaign Name:", campaignName);
        console.log("Valid From Date:", formattedValidFromDate);
        console.log("Valid Until Date:", formattedValidUntilDate);
        console.log("FULL Interests:", fullInterests);
        console.log("Affiliates:", selectedAffiliate ? selectedAffiliate.value : null);
        console.log("Is Public:", isPublished);
    
        updateVideo({
            id: selectedId,
            data: {
                title,
                description: description,
                serviceCode: serviceCode,
                couponCode: couponCode,
                videoUrl: videoUrl,
                campaignName: campaignName,
                validFromDate: formattedValidFromDate,
                validUntilDate: formattedValidUntilDate,
                interests: fullInterests,
                affiliates: selectedAffiliate ? selectedAffiliate.value : null,
                isPublic: isPublished,
            },
        }).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setShowModal(false);
            } else {
                toast.error(res?.data?.message);
            }
        }).catch(error => {
            console.error("Update video error:", error);
            toast.error("An error occurred while updating the video.");
        });
    };
    

    const handleCategoryChange = selectedCategory => {
        setSelectedCategory(selectedCategory);
        setSelectedSubCategory(null);
        const category = allCategory?.data?.find(category => category._id === selectedCategory.value);
        if (category) {
            const subcategoryOptions = category.subCategories.map(subcategory_item => ({
                value: subcategory_item,
                label: subcategory_item,
            }));
            setSubcategoryOptionsList(subcategoryOptions);
        } else {
            setSubcategoryOptionsList([]);
        }
    };

    // Function to calculate the average rating
    const calculateAverageRating = ratings => {
        if (ratings.length === 0) return "---";
        const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
        const averageRating = totalRating / ratings.length;
        return averageRating.toFixed(1); // Round to one decimal place
    };

    // Function to generate full name
    const fullname = user => {
        if (!user) {
            return "";
        } else {
            return `${user.firstName} ${user.lastName}`;
        }
    };

    // Populate categories when allCategory changes
    useEffect(() => {
        if (allCategory && allCategory.data && allCategory.data.length) {
            const tempArr = allCategory.data.map(item => ({
                value: item._id,
                label: item.categoryName,
            }));
            setCategories(tempArr);
        }
    }, [allCategory]);

    // Populate affiliates when userList changes
    useEffect(() => {
        if (userList && userList.data && userList.data.length) {
            const tempArr = userList.data.map(item => ({
                value: item._id,
                label: fullname(item),  // Using the fullname function here
            }));
            setAffiliates(tempArr);
        }
    }, [userList]);

    // Update video details when data1 changes
    useEffect(() => {
        if (data1 && data1.result) {
            setTitle(data1.result.title);
            setVideoUrl(data1.result.videoUrl);
            setDescription(data1.result.description);
            setServiceCode(data1.result.serviceCode);
            setCouponCode(data1.result.couponCode);
            setCampaignName(data1.result.campaignName);
            setValidFromDate(data1.result.validFromDate);
            setValidUntilDate(data1.result.validUntilDate);

            setIsPublished(data1.result.isPublic);
            if (data1.result.affiliates) {
                const user = affiliates.find(user => user.value === data1.result.affiliates);
                setSelectedAffiliate(user);
            } else {
                setSelectedAffiliate(null);
            }
            if (data1.result.interests.length > 0) {
                console.log("-MATCHING CATEGORY AND SUBCATEGORY-");
                console.log("data1.result.interests", data1.result.interests);
                const subcategory_item = data1.result.interests;
                //returns Ex: ["Electronics|Security Systems"]
                
                const { categoryObj } = findCategoryAndSubcategory(allCategory.data, subcategory_item); 
                //* Returns Ex: {_id: "64cef7226fb997d0fdd072b6", categoryName: "Electronics", subCategories: ["General Electronics", "Security Systems"], …} 
                // {_id: "64cef7226fb997d0fdd072b6", categoryName: "Electronics", subCategories: ["General Electronics", "Security Systems"], createdAt: "2023-08-06T01:28:02.885Z", updatedAt: "2023-08-06T01:28:02.885Z", …}
                
                console.log("categoryObj:", categoryObj);
                console.log("subcategory_item", subcategory_item);
                const cate = categories.find(cate => cate.value === categoryObj._id); 
                // returns Ex: {value: "64cef7226fb997d0fdd072b6", label: "Electronics"}
                
                console.log("cate", cate);
                setSelectedCategory(cate);
                const subcategoryOptions = categoryObj.subCategories.map(subcategory_item => ({
                    value: subcategory_item,
                    label: subcategory_item,
                }));
                console.log("subcategoryOptions", subcategoryOptions);

                const selectedSubCategory = data1.result.interests.map(interest => ({
                    value: interest,
                    label: interest,
                }));
                console.log("selectedSubCategory", selectedSubCategory);


                setSubcategoryOptionsList(subcategoryOptions);
                setSelectedSubCategory(selectedSubCategory);
            } else {
                setSelectedCategory(null);
                setSelectedSubCategory(null);
            }
        }
    }, [data1, affiliates, allCategory, categories]);

    // Update video lists when data changes
    useEffect(() => {
        if (data && data.data && user.role === "affiliate") {
            const videoList = data.data.filter(item => item.affiliates.some(affiliate => affiliate._id === user._id));
            setVideoLists(videoList);
        } else if (data && data.data) {
            setVideoLists(data.data);
        }
    }, [data, user.role, user._id]);

    const updatedVideoLists = useMemo(() => {
        if (videoLists.length > 0 && userList && userList.data && allCategory && allCategory.data) {
            console.log("-UPDATED-VIDEO-LISTS");

            return videoLists.map(video => {
                const affiliate = userList.data.find(user => user._id === video.affiliates[0]?._id);
                
                // Find the category based on the concatenated string in video.interests
                const category = allCategory.data.find(cat =>
                    cat.subCategories.some(sub => 
                        video.interests.some(interest => {
                            const [catName, subName] = interest.split('|');
                            return cat.categoryName === catName && sub === subName;
                        })
                    )
                );
                // console.log("category",category);
    
                // Format the interests to display only the part after the '|'
                const formattedInterests = video.interests.map(interest => {
                    const parts = interest.split('|');
                    return parts.length > 1 ? parts[1] : interest;
                }).join(', ');
                // console.log("formattedInterests",formattedInterests); 
    
                return {
                    ...video,
                    fullname:                   fullname(affiliate),
                    categoryName:               category ? category.categoryName : 'Unknown',
                    campaignName:               video.campaignName,
                    serviceCode:                video.serviceCode,
                    couponCode:                 video.couponCode,
                    formattedValidFromDate:     moment(video.validFromDate).format(STG_Date_Format),
                    formattedValidUntilDate:    moment(video.validUntilDate).format(STG_Date_Format),
                    days:                       moment(video.validUntilDate).diff(moment(video.validFromDate), 'days') + 1,
                    formattedCreatedAt:         moment(video.createdAt).format(STG_DateTime_Format),
                    formattedInterests 
                };
            });
        }
        return videoLists;
    }, [videoLists, userList, allCategory]);
    
    

    const headerStyle = { backgroundColor: 'blue', color: 'white', verticalAlign: 'top' };
    const headerStatStyle = { backgroundColor: 'blue', color: 'white', verticalAlign: 'top', textAlign: 'right' };


    const headerFormatter = (text) => (column, colIndex, { sortElement, filterElement }) => {
        const lines = text.split(' ');
        return (
            <div style={{ whiteSpace: 'pre-line' }}>
                <div>
                    {lines.map((line, index) => (
                        <div key={index}>{line}{sortElement}</div>
                    ))}
                    
                    {filterElement}
                </div>

            </div>
        );
    };

    const columns = [
        {   dataField: "id",              text: "No.",                 headerStyle: headerStyle,                                         formatter: (cell, row, rowIndex) => rowIndex + 1,
        },
        {   dataField: "fullname",        text: "Affiliate Name",      headerStyle: headerStyle,   sort: true,   filter: textFilter(),   formatter: (cell, row) => row.fullname,
        },
        showCampaign && {
            dataField: "serviceCode",     text: "SvcCode",             headerStyle: headerStyle,   sort: true,   filter: textFilter(),
        },
        showCampaign && {
            dataField: "couponCode",      text: "Coupon",              headerStyle: headerStyle,   sort: true,   filter: textFilter(),
        },
        showCampaign && {
            dataField: "campaignName",    text: "Campaign",            headerStyle: headerStyle,   sort: true,   filter: textFilter(),
        },
        {   dataField: "categoryName",    text: "Category",            headerStyle: headerStyle,   sort: true,   filter: textFilter(),
        },
        {   dataField: "interests",       text: "Interests",           headerStyle: headerStyle,   sort: true,   filter: textFilter(),   formatter: cell => cell.map(interest => interest.split('|').pop()).join(', '),
        },
        {   dataField: "title",           text: "Title",               headerStyle: headerStyle,   sort: true,   filter: textFilter(),
        },
        showDescription && {
            dataField: "description",     text: "Description",         headerStyle: headerStyle,   sort: true,   filter: textFilter(),
        },
        {   dataField: "formattedValidFromDate",  text: "Valid From",  headerStyle: headerStyle,   sort: true,   filter: textFilter(), headerFormatter: headerFormatter("Valid From"),
        },
        showDetails && {
            dataField: "formattedValidUntilDate", text: "Valid Until", headerStyle: headerStyle,   sort: true,   filter: textFilter(), headerFormatter: headerFormatter("Valid Until"),
        },
        {   dataField: "days",            text: "Valid Days",          headerStyle: headerStyle,   sort: true,   filter: textFilter(), headerFormatter: headerFormatter("Valid Days"),
        },
        showDetails && {
            dataField: "ratings",         text: "Rating AVG",          headerStyle: headerStyle,   sort: true,   filter: textFilter(),   formatter: cell => calculateAverageRating(cell),
        },
        showDetails && {
            dataField: "comments",        text: "Comm Nb.",            headerStyle: headerStatStyle, sort: true,                         formatter: (cell, row) => (
                <div className={`commentCount ${cell.length > 0 ? "commentBox" : "commentCount noLink"}`}
                     onClick={() => {    setViewComments(row.comments);  setShowComments(true);  }}>
                     {cell.length > 0 ? `${cell.length}` : "---"}
                </div>
            ),
        },
        showDetails && {
            dataField: "formattedCreatedAt", text: "Date Created", headerStyle: headerStyle, sort: true, filter: textFilter(),
        },
        {   dataField: "isPublic",      text: "Publish",              headerStyle: headerStyle,     sort: true,                          formatter: cell => (cell ? "Yes" : "No"),
        },
        {   dataField: "actions",       text: "Actions",              headerStyle: headerStyle,                                          formatter: (cell, row) =>
                user?.role === "power" || user?.role === "admin" || user?.role === "support" || user?.role === "affiliate" ? (
                    <div className="d-flex align-items-center justify-content-center gx-4">
                        <a target="_blank" href={row.videoUrl} rel="noreferrer" className="action-icon view">                                               <FaRegEye />       </a>
                        <span  className="action-icon update"  onClick={() => { setSelectedId(row._id);   setIsNewPromotion(false); setShowModal(true); }}> <BiSolidPencil />  </span>
                        <span  className="action-icon delete"  onClick={() => { setSelectedItem(row._id); setDeleteModal(true);     }}>                     <MdDelete />       </span>
                    </div>
                ) : (
                    <div className="d-flex align-items-center justify-content-center gx-4">
                        <span style={{ background: "grey" }} className="action-icon view">     <FaRegEye />        </span>
                        <span style={{ background: "grey" }} className="action-icon update">   <BiSolidPencil />   </span>
                        <span style={{ background: "grey" }} className="action-icon delete">   <MdDelete />        </span> 
                    </div>
                ),
        },
    ].filter(Boolean);

    const defaultSorted = [
        {
            dataField: "title",
            order: "asc",
        },
    ];

    const paginationOptions = {
        page: 1,
        sizePerPage: 25,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log("page", page);
            console.log("size per page", sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log("page", page);
            console.log("size per page", sizePerPage);
        },
    };

    const getValidUntilMinDate = () => {
        const now = moment();
        const validFrom = moment(validFromDate);
        return moment.max(now, validFrom).format('YYYY-MM-DD');
    };

    const getFormattedSubCategories = (selectedSubCategories) => {
        if (!selectedSubCategories || selectedSubCategories.length === 0) return [];
    
        const seenLabels = new Set();
        return selectedSubCategories
            .map(subCategory => {
                const parts = subCategory.label.split('|');
                const label = parts.length > 1 ? parts[1] : subCategory.label;
                return {
                    ...subCategory,
                    label,
                };
            })
            .filter(subCategory => {
                if (seenLabels.has(subCategory.label)) {
                    return false;
                } else {
                    seenLabels.add(subCategory.label);
                    return true;
                }
            });
    };
    

    const getFilteredSubcategoryOptions = (selectedSubCategories, subcategoryOptionsList) => {
        console.log("FILTERING", selectedSubCategories );
        console.log("FILTERED", subcategoryOptionsList );
        if (!selectedSubCategories || selectedSubCategories.length === 0) return subcategoryOptionsList;
        
        const selectedValues = new Set(selectedSubCategories.map(subCategory => {
            const parts = subCategory.value.split('|');
            return parts[parts.length - 1];
        }));
    
        return subcategoryOptionsList.filter(option => !selectedValues.has(option.value));
    };

    
    return (
        <div className="video-table-container">
            <h2 className="video-page-title">PROMO VIDEOS</h2>

            <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => { setShowModal(true);  setIsNewPromotion(true); }}>
                New Promo
            </Button>
            <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => setShowDescription(prev => !prev)}>
                {showDescription ? "Hide Desc." : "Show Desc."}
            </Button>
            <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => setShowCampaign(prev => !prev)}>
                {showCampaign ? "Hide Campaign" : "Show Campaign"}
            </Button>
            <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => setShowDetails(prev => !prev)}>
                {showDetails ? "Hide Details" : "Show Details"}
            </Button>
            <Button variant="primary" onClick={() => navigate('/subscriptions')}>
                MySubs
            </Button>
            
            <div className="table-responsive">
                <BootstrapTable
                    bootstrap4
                    keyField="_id"
                    data={updatedVideoLists}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    striped
                    hover
                    condensed
                    responsive
                    scrollable
                    pagination={paginationFactory(paginationOptions)}
                    noDataIndication="No data found!"
                    filter={filterFactory()}
                    filterPosition="top"
                />
            </div>


            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{isNewPromotion ? "Register New Promo" : "Update Promotion Details"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="manage-video-page">
                        <div className="video-upload-container">
                            <div className="video-input-box 2">
                                <h2 className="video-page-title">PROMO INFORMATION</h2>
                                <Container>
                                    <Row>
                                        <Col sm={12} md={6}>
                                            <div className="input-wrapper">
                                                <label htmlFor="title">*Title</label>
                                                <input  type="text"     id="title"    placeholder="Title"             value={title}           onChange={e => setTitle(e.target.value)}          />
                                            </div>
                                            <div className="input-wrapper">
                                                <label htmlFor="title">*Video link (URL)</label>
                                                <input  type="text"     id="title"    placeholder="https://"          value={videoUrl}        onChange={e => setVideoUrl(e.target.value)}       />
                                            </div>
                                            <div className="input-wrapper">
                                                <label htmlFor="title">Campaign Name</label>
                                                <input type="text"      id="title"    placeholder="Campaign Name"     value={campaignName}    onChange={e => setCampaignName(e.target.value)}   />
                                            </div>
                                            <div className="input-wrapper text-area">
                                                <label htmlFor="textarea">*Description</label>
                                                <textarea
                                                    name=""     id="textarea"   cols="30"   rows="8"
                                                    placeholder="Video Description"     value={description}     onChange={e => setDescription(e.target.value)}>
                                                </textarea>
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <div className="input-wrapper">
                                                <label htmlFor="title">*Affiliate Name</label>
                                                <Select  className="mb-2"    value={selectedAffiliate}   options={affiliates}              onChange={setSelectedAffiliate}      isDisabled={user?.role === "affiliate"}  />
                                            </div>
                                            <div className="input-wrapper">
                                                <label htmlFor="title">*Interest Category</label>
                                                <Select  className="mb-2"    value={selectedCategory}    options={categories}              onChange={handleCategoryChange}      isDisabled={!selectedAffiliate}          />
                                            </div>
                                            <div className="input-wrapper">
                                                <label htmlFor="title">*Interest Sub Category</label>
                                                <Select  className="mb-2"    value={getFormattedSubCategories(selectedSubCategory)} 
                                                options={getFilteredSubcategoryOptions(selectedSubCategory, subcategoryOptionsList)}  onChange={setSelectedSubCategory}    isDisabled={!selectedCategory} isMulti   />
                                            </div>

                                            <Row>
                                                <Col sm={12} md={6}>
                                                    <div className="input-wrapper">
                                                        <label htmlFor="dueDate" className=" form-label">*Valid From</label>
                                                        <input
                                                            type="date"     required    name="validFromDate"    placeholder="Valid From"                value={validFromDate || moment(Date.now()).format('YYYY-MM-DD')}
                                                            min={moment(Date.now()).format('YYYY-MM-DD')}       onChange={handleValidFromDateChange}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col sm={12} md={6}>
                                                    <div className="input-wrapper">
                                                        <label htmlFor="dueDate" className=" form-label">Valid Until</label>
                                                        <input
                                                            type="date"     required    name="validUntilDate"   placeholder="Valid Until"               value={validUntilDate}
                                                            min={getValidUntilMinDate()}                        onChange={e => setValidUntilDate(e.target.value)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={12} md={6}>
                                                    <div className="input-wrapper">
                                                        <label htmlFor="title">*Service Code</label>
                                                        <input  type="text"     id="title"      placeholder="Service Code"      value={serviceCode}     onChange={e => setServiceCode(e.target.value)}  />
                                                    </div>
                                                </Col>
                                                <Col sm={12} md={6}>
                                                    <div className="input-wrapper">
                                                        <label htmlFor="title">Coupon Code</label>
                                                        <input  type="text"     id="title"      placeholder="Coupon Code"       value={couponCode}      onChange={e => setCouponCode(e.target.value)}   />
                                                    </div>
                                                </Col>
                                            </Row>
                                            {user?.role !== "affiliate" && (
                                                <div className="form-check form-switch ps-0" style={{ display: "flex" }}>
                                                    <label className="form-check-label dark" htmlFor="flexSwitchCheckChecked">Video Publish :    Off</label>
                                                    <input
                                                        className="form-check-input mx-2"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="flexSwitchCheckChecked"
                                                        checked={isPublished}
                                                        onChange={handlePublishChange}
                                                    />
                                                    <label className="form-check-label dark" htmlFor="flexSwitchCheckChecked">On</label>
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={isNewPromotion ? handleUploadVideo : handleUpdate}>
                        {isNewPromotion ? "Register Now" : "Update Promo"}
                    </Button>
                    <Button variant="secondary" onClick={() => {    setShowModal(false);    setIsNewPromotion(false);   }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>




            <DeleteModal
                question={"Do you really want to delete the Video?"}
                heading={"Delete Video"}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                handleDeleteItem={handleDeleteVideo}
                id={selectedItem}
            />
            <Modal show={showComments} onHide={() => setShowComments(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>View Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="video-comment-list">
                        {viewComments.map((comment, index) => (
                            <li key={index}>
                                <div className="comment">
                                    <div className="user-imge">
                                        <Image src={Images.userProfileComment} />
                                    </div>
                                    <div>
                                        <p className="comment-text">{comment}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowComments(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};
export default ManageVideos;
