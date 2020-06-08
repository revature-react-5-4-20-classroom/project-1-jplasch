import axios from "axios";
import { User } from "../models/User";
import { Reimbursement } from "../models/Reimbursements";


const ersClient = axios.create({
    baseURL: "http://3.101.45.83:1999",
    withCredentials: true,
});

export async function login(un: string, pw: string): Promise<User> {
    try {
        const response = await ersClient.post("/login", {
            username: un,
            password: pw,
        });
        const {userId, username, password, firstName, lastName, email, role} = response.data;
        console.log(response.data);
        return new User(userId, username, password,
            firstName, lastName, email, role);
    } catch (e) {
        if (e.response.status === 401) {
            throw new Error(`Failed to authenticate with username ${un}`);
        } else {
            throw new Error("Error logging in");
        }
    }
}

export async function getAllUsers(): Promise<User[]> {
    const response = await ersClient.get("/users");
    return response.data.map((userObj: any) => {
        const {userId, username, password, firstName, lastName, email, role} = userObj;
        return new User( userId, username, password, firstName, lastName, email, role);
    });
}

export async function getAllReimbursements(): Promise<Reimbursement[]> {
    const response = await ersClient.get("/reimbursements");
    return response.data.map((reimbursementObj: any) => {
        const {reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type } = reimbursementObj;
        return new Reimbursement(reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type);
    });
}

export async function postNewReimbursement(r: Reimbursement): Promise<any> {
    try {
        const response = await ersClient.post("/reimbursements", {
            reimbursementId: r.reimbursementId,
            author: r.amount,
            amount: r.amount,
            dateSubmitted: r.dateSubmitted,
            dateResolved: r.dateResolved,
            description: r.description,
            resolver: r.resolver,
            status: r.status,
            type: r.type,
        });
    } catch (e) {
        throw e;
    }
}