import React from 'react'
import CustomButton from '../shared/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BookInfo } from '../types/bookInfo';
import { BookStatus, CustomButtonValues } from '../types/types';

type ParentProps = { 
  booksData: BookInfo[],
  assignBookHandler: (id: number) => void,
  deleteBookRecord: (id: number) => void ,
  returnBookHandler: (id: number) => void ,
  handleBookModal: (id: number) => void,
  handleStudentModal: (id: number, uniqueString?: string) => void
}

const BookTable = (props: ParentProps) => { 

  const {
    booksData,
    assignBookHandler,
    deleteBookRecord,
    returnBookHandler,
    handleBookModal,
    handleStudentModal
  } = props

  return (
    <table className='books-table'>
      <thead>
        <tr>
          <th>Book Name</th>
          <th>Author Name</th>
          <th>Book Edition</th>
          <th>Status</th>
          <th>Del/Edit</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          booksData.length > 0 ? 
          booksData.map((data, index:number) => (
            <tr key = {index} className = {data.isDue ? "dueDatePassed": ""}> 
              <td>{data.name.charAt(0).toUpperCase()}{data.name.slice(1)}</td>
              <td>{data.author.charAt(0).toUpperCase()}{data.author.slice(1)}</td>
              <td>{data.edition}</td>
              <td>{data.assigned ? BookStatus.NOT_AVALIABLE : BookStatus.AVALIABLE}</td>
              <td>
                <DeleteIcon className = "book_delete_icon" onClick = {() => (deleteBookRecord(data.id!))}/> 
                <EditIcon onClick = {() => handleBookModal(data.id!)}/> 
              </td>
              <td>
                {
                  data.assigned ? 
                  <div>
                    <CustomButton value = {CustomButtonValues.EDIT_STUDENT} clickFunction={() => (handleStudentModal(data.id!, "Edit Student"))}/>
                    <CustomButton value= {CustomButtonValues.RETURN_BOOK} clickFunction={() => (returnBookHandler(data.id!))}/>
                    <CustomButton value= {CustomButtonValues.STUDENT_INFO} clickFunction={() => (handleStudentModal(data.id!))}/>
                  </div>
                  :<CustomButton value= {CustomButtonValues.ASSIGN_BOOK} clickFunction={() => assignBookHandler(data.id!)}/>
                }
              </td>
          </tr>
          ))
          :<tr>
            <td></td>
            <td></td>
            <td>No Book Exist.</td>
            <td></td>
            <td></td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default BookTable


