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
      imageUrl: "/project1.jpg",
      projectName: "Project One",
      releaseDate: "January 2024",
      projectLink: "https://project1.com",  // Your live project URL
      githubLink: "https://github.com/yourusername/project1"  // Your GitHub repository URL
    },
    {
      id: "project2",
      imageUrl: "/project2.jpg",
      projectName: "Project Two",
      releaseDate: "February 2024",
      projectLink: "https://project2.com",
      githubLink: "https://github.com/yourusername/project2"
    },
    {
      id: "project3",
      imageUrl: "/project3.jpg",
      projectName: "Project Three",
      releaseDate: "March 2024",
      projectLink: "https://project3.com",
      githubLink: "https://github.com/yourusername/project3"
    }
,
    {
      id: "project4",
      imageUrl: "/project4.jpg",
      projectName: "Project Four",
      releaseDate: "April 2024",
      projectLink: "https://project4.com",
      githubLink: "https://github.com/yourusername/project4"
    },
    {
      id: "project5",
      imageUrl: "/project5.jpg",
      projectName: "Project Five",
      releaseDate: "May 2024",
      projectLink: "https://project5.com",
      githubLink: "https://github.com/yourusername/project5"
    },
    {
      id: "project6",
      imageUrl: "/project6.jpg",
      projectName: "Project Six",
      releaseDate: "June 2024",
      projectLink: "https://project6.com",
      githubLink: "https://github.com/yourusername/project6"
    },
  ]

  return (
    <Box py={8}>
      <Heading color="brand.dark" mb={8}>My Projects</Heading>
      
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