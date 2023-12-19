import React, {FC, FormEvent} from 'react'
import { useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios, {AxiosResponse} from "axios"
import moment from "moment"
import { StudentDetails } from '../types/studentDetails';
import { BookInfo } from '../types/bookInfo';
import { STATUS_TEXT } from '../types/types';

export type ParentProps = {
	value: string,
	bookId?: number, 
	data: BookInfo | null,
	handleStudentModel: (id?: number) => void,
	fetchData: () => void
}

const StudentModal = ({value, bookId, data, handleStudentModel, fetchData}: ParentProps) => {

	const [name, setName] = useState<string>(data?.studentDetail?.[0].name || "");
	const [rollNo, setRollNo] = useState<string>(data?.studentDetail?.[0].rollno || "")
	const [email, setEmail] = useState<string>(data?.studentDetail?.[0].email || "")
	const [assignDate, setAssignDate] = useState<string>(data?.studentDetail?.[0].assignDate || "");
	const [returnDate, setReturnDate] = useState<string>(data?.studentDetail?.[0].returnDate || "")
	
	async function submitHandler(event: FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();

		if (name.trim().length === 0 || rollNo.trim().length === 0 || email.trim().length === 0 ){
			alert("Required Fields Are Not Correct.")
			return ;
		}

		const object: StudentDetails = {
			name: name,
			rollno: rollNo,
			email: email,
			assignDate: assignDate,
			returnDate : returnDate
		}
		
		try {
			let response: AxiosResponse ; 
			if (data){
				const {bookId}: any = data.studentDetail?.[0];
				response = await axios.put(`http://localhost:3500/student/v1/${bookId}/updateStudent`, object)
			}
			else {
				response = await axios.post(`http://localhost:3500/student/v1/${bookId}/assignedBook`, object)
			}
			if (response.statusText === STATUS_TEXT){
				fetchData() 
				handleStudentModel()
			}

			setName("")
			setRollNo("")
			setEmail("")
			setAssignDate("")
			setReturnDate("")
			return
		} catch (err) {
			console.log(err);
		}
	}

  return (
    <div className='modal-Container'>
			<div className='modalHeader'>
				<h3>LMS</h3>
				<h3>{value}</h3>
				<CloseIcon onClick = {() => handleStudentModel()}/>
			</div>
			<hr/>
			<div className='modal'>
				<form className='addBookForm' onSubmit={submitHandler}>
					<input 
						required
						type='text'
						value={name}
						onChange = {(e) => (setName(e.target.value))}
						placeholder='Student Name'
					/>
					<br/><br/>
					<input 
						required
						type='text'
						value={rollNo}
						onChange = {(e) => setRollNo(e.target.value)}
						placeholder='Student Roll-No'
					/>
					<br/><br/>
					<input 
						required
						type='email'
						value={email}
						onChange = {(e) => setEmail(e.target.value)}
						placeholder='Student Email'
					/>
					<br/><br/>
					<input 
						required
						type='date'
						value={assignDate}
						onChange = {(e) => setAssignDate(e.target.value)}
						placeholder='Book Issue Date'
					/>
					<br/><br/>
					<input 
						required
						type='date'
						value={returnDate}
						onChange = {(e) => setReturnDate(e.target.value)}
						placeholder='Book Return Date'
						min={moment().format("YYYY-MM-DD")}
					/>
					<br/><br/>
					<button className='newBook'>{value}</button>
				</form>
			</div>
    </div>
  )
}

export default StudentModal
