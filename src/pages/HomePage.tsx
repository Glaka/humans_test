import React, { useCallback, useEffect, useState } from 'react';

import {
    Button,
    Col,
    Container,
    FormControl,
    ListGroup,
    Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addHuman, deleteHuman, getHumans } from '../actions/users';
import AddHumanComponent from '../components/AddHumanComponent/AddHumanComponent';

const HomePage = () => {
    const [selectedHuman, setSelectedHuman] = useState<any>(null);
    const [filteredHumans, setFilteredHumans] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const allHumans = useSelector((state: any) => state.humanReducer);
    const dispatch = useDispatch();

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const updateLocalStorage = useCallback(() => {
        const stringifiedHumans = JSON.stringify(allHumans);
        localStorage.setItem('humans', stringifiedHumans);
    }, [allHumans]);

    const handleChange = (e: any) => {
        // console.log(e.target.value);
    };

    const handleSelectHuman = (id: string) => {
        setSelectedHuman(id);
    };

    const handleAddHuman = (human: string) => {
        const date = new Date();
        const id = date.getTime();
        const humanData = {
            id,
            name: human,
        };
        dispatch(addHuman(humanData));
    };

    const handleDelete = (id: any) => {
        console.log('delete id ', id);
        dispatch(deleteHuman(id));
        setSelectedHuman(null);
    };

    const handleGetHumans = useCallback(() => {
        if (!localStorage.humans) return;
        const localStorageHumans = JSON.parse(localStorage.humans);
        dispatch(getHumans(localStorageHumans));
    }, [dispatch]);

    useEffect(() => {
        handleGetHumans();
    }, [handleGetHumans]);

    useEffect(() => {
        updateLocalStorage();
    }, [allHumans, updateLocalStorage]);

    return (
        <div className="HomePage">
            <Container>
                <Row>
                    <Col sm={3}>
                        <FormControl
                            placeholder="Search.."
                            onChange={(e) => handleChange(e)}
                            className="mt-1 mb-1"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <Button
                            variant="primary"
                            className="mt-1 mb-1"
                            style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            onClick={() => handleShowModal()}
                        >
                            New Human
                        </Button>
                        {allHumans && (
                            <ListGroup>
                                {Object.keys(allHumans).map((human: any) => {
                                    return (
                                        <ListGroup.Item
                                            key={human}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                handleSelectHuman(human);
                                            }}
                                        >
                                            {allHumans[human].name}
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        )}
                    </Col>
                    <Col sm={9}>
                        {!!selectedHuman ? (
                            <>
                                <p>
                                    Selected human:
                                    {allHumans[selectedHuman]?.name}
                                    {selectedHuman}
                                </p>
                                <p>
                                    id {Object.keys(allHumans[selectedHuman])}
                                </p>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(selectedHuman)}
                                >
                                    Delete
                                </Button>
                            </>
                        ) : (
                            <p>Select human</p>
                        )}
                    </Col>
                </Row>
            </Container>
            <AddHumanComponent
                closeModal={handleCloseModal}
                show={showModal}
                addHuman={handleAddHuman}
            />
        </div>
    );
};

export default HomePage;
