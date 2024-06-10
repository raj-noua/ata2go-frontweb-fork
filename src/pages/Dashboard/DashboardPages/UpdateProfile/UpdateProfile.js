import React, { useEffect }                 from "react";
import { Container }                        from "react-bootstrap";
import { useParams }                        from "react-router-dom";
import { PageHeading, ProfileSection }      from "../../../Settings/profileStyle";
import SettingsTabs                         from "../../../Settings/ProfileTabComponent/SettingsTabs";
import SubscriptionsTabs                    from "../../../Subscriptions/_SubscriptionTab/SubscriptionsTabs";
import PageHeader                           from "../../../../components/UI/PageHeader";
import { useGetUserByIdQuery }              from "../../../../services/userApi";
import { settingsData, subscriptionsData }  from "../../../../utils/constants";

const UpdateProfile = () => {
    const { id } = useParams();
    const { data } = useGetUserByIdQuery(id);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log(data?.result);
    return (
        <>
            <PageHeader title={`Let's Update Mr. ${data?.result?.firstName} ${data?.result?.lastName}`} />
            <ProfileSection>
                <Container>
                    <PageHeading>Settings</PageHeading>
                    <SettingsTabs user={data?.result} tabs={settingsData} />
                </Container>
            </ProfileSection>
            <ProfileSection>
                <Container>
                    <PageHeading>Subscriptions</PageHeading>
                    <SubscriptionsTabs user={data?.result} tabs={subscriptionsData} />
                </Container>
            </ProfileSection>
        </>
    );
};

export default UpdateProfile;
