import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  // Ensure posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      // Calculate reading time (rough estimate)
      const wordCount = matterResult.content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200); // 200 words per minute

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        category: matterResult.data.category || 'Cybersecurity',
        excerpt: matterResult.data.excerpt || generateExcerpt(matterResult.content),
        readTime,
        ...matterResult.data,
      };
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Convert markdown to HTML
  const content = marked(matterResult.content);

  // Calculate reading time
  const wordCount = matterResult.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return {
    slug,
    content,
    readTime,
    title: matterResult.data.title,
    date: matterResult.data.date,
    category: matterResult.data.category || 'Cybersecurity',
    excerpt: matterResult.data.excerpt || generateExcerpt(matterResult.content),
    tags: matterResult.data.tags || [],
    ...matterResult.data,
  };
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, '')
        }
      };
    });
}

function generateExcerpt(content, maxLength = 150) {
  // Remove markdown syntax and get plain text
  const plainText = content
    .replace(/[#*`]/g, '') // Remove basic markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
}

export function getRelatedPosts(currentSlug, category, limit = 3) {
  const allPosts = getAllPosts();
  
  return allPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}