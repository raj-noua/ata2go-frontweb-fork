import { useContext, useEffect }                        from "react";
import { Container }                                    from "react-bootstrap";
import { PageHeading, ProfileSection }                  from "./profileStyle";
import SettingsTabs                                     from "./ProfileTabComponent/SettingsTabs";
import PageHeader                                       from "../../components/UI/PageHeader";
import { settingsData }                                 from "../../utils/constants";
import { UserContext }                                  from "../../App";

const Profile = () => {
    const { user, refetch, setRefetch } = useContext(UserContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <PageHeader title={`Hi, ${user?.firstName} ${user?.lastName}`} />

            <ProfileSection>
                <Container>
                    <PageHeading>Settings</PageHeading>
                    <SettingsTabs user={user} refetch={refetch} setRefetch={setRefetch} tabs={settingsData} />
                </Container>
            </ProfileSection>
        </>
    );
};

export default Profile;
