import { StudentDetails } from "./studentDetails"

export enum BookModalName {
  ADD_BOOK = "Add Book",
  EDIT_BOOK = "Edit Book"
}

export enum StudentModalName {
  ADD_STUDENT = "Add Student",
  EDIT_STUDENT = "Edit Student"
}

export enum BookStatus {
  AVALIABLE = 'Avaliable',
  NOT_AVALIABLE = 'Not Avaliable'
}

export enum CustomButtonValues {
  EDIT_STUDENT = "Edit Student",
  RETURN_BOOK = "Return Book",
  STUDENT_INFO = "Student Info",
  ASSIGN_BOOK = "Assign Book"
}

export const STATUS_TEXT = 'OK'
export const BOOLEAN_TRUE: boolean = true
export const BOOLEAN_FALSE: boolean = false
export const STRING = "Edit Student"

type responseType = {
  	config: any,
  	data: {
  		assigned: boolean,
  		author: string,
  		dition: number,
  		id: number,
  		name: string,
  		studentDetail: StudentDetails[]
  	},
  	headers: any,
  	request: any
  	status: number,
  	statusText: string,
}
