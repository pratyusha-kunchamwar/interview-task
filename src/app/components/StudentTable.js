import React from "react";
import { Button } from "@mui/material";

const StudentTable = ({ students, handleEdit, handleDelete }) => {
  return (
    <div
      style={{
        overflowX: "auto",
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {" "}
      <table style={{ width: "85%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={style.tableHeader}>Student No.</th>
            <th style={style.tableHeader}>Name</th>
            <th style={style.tableHeader}>Gender</th>
            <th style={style.tableHeader}>Roll Number</th>
            <th style={style.tableHeader}>Branch</th>
            <th style={style.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "8px" }}>
                No data available
              </td>
            </tr>
          ) : (
            students.map((single, index) => (
              <tr
                key={single.roll_no}
                style={{ borderBottom: "0.1rem solid #f0f0f0" }}
              >
                <td style={style.tableData}>{index + 1}</td>
                <td style={style.tableData}>{single.name}</td>
                <td style={style.tableData}>{single.gender}</td>
                <td style={style.tableData}>{single.roll_no}</td>
                <td style={style.tableData}>{single.branch}</td>
                <td style={style.tableData}>
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(single.roll_no)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(single.roll_no)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// css
const style = {
  tableHeader: {
    padding: "0.5rem",
    textAlign: "left",
  },
  tableData: {
    padding: "0.7rem",
  },
};

export default StudentTable;
