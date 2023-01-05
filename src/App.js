import  { useState, useEffect } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import './App.css'

const StudentAttendance = () => {
  const [students, setStudents] = useState([]);
  const [studentCount, setStudentCount] = useState(0);

  const addStudent = (rollNumber, name, checkInTime) => {
    if(rollNumber&&name){
    if(students.find((student) => student.rollNumber === rollNumber))
    {
      console.log("The student is already present")
    }
    else{
      const newStudent = { rollNumber, name, checkInTime, checkOutTime: null };
      setStudents([...students, newStudent]);
      setStudentCount(studentCount + 1);
    }
  }
  else{
    console.log("Enter the valid data");
  }
  };

  const checkOutStudent = (rollNumber) => {
    const updatedStudents = students.map((student) => {
      if (student.rollNumber === rollNumber) {
        return { ...student, checkOutTime: new Date() };
      }
      return student;
    });
    setStudents(updatedStudents);
    setStudentCount(studentCount - 1);
  };

  useEffect(() => {
    console.log(`Number of students in school: ${studentCount}`);
  }, [studentCount]);

  return (
    <div className="">
      <h2 style={{marginLeft:"40%", fontFamily:"monospace", marginBottom:"5rem", fontSize:"2rem"}}>Student Attendance</h2>
      <div className="form-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const rollNumber = event.target.rollNumber.value;
          const name = event.target.name.value;
          addStudent(rollNumber, name, new Date());
          event.target.reset();
        }}
      >
        <label>
          Roll Number:
          <input type="text" name="rollNumber" />
        </label>
      
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        
        <Button variant="contained" color="success" type="submit">Check In</Button>

        
      </form>
      <div style={{backgroundColor:"wheat", borderRadius:"50%", marginLeft:"20rem", paddingTop:"3rem", padding:"2rem", fontFamily:"monospace", fontSize:"1.2rem"}} > Total Students : <span >{studentCount}</span></div>
      </div>
      <br />
      {/* <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Check In Time</th>
            <th>Check Out Time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.checkInTime.toLocaleString()}</td>
              <td>
                {student.checkOutTime
                  ? student.checkOutTime.toLocaleString()
                  : "Not checked out"}
              </td>
              <td>
                {!student.checkOutTime && (
                  <button
                    onClick={() => checkOutStudent(student.rollNumber)}
                  >
                    Check Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

    


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Roll Number </TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Check In Time</TableCell>
            <TableCell align="right">Check Out Time</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.rollNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.rollNumber}
              </TableCell>
              <TableCell align="right">{student.name}</TableCell>
              <TableCell align="right">{student.checkInTime.toLocaleString()}</TableCell>
              <TableCell align="right">{student.checkOutTime
                  ? student.checkOutTime.toLocaleString()
                  : "Not checked out"}</TableCell>
                  <TableCell align="right">{!student.checkOutTime && (
                  <button
                    onClick={() => checkOutStudent(student.rollNumber)}
                  >
                    Check Out
                  </button>
                )}</TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



    </div>
  );
};

export default StudentAttendance;
