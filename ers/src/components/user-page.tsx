import React from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Spinner } from "reactstrap";
import { ObjectTable } from "./object-table";
import { getAllUsers } from "../api/client";

export class UserPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            usersLoaded: false,
        };
    }

    async componentDidMount() {
        try {
            this.setState({
                users: await getAllUsers(),
                usersLoaded: true,
            });
        } catch (e) {
            toast(e.message, {type:"error"});
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{size:5}}>
                        <h3>Users</h3>
                        {this.state.usersLoaded ? (
                            <ObjectTable objects={this.state.users} />
                        ) : (
                            <Spinner />
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}