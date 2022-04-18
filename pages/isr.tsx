import { GetStaticProps, NextPage } from 'next'
import { route } from 'next/dist/server/router'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from '../components/Layout'
import { Notice, Task } from '../types/types'
import { supabase } from '../utiles/supabase'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/isr invoked')
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })
  return {
    props: {
      tasks,
      notices,
    },
    revalidate:5
  }
}

type Props = {
  tasks: Task[]
  notices: Notice[]
}

const Isr: NextPage<Props> = ({ tasks, notices }) => {
   const router = useRouter()
  return ( <Layout title="ISR">
      <p>ISR</p>
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
      <Link href="/ssr" prefetch={false}>
        <a>Link to SSR</a>
      </Link>
      <button onClick={() => router.push('/ssr')}>Route to SSR</button>
    </Layout>
  )
}

export default Isr
