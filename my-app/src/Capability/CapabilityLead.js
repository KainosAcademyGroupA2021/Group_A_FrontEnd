import { useState } from "react"
import axios from "axios";
import './Capability.css'

import { Table } from "react-bootstrap";

const CapabilityLead = () => {
  const [CapabilityName, setCapabilityName] = useState([]);


const list = CapabilityName.map((r) => {
          const { CapabilityName, CapabilityLeadName, CapabilityLeadPhoto, CapabilityLeadMessage} = r
          return (
              <tr >
                  <td>{CapabilityName}</td>
                  <td>{CapabilityLeadName}</td>
                  <td>{CapabilityLeadPhoto}</td>
                  <td>{CapabilityLeadMessage}</td>
              </tr>
          )
  })
const getCapabilityLeads = async (e) => {
const res = await axios.get(`http://localhost:5000/getCapabilityLeads`)
setCapabilityName(res.data);
}
getCapabilityLeads();
      return (
              <div className="caplead-table">
                  <Table >
                      <thead>
                          <tr>
                              <th>Capability Name</th>
                              <th>Capability Lead Name</th>
                              <th>Capability Lead Photo</th>
                              <th>Capability Lead Message</th>
                          </tr>
                      </thead>
                      <tbody>
                          {list}
                      </tbody>
                  </Table>
              </div>
      )
  }

  export default CapabilityLead;
