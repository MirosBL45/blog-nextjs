import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { GraphQLClient, gql } from 'graphql-request';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';

const graphcms = new GraphQLClient(
  'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clcs6pcji127t01t94ow29bx4/master'
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        publishedBy {
          id
        }
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Blog | Jovic Miroslav</title>
        <meta name="description" content="Next.JS BlogPost" />
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript, programming, ReactJS, Next.JS BlogPost"
        />
        <meta name="author" content="Miroslav Jovic" />
        <meta name="robots" content="index, follow" />
        <meta name="title" content="Next.JS BlogPost | ReactJS" />
        <meta property="og:title" content="Next.JS BlogPost | ReactJS" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Next.JS BlogPost" />
        <meta property="twitter:title" content="Next.JS BlogPost" />
        <meta property="twitter:description" content="Next.JS BlogPost" />
        <meta property="og:site_name" content="Next.JS BlogPost | ReactJS" />
        <meta property="analytics-s-channel" content="homepage" />
        <meta property="name" content="Next.JS BlogPost | ReactJS" />
        <meta property="description" content="Next.JS BlogPost" />
        <meta
          property="keywords"
          content="HTML, CSS, JavaScript, programming, ReactJS, Next.JS BlogPost"
        ></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logoMJ.png" />
        <link rel="shortcut icon" href="logoMJ.png" type="image/x-icon" />
      </Head>

      <h1 className="mainHeading">Welcome to our blog</h1>
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            {...post}
          // title={post.title}
          // author={post.author}
          // coverPhoto={post.coverPhoto}
          // key={post.id}
          // datePublished={post.datePublished}
          // slug={post.slug}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}
