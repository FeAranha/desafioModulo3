import { useState } from 'react'
import { FiCalendar, FiUser } from 'react-icons/fi'
import { GetStaticProps } from 'next'
import ptBR from 'date-fns/locale/pt-BR'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link'

import { getPrismicClient } from '../services/prismic'

import commonStyles from '../styles/common.module.scss'
import styles from './home.module.scss'
import { format } from 'path'


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}


interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps ): JSX.Element {
  const [nextPosts, setNextPosts] = useState<Post[]>(postsPagination.results)
  const [nextPage, setNextPage] = useState<string | null>(
    postsPagination.next_page
  );
/*
  function formatDate(date: string): string {
    return format(new Date(date), 'dd MMM yyyy', { locale: ptBR })
  }
*/  
  async function handleSeeMore(): Promise<void> {
    try {
      const response = await fetch(nextPage);
      const data = await response.json();

      setNextPage(data.next_page);

      const posts: Post[] = data.results.map(
        post =>
          ({
            uid: post.uid,
            data: {
              author: post.data.author,
              title: post.data.title,
              subtitle: post.data.subtitle,
            },
            first_publication_date: post.first_publication_date,
          } as Post)
      );

      setNextPosts(prevState => [...prevState, ...posts]);
    } catch (err) {
      throw new Error(err);
    }
    
  }

  return (
  <>
    <Head>
      <title>Desafio3 | Home</title>
    </Head>

    <main className={styles.container}>
      {nextPosts.map(post =>(
         <a key={post.uid} href="">
         <strong>{post.data.title}</strong>
         <p>{post.data.subtitle}</p>
         <th>
         <time><FiCalendar /> {post.first_publication_date}</time>
         </th>
         <th>
           <FiUser />{post.data.author}
         </th>
        
      </a>
      ))}

   {nextPage && (
        <button
          type="button"
          onClick={handleSeeMore}
          className={styles.loadMoreButton}
        >
          Carregar mais posts
        </button>
      )}

    </main>

  </>
  )
}

 export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 2,
    }
  );

  return {
    props: {
      postsPagination: postsResponse,
    },
  };
};