import React, {FormEvent} from 'react'
import {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios, {AxiosResponse} from "axios"
import { BookInfo } from '../types/bookInfo';
import { BookStatus, STATUS_TEXT, BOOLEAN_FALSE, BOOLEAN_TRUE} from "../types/types"

export type ParentProps  = {
	value: string,
	data: BookInfo | null ,
	fetchData: () => void,
	handleBookModal: () => void 
}

const Modal = ({handleBookModal, value, data, fetchData}: ParentProps ) => {

	const [name, setName] = useState<string>(data?.name || "");
	const [author, setAuthor] = useState<string>(data?.author || "");
	const [edition, setEdition] = useState<number>(data?.edition || 1);
	const [status, setStatus] = useState<string>(data?.assigned ? BookStatus.NOT_AVALIABLE : BookStatus.AVALIABLE);
	
	async function submitHandler(event: FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();
		try {
			if (name.trim().length === 0 || author.trim().length === 0 ){
				alert("Required Fields Are Not Entered Properly");
				return;
			}

			const object: BookInfo = {
				name,
				author,
				edition,
				assigned: status ===  BookStatus.AVALIABLE ? BOOLEAN_FALSE : BOOLEAN_TRUE // 
			}
			let response: AxiosResponse;
			if (data){
				response = await axios.put(`http://localhost:3500/${data.id}`, object);
			} else{
				response = await axios.post("http://localhost:3500/", object);
			}
			if (response.statusText === STATUS_TEXT){ //
				fetchData()
				handleBookModal() 
			}
			setName("");
			setAuthor("")
			setEdition(1)
			setStatus("")
			// return;
		}catch(err) {
			console.log(err);
		}
	}

  return (
    <div className='modal-Container'>
			<div className='modalHeader'>
				<h3>LMS</h3>
				<h3>{value}</h3>
				<CloseIcon onClick = {handleBookModal}/>
			</div>
			<hr/>
			<div className='modal'>
				<form className='addBookForm' onSubmit={submitHandler}>
					<input 
						required
						type='text'
						value={name}
						onChange = {(e) => (setName(e.target.value))}
						placeholder='Book Name'
					/>
					<br/><br/>
					<input 
						required
						type='text'
						value={author}
						onChange = {(e) => setAuthor(e.target.value)}
						placeholder='Author Name'
					/>
					<br/><br/>
					<input 
						required
						type='Number'
						value={edition}
						onChange = {(e) => setEdition(Number(e.target.value))}
						min={1}
						placeholder='Edition'
					/>
					<br/><br/>
					<select 
						required
						value={status}
						onChange = {(e) => setStatus(e.target.value)}
					>
						<option disabled = {data && data.studentDetail?.length !== 0 || false}>Available</option>
						<option disabled = {!data || data.studentDetail?.length === 0}>Not Available</option>
					</select>
					<br/><br/>
					<button className='newBook'>{value}</button>
				</form>
			</div>
    </div>
  )
}

export default Modal
