import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import { formatDate } from '../lib/utils';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Cybersecurity Blog - Emmanuel de Jesus M. Depina Jr.</title>
        <meta name="description" content="Exploring cybersecurity, ethical considerations, and core concepts. Professional insights from a cybersecurity expert and Army veteran." />
        <meta name="keywords" content="cybersecurity, ethical hacking, network security, encryption, vulnerability management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>Cybersecurity Blog</h1>
          <p className="tagline">Exploring Ethical Considerations and Core Concepts</p>
        </header>

        <section className="featured-post">
          <div className="blog-meta">
            <h2 style={{margin: 0, border: 'none', padding: 0, color: 'white'}}>Featured Article</h2>
            <div className="meta-content">
              <h3>Exploring Cybersecurity: Ethical Considerations and Core Concepts</h3>
              <p>With the world becoming more interconnected, the importance of cybersecurity can never be over-emphasised...</p>
              <Link href="/posts/cybersecurity-fundamentals" className="read-more">
                Read Full Article →
              </Link>
            </div>
          </div>
        </section>

        <section className="blog-posts">
          <h2>Latest Posts</h2>
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post.slug} className="post-card">
                <div className="post-meta">
                  <span className="date">{formatDate(post.date)}</span>
                  <span className="category">{post.category}</span>
                </div>
                <h3>
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="excerpt">{post.excerpt}</p>
                <div className="post-footer">
                  <Link href={`/posts/${post.slug}`} className="read-more">
                    Read More →
                  </Link>
                  <span className="read-time">{post.readTime} min read</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="author-section">
          <div className="footer">
            <h3>Meet the Author</h3>
            <div className="author-content">
              <div className="author-info-main">
                <h4>Emmanuel de Jesus M. Depina Jr.</h4>
                <p className="author-tagline">Cybersecurity Professional | Army Veteran | Digital Guardian</p>
                <div className="credentials">
                  <p>🎓 Bachelor of Science in Management/Finance - Park University</p>
                  <p>📚 Currently Pursuing: Bachelor's in Cybersecurity - Champlain College</p>
                  <p>🪖 Proud Army Veteran</p>
                  <div className="certifications">
                    <p className="cert-title">Professional Certifications & Training:</p>
                    <p>🔧 Information Technology Fundamentals Certification</p>
                    <p>💻 Software, Programming & Databases Specialist (IBM/Coursera)</p>
                    <p>🌐 Networking and Storage Systems Certification</p>
                    <p>🛠️ Hardware Systems Certification</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="quote-section">
              <p className="author-quote">
                "In cybersecurity, we don't just protect data—we protect dreams, businesses, and the future itself. Every line of code secured, every vulnerability patched, is a victory for digital freedom."
              </p>
              <p className="quote-author">- Emmanuel Depina Jr.</p>
            </div>
            <p className="footer-tagline">Defending the digital frontier, one security measure at a time 🛡️</p>
          </div>
        </section>
      </div>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
          color: #333;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
          padding: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
        }

        .header h1 {
          font-size: 3em;
          margin: 0 0 10px 0;
          border: none;
        }

        .tagline {
          font-size: 1.2em;
          opacity: 0.9;
          margin: 0;
        }

        .featured-post {
          margin-bottom: 60px;
        }

        .blog-meta {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 10px;
          text-align: center;
        }

        .meta-content h3 {
          color: white;
          margin: 15px 0;
        }

        .read-more {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          text-decoration: none;
          margin-top: 15px;
          transition: background 0.3s ease;
        }

        .read-more:hover {
          background: rgba(255,255,255,0.3);
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .post-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          font-size: 0.9em;
        }

        .date {
          color: #666;
        }

        .category {
          background: #3182ce;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8em;
        }

        .post-card h3 {
          margin: 0 0 15px 0;
          color: #2d3748;
        }

        .post-card h3 a {
          color: #2d3748;
          text-decoration: none;
        }

        .post-card h3 a:hover {
          color: #3182ce;
        }

        .excerpt {
          color: #666;
          margin-bottom: 20px;
        }

        .post-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .read-time {
          color: #999;
          font-size: 0.9em;
        }

        .author-section {
          margin-top: 80px;
        }

        .footer {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          border-radius: 12px;
          text-align: center;
        }

        .author-content {
          margin: 20px 0;
        }

        .author-info-main h4 {
          font-size: 1.8em;
          margin: 0;
          color: #fff;
        }

        .author-tagline {
          font-size: 1.1em;
          color: #e2e8f0;
          margin: 10px 0 20px 0;
        }

        .credentials {
          text-align: left;
          max-width: 600px;
          margin: 0 auto;
        }

        .certifications {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid rgba(255,255,255,0.2);
        }

        .cert-title {
          color: #ffd700;
          font-weight: bold;
        }

        .quote-section {
          background: rgba(255,255,255,0.1);
          padding: 20px;
          border-radius: 10px;
          margin: 25px 0;
          border-left: 4px solid #ffd700;
        }

        .author-quote {
          font-style: italic;
          font-size: 1.2em;
          margin: 0;
          color: #ffd700;
        }

        .quote-author {
          margin-top: 10px;
          font-weight: bold;
        }

        .footer-tagline {
          font-size: 0.9em;
          color: #cbd5e0;
          margin-top: 15px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 10px;
          }
          
          .posts-grid {
            grid-template-columns: 1fr;
          }
          
          .header h1 {
            font-size: 2em;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  
  return {
    props: {
      posts: posts.slice(0, 6) // Show latest 6 posts
    }
  };
}