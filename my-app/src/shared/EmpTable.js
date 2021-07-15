import { Form, FormLabel, Table } from "react-bootstrap"

const EmpTable = (props) => {
    const list = props.list;
    const setSearchTerm = props.setSearchTerm;
    const columns = props.columns;
   
    return (
        <div>
            <FormLabel
                label="Search Term"
                className="searchBar"
            >
                <Form.Control type="search" placeholder="Search for role, capability or band name" onChange={(e) => setSearchTerm(e.target.value)} />
            </FormLabel>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            {columns.map(column => <th>{column}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
            </div>
        </div>
    )   
}

export default EmpTable;
