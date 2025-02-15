import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('https://ahmedseif-b19da891d605.herokuapp.com/api/projects');
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadProjects();
  }, []);

  return (
    <div>
      <h3>Stuff I've Built So Far</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
