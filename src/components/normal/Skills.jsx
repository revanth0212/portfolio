import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.foreground};
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.muted};
  font-size: 1.1rem;
  margin-bottom: 3rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled.div`
  background-color: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateY(-2px);
  }
`;

const SkillCategory = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.accent};
  margin-bottom: 1rem;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillItem = styled.span`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.foreground};
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  font-size: 0.9rem;
  border: 1px solid ${props => props.theme.border};
`;

const Skills = () => {
  const { currentTheme } = useTheme();

  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Styled Components']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs']
    },
    {
      category: 'DevOps & Tools',
      items: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux', 'Nginx']
    },
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'SQL']
    }
  ];

  return (
    <Container>
      <Title theme={currentTheme}>Skills & Technologies</Title>
      <Subtitle theme={currentTheme}>
        Technologies and tools I work with regularly
      </Subtitle>
      <SkillsGrid>
        {skills.map((skillGroup, index) => (
          <SkillCard key={index} theme={currentTheme}>
            <SkillCategory theme={currentTheme}>
              {skillGroup.category}
            </SkillCategory>
            <SkillList>
              {skillGroup.items.map((skill) => (
                <SkillItem key={skill} theme={currentTheme}>
                  {skill}
                </SkillItem>
              ))}
            </SkillList>
          </SkillCard>
        ))}
      </SkillsGrid>
    </Container>
  );
};

export default Skills;
