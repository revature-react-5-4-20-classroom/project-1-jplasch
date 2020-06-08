import React from "react";
import { Reimbursement } from "../models/Reimbursements";
import { toast } from "react-toastify";
import { Container, Row, Col, Spinner } from "reactstrap";
import { ObjectTable } from "./object-table";
import { NewReimbursementForm } from "./new-reimbursement-form";
import { getAllReimbursements } from "../api/client";

interface IReimbursementPageState {
    reimbursement: Reimbursement[];
    reimbursementLoaded: boolean;
}

export class ReimbursementPage extends React.Component<any, IReimbursementPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursement: [],
            reimbursementLoaded: false,
        };
    }

    async componentDidMount() {
        await this.fetchReimbursements();
    }

    addNewReimbursement = async () => {
        await this.fetchReimbursements();
    }

    fetchReimbursements = async () => {
        try {
            this.setState({
                reimbursement: await getAllReimbursements(),
                reimbursementLoaded: true,
            });
        } catch (e) {
            toast(e.message, {type:"error"});
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{size:7}}>
                        <h3>Reimbursements</h3>
                        {this.state.reimbursementLoaded ? (
                            <ObjectTable objects={this.state.reimbursement} />
                        ) : (
                            <Spinner />
                        )}
                    </Col>
                    <Col md={{size:3}}>
                        {this.props.loggedInUser ? <NewReimbursementForm addReimbursement={this.addNewReimbursement} /> : <h4>Must Login to add reimbursement</h4>}
                    </Col>
                </Row>
            </Container>
        )
    }
}