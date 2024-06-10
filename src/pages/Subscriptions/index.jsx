import { useContext, useEffect }     from "react";
import { Container }                 from "react-bootstrap";
import { ProfileSection }            from "./profileStyle";
import SubscriptionsTabs             from "./_SubscriptionTab/SubscriptionsTabs";
import PageHeader                    from "../../components/UI/PageHeader";
import { subscriptionsData }         from "../../utils/constants";
import { UserContext }               from "../../App";

const Profile = () => {
    const { user, refetch, setRefetch } = useContext(UserContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <PageHeader title={`My Subscriptions`} />
            <ProfileSection>
                <Container>
                    <SubscriptionsTabs user={user} refetch={refetch} setRefetch={setRefetch} tabs={subscriptionsData} />
                </Container>
            </ProfileSection>
        </>
    );
};

export default Profile;
