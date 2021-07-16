import { useState } from "react"
import axios from "axios";
import './Capability.css'

import { Table } from "react-bootstrap";

const CapabilityPerJobFamily = () => {
  const [CapabilityName, setCapabilityName] = useState([]);

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
      const res = await axios.get(`https://my.api:50001/getCapabilityAndJobFamily`)
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
