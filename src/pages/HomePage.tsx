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
    const [filterValue, setFilterValue] = useState<string>('');
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

    const handleFilterChange = (e: any) => {
        setFilterValue(e.target.value);
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

    const handleDelete = (id: string) => {
        dispatch(deleteHuman(id));
        setSelectedHuman(null);
    };

    const handleGetHumans = useCallback(() => {
        if (!localStorage.humans) return;
        const localStorageHumans = JSON.parse(localStorage.humans);
        dispatch(getHumans(localStorageHumans));
    }, [dispatch]);

    const filterHumans = useCallback(() => {
        if (!filterValue) return setFilteredHumans(allHumans);

        const filterResult = Object.keys(allHumans).reduce((acc, item) => {
            const itemNameLower = allHumans[item].name.toLowerCase();
            const filterLower = filterValue.toLowerCase();
            // return itemNameLower.includes(filterLower);
            if (itemNameLower.includes(filterLower)) {
                return { ...acc, [item]: allHumans[item] };
            } else {
                return acc;
            }
        }, {});
        setFilteredHumans(filterResult);
    }, [allHumans, filterValue]);

    useEffect(() => {
        handleGetHumans();
    }, [handleGetHumans]);

    useEffect(() => {
        updateLocalStorage();
    }, [allHumans, updateLocalStorage]);

    useEffect(() => {
        filterHumans();
    }, [allHumans, filterHumans]);

    return (
        <div className="HomePage">
            <Container>
                <Row>
                    <Col sm={3}>
                        <FormControl
                            value={filterValue}
                            placeholder="Search.."
                            onChange={(e) => handleFilterChange(e)}
                            className="mt-3 mb-1"
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
                        {filteredHumans && (
                            <ListGroup>
                                {Object.keys(filteredHumans).map(
                                    (human: any) => {
                                        return (
                                            <ListGroup.Item
                                                key={human}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    handleSelectHuman(human);
                                                }}
                                            >
                                                {filteredHumans[human].name}
                                            </ListGroup.Item>
                                        );
                                    }
                                )}
                            </ListGroup>
                        )}
                    </Col>
                    <Col sm={9}>
                        {!!selectedHuman ? (
                            <div className="mt-2">
                                <p className="h2 mb-2">
                                    {`Selected human: ${allHumans[selectedHuman]?.name}`}
                                </p>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(selectedHuman)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ) : (
                            <p className="h2 mt-2 mb-2">Select human</p>
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
