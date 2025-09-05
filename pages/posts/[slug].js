import Head from 'next/head';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '../../lib/posts';
import { formatDate } from '../../lib/utils';

export default function BlogPost({ post, relatedPosts }) {
  if (!post) {
    return (
      <div className="container">
        <h1>Post not found</h1>
        <Link href="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - Cybersecurity Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`cybersecurity, ${post.category}, ${(post.tags || []).join(', ')}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Home</Link> / <span>Blog Posts</span> / <span>{post.title}</span>
        </nav>

        <article className="blog-post">
          <header className="post-header">
            <div className="post-meta">
              <span className="category">{post.category}</span>
              <span className="date">{formatDate(post.date)}</span>
              <span className="read-time">{post.readTime} min read</span>
            </div>
            <h1>{post.title}</h1>
            {post.excerpt && (
              <p className="excerpt">{post.excerpt}</p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </header>

          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          <footer className="post-footer">
            <div className="author-bio">
              <h3>About the Author</h3>
              <div className="bio-content">
                <strong>Emmanuel de Jesus M. Depina Jr.</strong>
                <p>Cybersecurity Professional | Army Veteran | Digital Guardian</p>
                <p>Currently pursuing Bachelor's in Cybersecurity at Champlain College with multiple industry certifications.</p>
              </div>
            </div>
          </footer>
        </article>

        {relatedPosts && relatedPosts.length > 0 && (
          <section className="related-posts">
            <h2>Related Articles</h2>
            <div className="related-grid">
              {relatedPosts.map(relatedPost => (
                <div key={relatedPost.slug} className="related-card">
                  <span className="related-category">{relatedPost.category}</span>
                  <h3>
                    <Link href={`/posts/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p>{relatedPost.excerpt}</p>
                  <div className="related-meta">
                    <span>{formatDate(relatedPost.date)}</span>
                    <span>{relatedPost.readTime} min read</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="navigation">
          <Link href="/" className="back-home">
            ← Back to All Posts
          </Link>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .breadcrumb {
          margin-bottom: 30px;
          font-size: 0.9em;
          color: #666;
        }

        .breadcrumb a {
          color: #3182ce;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .blog-post {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          margin-bottom: 40px;
        }

        .post-header {
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 2px solid #e2e8f0;
        }

        .post-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          font-size: 0.9em;
          flex-wrap: wrap;
        }

        .category {
          background: #3182ce;
          color: white;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.8em;
        }

        .date, .read-time {
          color: #666;
        }

        .post-header h1 {
          font-size: 2.5em;
          margin: 0 0 15px 0;
          color: #1a365d;
          line-height: 1.2;
        }

        .excerpt {
          font-size: 1.2em;
          color: #4a5568;
          font-style: italic;
          margin: 20px 0;
        }

        .tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .tag {
          background: #edf2f7;
          color: #4a5568;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8em;
        }

        .post-content {
          font-size: 1.1em;
          line-height: 1.8;
        }

        .post-content h2 {
          color: #2d3748;
          margin-top: 40px;
          margin-bottom: 20px;
          font-size: 1.8em;
          border-left: 4px solid #3182ce;
          padding-left: 15px;
        }

        .post-content h3 {
          color: #4a5568;
          margin-top: 30px;
          margin-bottom: 15px;
          font-size: 1.3em;
        }

        .post-content p {
          margin-bottom: 20px;
        }

        .post-content ul, .post-content ol {
          margin-bottom: 20px;
          padding-left: 30px;
        }

        .post-content li {
          margin-bottom: 8px;
        }

        .post-content a {
          color: #3182ce;
          text-decoration: none;
        }

        .post-content a:hover {
          text-decoration: underline;
        }

        .post-content blockquote {
          border-left: 4px solid #3182ce;
          padding-left: 20px;
          margin: 30px 0;
          font-style: italic;
          color: #4a5568;
          background: #f7fafc;
          padding: 20px;
          border-radius: 4px;
        }

        .post-content code {
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .post-content pre {
          background: #1a202c;
          color: #e2e8f0;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 20px 0;
        }

        .post-content pre code {
          background: none;
          padding: 0;
          color: inherit;
        }

        .post-footer {
          margin-top: 50px;
          padding-top: 30px;
          border-top: 2px solid #e2e8f0;
        }

        .author-bio {
          background: #f7fafc;
          padding: 25px;
          border-radius: 8px;
          border-left: 4px solid #3182ce;
        }

        .author-bio h3 {
          margin: 0 0 15px 0;
          color: #2d3748;
        }

        .bio-content strong {
          color: #1a365d;
          font-size: 1.1em;
        }

        .bio-content p {
          margin: 5px 0;
          color: #4a5568;
        }

        .related-posts {
          margin: 40px 0;
        }

        .related-posts h2 {
          color: #2d3748;
          margin-bottom: 30px;
          font-size: 1.8em;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .related-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .related-card:hover {
          transform: translateY(-3px);
        }

        .related-category {
          background: #3182ce;
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 0.7em;
        }

        .related-card h3 {
          margin: 15px 0 10px 0;
          font-size: 1.1em;
        }

        .related-card h3 a {
          color: #2d3748;
          text-decoration: none;
        }

        .related-card h3 a:hover {
          color: #3182ce;
        }

        .related-card p {
          color: #666;
          font-size: 0.9em;
          margin-bottom: 15px;
        }

        .related-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.8em;
          color: #999;
        }

        .navigation {
          text-align: center;
          margin: 40px 0;
        }

        .back-home {
          display: inline-block;
          background: #3182ce;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.3s ease;
        }

        .back-home:hover {
          background: #2c5282;
        }

        @media (max-width: 768px) {
          .container {
            padding: 10px;
          }

          .blog-post {
            padding: 20px;
          }

          .post-header h1 {
            font-size: 2em;
          }

          .post-meta {
            flex-direction: column;
            gap: 10px;
          }

          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      notFound: true
    };
  }

  const relatedPosts = getRelatedPosts(params.slug, post.category, 3);
  
  return {
    props: {
      post,
      relatedPosts
    }
  };
}