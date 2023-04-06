import styles from '../../styles/Slug.module.css';
import { GraphQLClient, gql } from 'graphql-request';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';
import { useRouter } from 'next/router';

const graphcms = new GraphQLClient(
  'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clcs6pcji127t01t94ow29bx4/master'
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {
  const router = useRouter();
  function handleGoBack() {
    router.back();
  }

  return (
    <>
      <main className={styles.blog}>
        {/* <div className={styles.goHomeContainer}>
          <Link className={styles.goHome} href={'/'}>
            <p>
              <span>Go home</span>
            </p>
          </Link>
        </div> */}
        <img
          src={post.coverPhoto.url}
          className={styles.cover}
          alt={post.title}
          title={post.title}
        />
        <div className={styles.title}>
          <div className={styles.authdetails}>
            <img src={post.author.avatar.url} alt={post.author.name} />
            <div className={styles.authtext}>
              <h6>By {post.author.name}</h6>
              <h6 className={styles.date}>{post.datePublished}</h6>
            </div>
          </div>
          <h2>{post.title}</h2>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        ></div>
      </main>
      <Contact />
      <div className={styles.bottomGoHomeContainer}>
          <button onClick={handleGoBack} className={styles.bottomGoHome}>
            <span>Go home</span>
          </button>
        {/* <Link className={styles.bottomGoHome} href={'/'}>
          <p>
            <span>Go home</span>
          </p>
        </Link> */}
      </div>
      <Footer />
    </>
  );
}
