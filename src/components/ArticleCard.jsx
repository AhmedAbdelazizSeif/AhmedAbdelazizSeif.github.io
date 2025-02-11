// frontend/src/components/ArticleCard.jsx

import PropTypes from "prop-types";

import { Link } from 'react-router-dom';
import styles from '../styles/ArticleCard.module.css';

const ArticleCard = ({ article }) => {
  return (
    <div className={styles.card}>
      {/* If your image path is correct, show it */}
      {article.image && (
        <div className={styles.imageContainer}>
          <img
            src={`${article.image}`}
            alt={article.name}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{article.name}</h2>
        {/* A short snippet (or maybe truncated) of description */}
        {article.description && (
          <p className={styles.snippet}>
            {article.description.replace(/<[^>]+>/g, '').substring(0, 200)}...
          </p>
        )}

        {/* Link to the Single Article page */}
        <Link to={`/articles/${article.id}`} className={styles.readMore}>
          Read More
        </Link>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default ArticleCard;
