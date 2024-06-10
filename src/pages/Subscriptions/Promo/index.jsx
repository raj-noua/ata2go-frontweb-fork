import React, { useContext, useState, useEffect } from "react";
import { TabContentContainer, TableContainer } from "../../Tabs/tabContentStyle";
import { staggerVariants, titleVariants } from "../../../utils/FmVariants";
import TableComponent from "../../../components/UI/TableComponent";
import { useGetVideosByUserQuery } from "../../../services/videoApi";
import { UserContext } from "../../../App";

const SubsPromo = () => {
    const { user } = useContext(UserContext);
    const { data } = useGetVideosByUserQuery(user?._id);
    const [videoLists, setVideoLists] = useState([]);
    const [videoError, setVideoError] = useState(false);
    const [videoErrorMessage, setVideoErrorMessage] = useState("");

    useEffect(() => {
        if (data && user.role === "affiliate") {
            const videoList = data?.data.filter(item => item.affiliates === user._id);
            setVideoLists(videoList);
        } else if (user.role === "user") {
            const matchedObjects = data?.data?.filter(obj => obj.interests.some(item => user.interests.includes(item)));
            if (matchedObjects && matchedObjects.length > 0) {
                setVideoLists(matchedObjects);
            } else if (user.interests && user.interests.length > 0) {
                setVideoError(true);
                setVideoErrorMessage("No videos available for your selected interest.");
            }
            if (user.interests && user.interests.length === 0) {
                setVideoError(true);
                setVideoErrorMessage("Please at least have select one interest");
            }
        } else {
            const videoList = data?.data;
            setVideoLists(videoList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, user]);
    // Function to full name
    const fullname = user => {
        if (user.length === 0) return "";
        return user[0].firstName + " " + user[0].lastName;
    };

    return (
        <TabContentContainer variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
            <TableContainer>
                {videoError ? (
                    <div className="">{videoErrorMessage}</div>
                ) : (
                    <TableComponent variants={titleVariants} isDataTable={+false}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Affiliate</th>
                                <th width={"40%"}>Description</th>
                                <th>Recent Impressions</th>
                                <th>My Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videoLists?.map((data, i) => (
                                <tr key={i + 1}>
                                    <td>{i < 100 ? `00${i + 1}` : `${i}`}</td>
                                    <td>{fullname(data?.user)}</td>
                                    <td>{data?.description}</td>
                                    <td>{data?.comments[0]?.comment ? `${data?.comments[0]?.comment}` : "Not Commented"}</td>
                                    <td>{data?.comments[0]?.rating ? `${data?.comments[0]?.rating}/5` : "Not Rated"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </TableComponent>
                )}
            </TableContainer>
        </TabContentContainer>
    );
};

export default SubsPromo;
