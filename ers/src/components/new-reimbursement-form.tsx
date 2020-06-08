import React from "react";
import { Reimbursement } from "../models/Reimbursements";
import { toast } from "react-toastify";
import { Input, Form, FormGroup, Label } from "reactstrap";
import { postNewReimbursement } from "../api/client";

interface INewReimbursementFormProps {
    addReimbursement: ()=>void
}

interface INewReimbursementFormState {
    reimbursementId: number;
    author: number;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status: number;
    type: number;
}

export class NewReimbursementForm extends React.Component<INewReimbursementFormProps, INewReimbursementFormState> {
    constructor(props:any) {
        super(props);
        this.state = {
            reimbursementId: 0,
            author: 0,
            amount: 0,
            dateSubmitted: 0,
            dateResolved: 0,
            description: '',
            resolver: 0,
            status: 0,
            type: 0,
        }
    }

    submitReimbursement = async (submitEvent:any) => {
        submitEvent.preventDefault();
        try {
            const reimbursement = new Reimbursement(this.state.reimbursementId, this.state.author, this.state.amount, this.state.dateSubmitted, this.state.dateResolved,
            this.state.description, this.state.resolver, this.state.status, this.state.type);
            await postNewReimbursement(reimbursement);
            toast(`${reimbursement.reimbursementId} added successfully!`, {type: "success"});
            this.props.addReimbursement()
            this.clearForm();
        } catch (e) {
            toast(e.message, {type:"error"});
        }
    }

    clearForm = () => {
        this.setState({
            reimbursementId: 0,
            author: 0,
            amount: 0,
            dateSubmitted: 0,
            dateResolved: 0,
            description: '',
            resolver: 0,
            status: 0,
            type: 0,
        })
    }

    bindInputChangeToState = (changeEvent:any) => {
        this.setState({})
    }

    render() {
        return (
            <Form onSubmit={this.submitReimbursement}>
                <FormGroup>
                    <Label for="reimbursementId">Reimbursement ID</Label>
                    <Input
                        onChange={this.bindInputChangeToState}
                        value={this.state.reimbursementId}
                        type="number"
                        name="reimbursementId"
                        id="reimbursementId"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="author">Author</Label>
                    <Input
                        onChange={this.bindInputChangeToState}
                        value={this.state.author}
                        type="number"
                        name="author"
                        id="author"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input
                        onChange={this.bindInputChangeToState}
                        value={this.state.amount}
                        type="number"
                        name="amount"
                        id="amount"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dateSubmitted">Date Submitted</Label>
                    <Input
                        onChange={this.bindInputChangeToState}
                        value={this.state.dateSubmitted}
                        type="date"
                        name="dateSubmitted"
                        id="dateSubmitted"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dateResolved">Date Resolved</Label>
                    <Input
                        onChange={this.bindInputChangeToState}
                        value={this.state.dateResolved}
                        type="date"
                        name="dateResolved"
                        id="dateResolved"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        onChange={this.bindInputChangeToState}
                        value={this.state.description}
                        type="text"
                        name="description"
                        id="description"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="resolver">Resolver</Label>
                    <Input
                        onChange={this.bindInputChangeToState}
                        value={this.state.resolver}
                        type="number"
                        name="resolver"
                        id="resolver"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="status">Status</Label>
                    <Input
                        onChange={this.bindInputChangeToState}
                        value={this.state.status}
                        type="number"
                        name="status"
                        id="status"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="type">Type</Label>
                    <Input
                        onChange={this.bindInputChangeToState}
                        value={this.state.type}
                        type="number"
                        name="type"
                        id="type"
                        required
                    />
                </FormGroup>
            </Form>
        )
    }


}