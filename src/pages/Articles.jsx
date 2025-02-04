// frontend/src/pages/ArticlesPage.jsx
import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import styles from '../styles/ArticlesPage.module.css';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://ahmedseif-b19da891d605.herokuapp.com/api/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Welcome to My Writing Section </h1>

      <div className={styles.articlesGrid}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
