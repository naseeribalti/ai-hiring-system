import React from 'react';
import { Link } from 'react-router-dom';
import './ResourcePages.css';

const CareerBlog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "5 Tips to Optimize Your Resume for AI Screening",
      excerpt: "Learn how to format your resume to ensure it gets properly parsed and ranked by AI systems.",
      category: "Resume Tips",
      readTime: "5 min read",
      date: "2024-01-15",
      image: "📄",
      featured: true
    },
    {
      id: 2,
      title: "How to Stand Out in a Competitive Job Market",
      excerpt: "Strategies to differentiate yourself from other candidates and catch recruiters' attention.",
      category: "Career Advice",
      readTime: "7 min read",
      date: "2024-01-12",
      image: "🎯"
    },
    {
      id: 3,
      title: "Understanding AI Match Scores: What They Mean for Your Job Search",
      excerpt: "A deep dive into how our AI calculates match scores and how you can improve yours.",
      category: "AI Insights",
      readTime: "6 min read",
      date: "2024-01-10",
      image: "🤖"
    },
    {
      id: 4,
      title: "The Future of Recruitment: AI and Machine Learning Trends",
      excerpt: "Explore how artificial intelligence is transforming the hiring landscape.",
      category: "Industry Trends",
      readTime: "8 min read",
      date: "2024-01-08",
      image: "🚀"
    },
    {
      id: 5,
      title: "Interview Preparation: Common Questions and Best Practices",
      excerpt: "Prepare effectively for your next job interview with our comprehensive guide.",
      category: "Interview Tips",
      readTime: "10 min read",
      date: "2024-01-05",
      image: "💼"
    },
    {
      id: 6,
      title: "Building a Professional Online Presence",
      excerpt: "How to create and maintain a professional digital footprint that attracts recruiters.",
      category: "Personal Branding",
      readTime: "6 min read",
      date: "2024-01-03",
      image: "🌐"
    }
  ];

  const categories = [
    { name: "All", count: blogPosts.length },
    { name: "Resume Tips", count: 1 },
    { name: "Career Advice", count: 1 },
    { name: "AI Insights", count: 1 },
    { name: "Industry Trends", count: 1 },
    { name: "Interview Tips", count: 1 },
    { name: "Personal Branding", count: 1 }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="resource-page">
      <div className="resource-header">
        <div className="container">
          <h1>Career Blog</h1>
          <p>Expert advice, industry insights, and career development tips</p>
        </div>
      </div>

      <div className="container">
        {/* Featured Post */}
        <div className="featured-post">
          {blogPosts.filter(post => post.featured).map(post => (
            <div key={post.id} className="featured-card">
              <div className="featured-content">
                <span className="category-badge">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="post-meta">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <button className="btn btn-primary">Read Article</button>
              </div>
              <div className="featured-image">
                <span className="post-emoji">{post.image}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="blog-layout">
          {/* Sidebar */}
          <div className="blog-sidebar">
            <div className="sidebar-section">
              <h3>Categories</h3>
              <div className="category-list">
                {categories.map((category, index) => (
                  <button key={index} className="category-item">
                    <span>{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Subscribe</h3>
              <p>Get the latest career tips and job market insights delivered to your inbox.</p>
              <div className="subscribe-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="form-input"
                />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Popular Tags</h3>
              <div className="tags">
                {['AI', 'Resume', 'Interview', 'Career Growth', 'Job Search', 'Skills'].map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="blog-content">
            <div className="posts-grid">
              {blogPosts.filter(post => !post.featured).map(post => (
                <article key={post.id} className="post-card">
                  <div className="post-emoji">{post.image}</div>
                  <div className="post-content">
                    <span className="post-category">{post.category}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="post-meta">
                      <span>{formatDate(post.date)}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <button className="btn btn-outline">Read More</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerBlog;