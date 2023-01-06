export interface Set {
  id: string
  createdAt: string
  reps: number
  user: User
  userId: string
  exercise: Exercise
  exerciseId: string
}

export interface User {
  id: string
  name: string
  imageUrl?: string
  sets:  Set[]
}

export interface Exercise {
  id: string
  name: string
  sets:  Set[]
}