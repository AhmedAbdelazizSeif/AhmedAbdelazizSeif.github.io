import {useMemo} from "react";
import {Link} from "react-router-dom";

import styles from "../styles/ProjectCard.module.css";

const ProjectCard = ({project}) => {
    const imageUrl = project.image
        ? `${project.image}`
        : "/placeholder.jpg";
    const truncatedDescription =
        project.description.length > 200
            ? `${project.description.slice(0, 200)}...`
            : project.description;

    const renderTags = useMemo(() => {
        let totalLength = 0;
        const visibleTags = [];

        for (const tag of project.tags) {
            if (totalLength + tag.length > 70) break;
            totalLength += tag.length;
            visibleTags.push(tag);
        }

        return (
            <div className={styles.tags}>
                {visibleTags.map((tag) => (
                    <span key={tag} className={styles.tag}>
            {tag}
          </span>
                ))}
                {/* If we truncated tags, show an ellipsis */}
                {totalLength < project.tags.join("").length && (
                    <span className={styles.tag}>...</span>
                )}
            </div>
        );
    }, [project.tags]);

    // Construct the detail URL: /projects/<hyphenated-name>
    const projectDetailUrl = `/projects/${encodeURIComponent(project.name)}`;

    return (
        <div className={styles.card}>
            <Link to={projectDetailUrl}> {/* Changed from <a> to <Link> */}
                <img
                    style={{borderRadius: "20px"}}
                    src={imageUrl}
                    alt={project.name}
                />
                <div className={styles.content}>
                    <h3>{project.name}</h3>
                    <p>{truncatedDescription}</p>

                    {/* Only show View Project button if description is truncated */}
                    {project.description.length > 200 && (
                        <Link className={styles.readMore} to={`/projects/${encodeURIComponent(project.name)}`}>
                            View Project
                        </Link>
                    )}

                    {renderTags}

                    <div className={styles.cta}>
                        {/* Link to the actual source code URL */}
                        {project.source_code && (
                            <a
                                href={project.source_code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.underline}
                            >
                                Source Code
                            </a>
                        )}

                        {/* Demo link */}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.underline}
                            >
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProjectCard;
