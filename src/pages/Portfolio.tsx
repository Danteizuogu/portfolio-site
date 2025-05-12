import { Box, SimpleGrid, Heading } from '@chakra-ui/react'
import ProjectPanel from '../components/ProjectPanel'

interface Project {
  id: string
  imageUrl: string
  projectName: string
  releaseDate: string
  projectLink?: string  // URL to live project
  githubLink?: string   // URL to GitHub repository
}

const Portfolio = () => {
  const projects: Project[] = [
    {
      id: "project1",
      imageUrl: "/images/projects/project1.jpg",
      projectName: "Project One",
      releaseDate: "January 2024",
      projectLink: "https://project1.com",  // Your live project URL
      githubLink: "https://github.com/yourusername/project1"  // Your GitHub repository URL
    },
    {
      id: "project2",
      imageUrl: "/images/projects/project2.jpg",
      projectName: "Project Two",
      releaseDate: "February 2024",
      projectLink: "https://project2.com",
      githubLink: "https://github.com/yourusername/project2"
    },
    {
      id: "project3",
      imageUrl: "/images/projects/project3.jpg",
      projectName: "Project Three",
      releaseDate: "March 2024",
      projectLink: "https://project3.com",
      githubLink: "https://github.com/yourusername/project3"
    }
  ]

  return (
    <Box py={8}>
      <Heading color="brand.dark" mb={8}>Portfolio</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {projects.map((project) => (
          <ProjectPanel
            key={project.id}
            imageUrl={project.imageUrl}
            projectName={project.projectName}
            releaseDate={project.releaseDate}
            projectLink={project.projectLink}
            githubLink={project.githubLink}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Portfolio 