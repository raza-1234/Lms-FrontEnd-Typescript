import { StudentDetails } from "./studentDetails"

export type BookInfo = {
  id?: number,
  name: string,
  author: string,
  edition: number,
  assigned: boolean,
  isDue?: boolean,
  studentDetail?: StudentDetails[]
}
