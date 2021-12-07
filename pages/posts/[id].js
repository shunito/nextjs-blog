import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'

import { useRouter } from 'next/router';

import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticProps({ params, locale }) {
  const postData = await getPostData(params.id, locale)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths({ locales }) {
    const paths = getAllPostIds(locales)
    return {
      paths,
      fallback: false
    }
}

export default function Post({ postData }) {

    const { locale } = useRouter();
    return (
      <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article className="text-base font-normal text-black leading-relaxed">
        <h1 className="text-2xl font-medium text-black">{postData.title}</h1>
        <div className="text-right">
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    )
  }
