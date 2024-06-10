import { React, useContext, useEffect, useState, useRef }   from "react";
import { Container, Form, Button, Modal }                   from "react-bootstrap";
import { useNavigate }                                      from "react-router-dom";
import BootstrapTable                                       from "react-bootstrap-table-next";
import filterFactory, { textFilter }                        from "react-bootstrap-table2-filter";
import paginationFactory                                    from "react-bootstrap-table2-paginator";
import { toast }                                            from "react-toastify";
import YouTube                                              from "react-youtube";
import StarRatings                                          from "react-star-ratings";
import moment                                               from 'moment';
import "@smastrom/react-rating/style.css";
import PageHeader                                           from "../../components/UI/PageHeader";
import { Colors }                                           from "../../config/colors";
import { UserContext }                                      from "../../App";
import { useAddRatingMutation, useGetVideosByUserQuery }    from "../../services/videoApi";

import {
    CommentForm,
    FormButton,
    FormControlTextArea,
    FormLabelText,
    VideoContentSection,
    MarketingVideoContent,
    MarketingVideoSection,
    VideoPlayerContainer,
    CustomTableHeader,
    CustomFilterInput,
    CustomFilterContainer
} from "./marketingVideoStyle";


const VideoPlayer = ({ youTubeID, onReady, onStateChange }) => {
    const opts = {
        height: "30%",
        width: "100%",
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <VideoPlayerContainer>
            <YouTube videoId={youTubeID} opts={opts} onReady={onReady} onStateChange={onStateChange} />
        </VideoPlayerContainer>
    );
};

const CommentFormBox = ({ handleCommentChange, handleRating, isFormValid, comment, inputRef }) => {
    return (
        <CommentForm onSubmit={handleRating}>
            <Form.Group className="" controlId="exampleForm.ControlTextarea1">
                <FormLabelText>Share your impressions in a few words</FormLabelText>
                <FormControlTextArea
                    className="form-control"
                    as="textarea"
                    rows={3}
                    placeholder="Enter Comment"
                    onChange={handleCommentChange}
                    value={comment}
                    ref={inputRef}
                    required
                />
            </Form.Group>
            <FormButton variant="primary" type="submit" disabled={!isFormValid}>
                <span>Submit</span>
            </FormButton>
        </CommentForm>
    );
};

const createColumn = (dataField, text, formatter = undefined, filter = true) => {
    const commonProps = {
        dataField,
        text,
        headerStyle: { backgroundColor: "blue", color: "white", verticalAlign: 'top' },
        sort: true
    };
    if (filter) {
        commonProps.filter = textFilter({
            placeholder: `.. ${text}`, // Placeholder text
            className: 'custom-filter',
            getElement: (filterProps) => (
                <CustomFilterContainer>
                    <CustomFilterInput {...filterProps} />
                </CustomFilterContainer>
            )
        });
    }
    if (formatter) {
        commonProps.formatter = formatter;
    }
    return commonProps;
};

const MyPromo = () => {
    const { user } = useContext(UserContext);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const { data } = useGetVideosByUserQuery(user?._id);
    const [selectedVideo, setSelectedVideo] = useState({});
    const [addRating] = useAddRatingMutation();
    const [videoLists, setVideoLists] = useState([]);
    const [videoError, setVideoError] = useState(false);
    const [videoErrorMessage, setVideoErrorMessage] = useState("");
    const [showDetails, setShowDetails] = useState(false); // State for toggling column visibility
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // New state variables
    const [modalOpenTime, setModalOpenTime] = useState(null);
    const [modalCloseTime, setModalCloseTime] = useState(null);
    const [videoPlayer, setVideoPlayer] = useState(null);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);

    const handleCommentChange = e => {
        const inputValue = e.target.value;
        const sanitizedInputValue = inputValue.replace(/[^A-Za-z0-9.,!? ]/g, "");
        setComment(sanitizedInputValue);
        checkFormValidity(rating, sanitizedInputValue);
        inputRef.current.focus(); // Keep the focus on the textarea
    };

    const checkFormValidity = (newRating, newComment) => {
        if (newRating !== 0 && newComment.trim() !== "") {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const StarRatingsBox = ({ setRating, rating }) => {
        const changeRating = newRating => {
            setRating(newRating);
            checkFormValidity(newRating, comment);
        };

        return (
            <div style={{ marginTop: '10px' }}>  
                <StarRatings
                    starDimension="20px"
                    starSpacing="5px"
                    rating={rating}
                    starHoverColor={Colors.secondaryColor}
                    starEmptyColor={Colors.darkColor}
                    starRatedColor={Colors.secondaryColor}
                    changeRating={changeRating}
                    numberOfStars={5}
                />
            </div>
        );
    };

    const handleRating = e => {
        e.preventDefault();
        const data = {
            rating,
            comment,
            videoId: selectedVideo?._id,
            userId: user?._id,
        };
        addRating(data).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setRating(0);
                setComment("");
                setSelectedVideo({});
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (data?.data?.length > 0) {
            const matchedObjects = data?.data?.filter(obj => obj.interests.some(item => user.interests.includes(item)));
            if (matchedObjects && matchedObjects.length > 0) {
                const updatedList = matchedObjects.map(video => ({
                    ...video,
                    affiliate: video.user[0] ? `${video.user[0].firstName} ${video.user[0].lastName}` : 'N/A'
                }));
                console.log("UPDATED LIST", updatedList);
                setVideoLists(updatedList);
                setSelectedVideo(updatedList[0]);
            } else if (user.interests && user.interests.length > 0) {
                setVideoError(true);
                setVideoErrorMessage("No videos available for your selected interest.");
            }
            if (user.interests && user.interests.length === 0) {
                setVideoError(true);
                setVideoErrorMessage("Please at least have select one interest");
            }
        }
    }, [data?.data, user]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const formatExpiryDate = (cell) => {
        return moment(cell).format('YYYY-MM-DD HH:mm');
    };

    const columns = [
        createColumn("id", "ID", (cell, row, rowIndex) => rowIndex + 1, false),
        createColumn("affiliate", "Affiliate", cell => cell),
        createColumn("title", "Title"),
        createColumn("description", "Description"),
        createColumn("validUntilDate", "Expiry", formatExpiryDate),

        ...(showDetails
            ? [
                createColumn("interests", "Interests", cell => (Array.isArray(cell) ? cell.join(" | ") : cell)),
                createColumn("comments[0].comment", "Comments", (cell, row) => (row.comments && row.comments.length > 0 ? row.comments[0].comment : "---")),
                createColumn("comments[0].rating", "Rating", (cell, row) => (row.comments && row.comments.length > 0 ? `${row.comments[0].rating}` : "---"))
            ]
            : [])
    ];

    const handleClose = () => {
        setModalCloseTime(new Date());
        setShowModal(false);

        if (videoPlayer) {
            const currentTime = videoPlayer.getCurrentTime();
            console.log("Video watched for: ", (modalCloseTime - modalOpenTime) / 1000, "seconds");
            console.log("Video playback time: ", currentTime, "seconds");
            setCurrentPlaybackTime(currentTime);
        }
    };

    const handleOpen = () => {
        setModalOpenTime(new Date());
        setShowModal(true);
    };

    const onPlayerReady = (event) => {
        setVideoPlayer(event.target);
        event.target.seekTo(currentPlaybackTime);
    };

    const onPlayerStateChange = (event) => {
        // You can handle different player states if needed
    };

    const paginationOptions = {
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
    };

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setSelectedVideo(row);
            setRating(0); // Reset the rating state when a row is clicked
            setComment(""); // Reset the comment state when a row is clicked
            setCurrentPlaybackTime(0); // Reset the playback time when a row is clicked
            handleOpen(); // Show the modal when a row is clicked
            setTimeout(() => inputRef.current?.focus(), 100); // Focus the input field after modal opens
        },
    };


    return (
        <>
            <PageHeader title={`Marketing Videos`} />
            <MarketingVideoSection>
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <CustomTableHeader title="Promos of Interests" />
                        <Button variant="primary" onClick={toggleDetails}>
                            {showDetails ? 'Hide Details' : 'Show Details'}
                        </Button>
                        <Button variant="primary" onClick={() => navigate('/subscriptions')}>
                            MySubs
                        </Button>
                    </div>

                    {videoError ? (
                        <div className="">{videoErrorMessage}</div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <BootstrapTable
                                    bootstrap4
                                    keyField="id"
                                    data={videoLists}
                                    columns={columns}
                                    pagination={paginationFactory(paginationOptions)}
                                    filter={filterFactory()}
                                    striped
                                    hover
                                    condensed
                                    rowEvents={rowEvents}
                                />
                            </div>
                        </>
                    )}
                </Container>
            </MarketingVideoSection>

            {!videoError && (
                <Modal show={showModal} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedVideo?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VideoContentSection>
                            <MarketingVideoContent>
                                <VideoPlayer youTubeID={selectedVideo?.embedLink} onReady={onPlayerReady} onStateChange={onPlayerStateChange} />
                                {selectedVideo?.comments?.length > 0 ? (
                                    <>
                                        {selectedVideo?.comments[0]?.rating ? (
                                            <div className="video-rating">
                                                <h5>My Rating: {selectedVideo?.comments[0]?.rating}</h5>
                                                <p>My Comment: {selectedVideo?.comments[0]?.comment}</p>
                                            </div>
                                        ) : (
                                            <>
                                                {selectedVideo?._id && (
                                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                                        <StarRatingsBox rating={rating} setRating={setRating} />
                                                        <CommentFormBox
                                                            handleCommentChange={handleCommentChange}
                                                            handleRating={handleRating}
                                                            isFormValid={isFormValid}
                                                            comment={comment}
                                                            inputRef={inputRef}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {selectedVideo?._id && (
                                            <div className="d-flex flex-column align-items-center justify-content-center">
                                                <StarRatingsBox rating={rating} setRating={setRating} />
                                                <CommentFormBox
                                                    handleCommentChange={handleCommentChange}
                                                    handleRating={handleRating}
                                                    isFormValid={isFormValid}
                                                    comment={comment}
                                                    inputRef={inputRef}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </MarketingVideoContent>
                        </VideoContentSection>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default MyPromo;