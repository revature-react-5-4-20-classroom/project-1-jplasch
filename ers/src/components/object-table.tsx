import React from "react";
import { Table } from "reactstrap";

interface IObjectTableProps {
    objects: object [];
}

export class ObjectTable extends React.Component<IObjectTableProps> {

    render() {
        return (
            <Table striped>
                <thead>
                    <tr>
                        {Object.keys(this.props.objects[0]).map((key:any) => {
                            return <th key={key}>{key}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.objects.map((obj: any, index: number) => {
                        return (
                            <tr key={index}>
                                {Object.values(obj).map((value: any, index: number) => {
                                    return <td key={index}>{value}</td>;
                                })}
                            </tr>
                    );
                })}
                </tbody>
            </Table>
        );
    }
}