import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import Login from '../authentication/Login';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            modalLoginShow: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        let modalLoginClose = () => this.setState({ modalLoginShow: false });

        return(
            <Fragment>
                <Container>
                        <Row>
                            <Col>
                                <h1 className="text-center">Ekki</h1>
                            </Col>
                            
                        </Row>
                        
                        <div className="d-flex flex-column">
                            <ButtonGroup size="lg">
                                <Button
                                    variant="primary"
                                    onClick={() => this.setState({ modalLoginShow: true })}
                                    >
                                    Login
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => this.props.history.push('/user_registration')}
                                    >
                                    SignUp
                                </Button>
                            </ButtonGroup>
                            
                            <Login
                                show={this.state.modalLoginShow}
                                onHide={modalLoginClose}
                            />                        
                        </div>
 
                </Container>
                
            </Fragment>
        );
    }
    
}

export default Home;