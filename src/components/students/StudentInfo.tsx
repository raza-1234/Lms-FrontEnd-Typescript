import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { StudentDetails } from '../types/studentDetails';

export type ParentProps = {
	data?: StudentDetails,
	handleStudentTableModal: () => void
}
const StudentInfo = ({data, handleStudentTableModal}: ParentProps) => {

  return (
    <div className='modal-wrapper'>
			<div className='modal-header'>
				<CloseIcon onClick ={handleStudentTableModal} />
			</div>
      <table className='studentTable'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Roll No</th>
						<th>Book Id</th>
						<th>Assigned Date</th>
						<th>Return Date</th>
					</tr>
				</thead>
        <tbody>
					<tr>
						<td>{data?.name}</td>
						<td>{data?.email}</td>
						<td>{data?.rollno}</td>
						<td>{data?.bookId}</td>
						<td>{data?.assignDate}</td>
						<td>{data?.returnDate}</td>
					</tr>
        </tbody>
      </table>
    </div>
  )
}

export default StudentInfo;
