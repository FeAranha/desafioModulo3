import { FiCalendar, FiUser, FiWatch } from "react-icons/fi";

import { GetStaticProps } from 'next';
import Head from 'next/head'
import Link from 'next/link'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

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

export default function Home({}: HomeProps  ) {
  return (
  <>
    <Head>
      <title>Desafio3 | Home</title>
    </Head>

    <main className={styles.contentContainer}>
    <div className={styles.contentPost}>  
      <h1>Como utilizar Hooks</h1>
      <p>Pensando em sincronização em vez de ciclos de vida.</p>
       <tr>
         <th>
           <FiCalendar /> 10 Mar 2022
         </th>
         <th> 
           <FiUser /> Felipe Aranha
         </th>
         <th>
           <FiWatch /> 4:20 
         </th>
       </tr>
    </div>
    <div className={styles.contentPost}>  
      <h1>Removendo um Hooks</h1>
      <p>Backup de Hooks, uma forma segura de alterações.</p>
       <tr>
         <th>
           <FiCalendar /> 09 Mar 2022
         </th>
         <th> 
           <FiUser /> Felipe Aranha
         </th>
         <th>
           <FiWatch /> 4:20 
         </th>
       </tr>
    </div>
    <div className={styles.contentPost}>  
      <h1>Criando um app CRA do zero</h1>
      <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App</p>
       <tr>
         <th>
           <FiCalendar /> 08 Mar 2022
         </th>
         <th> 
           <FiUser /> Felipe Aranha
         </th>
         <th>
           <FiWatch /> 4:20 
         </th>
       </tr>
       <a>Carregar mais posts</a>
    </div>
    </main>

  </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
