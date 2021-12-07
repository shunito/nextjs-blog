import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import Alert from '../components/alert'
import { getSortedPostsData } from '../lib/posts'

import { loadNamespaces } from './_app'

export async function getStaticProps({ locale }) {
  const allPostsData = getSortedPostsData(locale)
  return {
    props: {
      allPostsData,
      _ns: await loadNamespaces(['common'], locale)
    }
  }
}

export default function Home({ allPostsData }) {

  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { t, lang } = useTranslation('common')

  return (
    <Layout home>
      <Head>
        <title>{t('site-title')}</title>
      </Head>
      <section className="text-xl font-normal text-black leading-normal">
        <p>{t('author')}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <p>
          <Link href="/posts/first-post">
          <a>{t('first-page')}</a>
          </Link>
        </p>
        <Alert type="success">Alert Success</Alert>
      </section>
      <section className="m-4">
        <p>Current locale: {locale}</p>
        <h2 className="text-2xl font-medium text-black">Blog</h2>
        <ul className="mt-4 list-none">
          {allPostsData.map(({ id, date, title }) => (
            <li className="mt-4 " key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="text-gray-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
