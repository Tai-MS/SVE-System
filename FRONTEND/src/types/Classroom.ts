export interface Classroom {
  id: string
  title: string
  code: string
  instructor: string
  instructorAvatar?: string
  coverImage?: string
  coverColor?: string
  studentsCount?: number
  nextClass?: string
  description?: string
}
