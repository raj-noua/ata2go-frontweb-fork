import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ServiceContentsTabs, TabContentBox, TabNavHeader, TabNavItem, TabNavList } from "./serviceContentsStyle";
import { serviceTabs } from "./../../../../utils/constants";
import { ServiceContext } from "../../../../App";
// import { useDispatch, useSelector } from "react-redux";
// import { serviceChange } from "../../../../store/actions/general/Nav";

const ServiceContents = () => {
    // const dispatch = useDispatch();
    // const activeService = useSelector(state => state.siteStore.nav.activeNav);
    const [selectedTab, setSelectedTab] = useState(serviceTabs[0]);
    const { setServiceId, serviceId } = useContext(ServiceContext);
    // Default to a tab based on the URL hash value
    useEffect(() => {
        const tabFromHash = serviceTabs.findIndex(tab => tab.id === serviceId);
        setSelectedTab(serviceTabs[tabFromHash !== -1 ? tabFromHash : 0]);
    }, [serviceId]);

    const onServiceClickHandler = service => {
        // const tabFromHash = serviceTabs.findIndex(tab => `#${tab.id}` === service.id);

        setServiceId(service.id);
        setSelectedTab(service);
    };

    return (
        <ServiceContentsTabs>
            <TabNavHeader>
                <p>
                    Jump to
                    <br />
                    Service
                </p>
                <TabNavList>
                    {serviceTabs.map(item => (
                        <TabNavItem
                            key={item.label}
                            className={item === selectedTab ? "selected" : ""}
                            onClick={() => onServiceClickHandler(item)}
                        >
                            <item.icon />
                            <span>{`${item.label}`}</span>
                        </TabNavItem>
                    ))}
                </TabNavList>
            </TabNavHeader>
            <TabContentBox>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab ? selectedTab.label : "empty"}
                        // initial={{ y: 10, opacity: 0 }}
                        // animate={{ y: 0, opacity: 1 }}
                        // exit={{ y: -10, opacity: 0 }}
                        // transition={{ duration: 0.2 }}
                    >
                        {selectedTab ? <selectedTab.content sectionID={selectedTab.id} tabLabel={selectedTab.label} /> : "😋"}
                    </motion.div>
                </AnimatePresence>
            </TabContentBox>
        </ServiceContentsTabs>
    );
};

export default ServiceContents;
