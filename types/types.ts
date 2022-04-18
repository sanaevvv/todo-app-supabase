export type Task = {
  id: string
  title: string
  created_at: string
  user_id: string | undefined
}

export type Notice = {
  id: string
  content: string
  created_at: string
  user_id: string | undefined
}
