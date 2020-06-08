import React from "react";
import { User } from "../models/User";
import { NavItem, Nav, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

interface ITopNavProps {
    logoutUser: ()=>void;
    loggedInUser: User | null
}

export class TopNav extends React.Component<ITopNavProps> {
    render() {
        return (
            <Nav tabs>
                <NavItem>
                    <NavLink to="/home" className="nav-link" activeClassName="active">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                </NavItem>
                {/* <NavItem hidden={!!this.props.loggedInUser} to="/login" className="nav-link" activeClassName="active">Login</NavItem> */}
                <NavItem>
                    <NavLink hidden={!(this.props.loggedInUser && this.props.loggedInUser.role === 'Admin')} to="/users" className="nav-link" activeClassName="active">All Users</NavLink>
                </NavItem>
                <NavItem tag={()=>{return <Button hidden={!this.props.loggedInUser} onClick={this.props.logoutUser} color="secondary" outline>Logout</Button>}} />
                <NavItem>
                    <NavLink to="users" className="nav-link" activeClassName="active">Users</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="reimbursements" className="nav-link" activeClassName="active">Reimbursements</NavLink>
                </NavItem>
            </Nav>
        )
    }
}