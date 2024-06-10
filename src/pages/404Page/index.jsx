import { Col, Container, Row }                                  from "react-bootstrap";
import { InnerContent, PageTitle, SignInPage, TitleContainer }  from "./page404Style";
import { staggerVariants, tileVariants }                        from "../../utils/FmVariants";
import useElementHeight                                         from "../../hooks/useElementHeight";

const Page404 = () => {
    const elementHeight = useElementHeight(0);
    return (
        <SignInPage style={{ paddingTop: `${elementHeight}px` }}>
            <InnerContent variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
                <Container>
                    <Row>
                        <Col md={12}>
                            <TitleContainer variants={tileVariants}>
                                <PageTitle>Error 404: Page not found</PageTitle>
                                <p>There is nothing here!!</p>
                            </TitleContainer>
                        </Col>
                    </Row>
                </Container>
            </InnerContent>
        </SignInPage>
    );
};

export default Page404;
