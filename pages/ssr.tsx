import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from '../components/Layout'
import { Notice, Task } from '../types/types'
import { supabase } from '../utiles/supabase'

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('getServerSideProps/ssr invoked')
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })

  return {
    props: { tasks, notices },
  }
}

type Props = {
  tasks: Task[]
  notices: Notice[]
}
const Ssr: NextPage<Props> = ({ tasks, notices }) => {
  const router = useRouter()
  return (
    <Layout title="SSR">
      <p>Ssr</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>{notice.content}</li>
        ))}
      </ul>
      <Link href="/ssg" prefetch={false}>
        <a>Link to SSG</a>
      </Link>
      <Link href="/isr" prefetch={false}>
        <a>Link to ISR</a>
      </Link>
      <button onClick={() => router.push('/ssg')}>Route to ssg</button>
      <button onClick={() => router.push('/isr')}>Route to isr</button>
    </Layout>
  )
}

export default Ssr
