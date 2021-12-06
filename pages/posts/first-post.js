import Head from 'next/head'
import Link from "next/link"
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>最初のポスト</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>トップページへ戻る</a>
        </Link>
      </h2>
    </Layout>
  )
}