import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TabComponentWrapper, TabContentBox, TabNavItem, TabNavList, TabNavHeader } from "./profileTabComponentStyle";

const SubscriptionsTabs = ({ tabs, user, refetch, setRefetch }) => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    useEffect(() => {
        setTimeout(() => {
            tabChangeFn();
        }, 500);
    }, []);

    const tabChangeFn = () => {
        const sliderEle = document.querySelector("#Subscriptions .slider");
        const tabEle = document.querySelector("#Subscriptions .TabNavItem.selected");

        sliderEle.style.left = `${tabEle.offsetLeft}px`;
        sliderEle.style.width = `${tabEle.clientWidth}px`;
    };

    useEffect(() => {
        setTimeout(() => {
            tabChangeFn();
        }, 50);
    }, [selectedTab]);

    const onTabChangeHandler = newTab => {
        setSelectedTab(newTab);
    };

    return (
        <TabComponentWrapper id="Subscriptions">
            <TabNavHeader>
                <TabNavList selectedid={selectedTab.id} tabcount={tabs.length}>
                    {tabs.map(item => (
                        <TabNavItem
                            key={item.label}
                            className={item === selectedTab ? "TabNavItem selected" : "TabNavItem"}
                            onClick={() => onTabChangeHandler(item)}
                        >
                            <span>{`${item.label}`}</span>
                        </TabNavItem>
                    ))}
                    <div className="slider">
                        <div className="indicator"></div>
                    </div>
                </TabNavList>
            </TabNavHeader>
            <TabContentBox>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab ? selectedTab.label : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {selectedTab ? (
                            <selectedTab.content user={user} refetch={refetch} setRefetch={setRefetch} tabLabel={selectedTab.label} />
                        ) : (
                            "😋"
                        )}
                    </motion.div>
                </AnimatePresence>
            </TabContentBox>
        </TabComponentWrapper>
    );
};

export default SubscriptionsTabs;
