import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import axios from "axios";
import './Capability.css'

import { Table } from "react-bootstrap";

const CapabilityPerJobFamily = () => {
  const [CapabilityName, setCapabilityName] = useState([]);
  const [JobFamilyName, setJobFamilyName] = useState([]);

  const list = CapabilityName.map((r) => {
          const { CapabilityID, CapabilityName, JobFamilyName} = r
          return (
              <tr >
                  <td>{JobFamilyName}</td>
                  <td>{CapabilityName}</td>
              </tr>
          )

  })
  const getCapabilityAndJobFamily = async (e) => {
      const res = await axios.get(`http://localhost:5000/getCapabilityAndJobFamily`)
      setCapabilityName(res.data);
}

getCapabilityAndJobFamily();
    return (
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>Job Family Name</th>
                            <th>Capability Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
            </div>
    )
}

export default CapabilityPerJobFamily;
