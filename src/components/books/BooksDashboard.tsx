import React, { Fragment } from 'react'
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from "axios"
import Modal from './BookModal';
import StudentModal from '../students/StudentModal';
import StudentTableModal from '../students/StudentInfo';
import BookTable from './BookTable';
import moment from 'moment'
import { BookInfo } from '../types/bookInfo';
import { STATUS_TEXT, BookModalName, StudentModalName, STRING } from '../types/types';
import { StudentDetails } from '../types/studentDetails';

const BookDashboard = () => {
	const [booksData, setBooksData] = useState<BookInfo[]>([]);
	const [isBookModal, setIsBookModal] = useState<boolean>(false); 
	const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false)
	const [bookId, setBookId] = useState<number>()
	const [booksDetails, setBooksDetails] = useState<BookInfo | null>(null);
	const [isStudentDetailModalOpen, setIsStudentDetailModalOpen] = useState<boolean>(false)
	
  useEffect(() => {
    fetchData();
  },[])

  async function fetchData(): Promise<void> { // changes done
    try {
      const result = await axios.get("http://localhost:3500/");		
				
			if (result?.data?.length > 0){
				result.data.forEach((data: BookInfo) => {
					data?.studentDetail?.forEach((studentInfo: StudentDetails) => { // type
						const currentDate = moment(moment() , "YYYY-MM-DD");
            const returnBookDate = moment(studentInfo?.returnDate, "YYYY-MM-DD")
            const days = returnBookDate && returnBookDate.diff(currentDate, "days")
            if(days < 0) {
              data.isDue = true
            }  
					})
        })
        setBooksData(result.data)				
				return
			}
      setBooksData([])
    } catch(err) {
      console.log(err);
    }
  }

	async function deleteBookRecord(id: number) { // OK
		try {
			const bookAssigned: BookInfo | undefined = booksData.find((book) => (book.id === id))
			if(bookAssigned?.assigned) {
				return alert("This Book Is Assigned To Student. You Can Not Delete It.")
			}
			const result: AxiosResponse = await axios.delete(`http://localhost:3500/${id}`)
			if (result.statusText === STATUS_TEXT){ //
				fetchData()
			}
		}catch(err) {
			console.log(err);
		}
	}

	function assignBookHandler(id: number): void { // OK
		setBookId(id)
		handleStudentModel()
	}

	const handleStudentDetailModal = (): void => { // Ok
		setIsStudentDetailModalOpen(!isStudentDetailModalOpen)
	}

	async function returnBookHandler(id: number): Promise<void> { // Ok
		try {
			const response = await axios.delete(`http://localhost:3500/student/v1/${id}/returnBook`)
			if (response.statusText === STATUS_TEXT){ //
				fetchData()
			}
		} catch(err){
			console.log(err);
		}
	}

	const handleBookModal = async (id?: number): Promise<void> => { 
		if (Number(id)){
			const result = await bookDetailHandler(Number(id))
			setBooksDetails(result?.data)
			setIsBookModal(!isBookModal)
			return;
		}
		setBooksDetails(null)
		setIsBookModal(!isBookModal)
	}

	const handleStudentModal = async (id: number, uniqueString?: string) => {
		const result = await bookDetailHandler(Number(id))
		setBooksDetails(result?.data)
		if (uniqueString === STRING){ // constant
			handleStudentModel(Number(id))
			return;
		}			
		handleStudentDetailModal()
		return
	}
	
	const handleStudentModel = (id?: number): void => { //changes done
		if (id){
			return setIsStudentModalOpen(!isStudentModalOpen)
		}
		setBooksDetails(null)
		setIsStudentModalOpen(!isStudentModalOpen)
	}

	const bookDetailHandler = async (id: number): Promise<AxiosResponse |  null> => { // need types for 
		try {
			const result = await axios.get(`http://localhost:3500/book/${id}/getBookRecord`)
			console.log(">>>>", result);
			if(result?.statusText !== STATUS_TEXT) {
				return null;
			}
			return result;
		} catch (err) {
			const error = err as Error
			console.error('err', error);
			return null;
		}
	}

	return (
		<Fragment>
			<div className='add-books-wrapper'>
      	<button className = "add-book_button" onClick = {() => handleBookModal()}> Add New Book</button>
			</div>
			<BookTable
				booksData = {booksData}
				assignBookHandler={assignBookHandler}
				deleteBookRecord={deleteBookRecord}
				returnBookHandler={returnBookHandler}
				handleBookModal={handleBookModal}
				handleStudentModal = {handleStudentModal}
			/>

			{
				isBookModal && 
				<Modal 
					value = {booksDetails? BookModalName.EDIT_BOOK : BookModalName.ADD_BOOK} // constant
					handleBookModal={handleBookModal}
					data = {booksDetails}
					fetchData = {fetchData}
				/>
			}
			{
				isStudentModalOpen &&
				<StudentModal
					value = {booksDetails? StudentModalName.EDIT_STUDENT: StudentModalName.ADD_STUDENT} // same
					bookId = {bookId}
					data = {booksDetails}
					handleStudentModel = {handleStudentModel}
					fetchData={fetchData}
				/>
			}
			{
				isStudentDetailModalOpen &&
				<StudentTableModal
					data = {booksDetails?.studentDetail?.[0]}
					handleStudentTableModal = {handleStudentDetailModal}
				/>
			}
		</Fragment>
)
}

export default BookDashboard
