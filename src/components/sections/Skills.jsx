import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const SectionContainer = styled.section`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${props => props.theme.accent};
  border-bottom: 2px solid ${props => props.theme.accent};
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SkillCategory = styled.div`
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  padding: 1.5rem;
  background-color: ${props => props.theme.secondary};
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.accent};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: ${props => props.theme.background};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateX(5px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillName = styled.span`
  flex: 1;
  font-weight: 500;
`;

const SkillLevel = styled.div`
  display: flex;
  gap: 3px;
`;

const SkillDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props =>
    props.filled ? props.theme.accent : props.theme.border};
`;

const skillsData = [
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'Vue.js', level: 4 },
      { name: 'CSS/SCSS', level: 5 },
      { name: 'Next.js', level: 4 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 5 },
      { name: 'Python', level: 4 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'MongoDB', level: 4 },
      { name: 'GraphQL', level: 3 },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 5 },
      { name: 'Docker', level: 4 },
      { name: 'AWS', level: 3 },
      { name: 'CI/CD', level: 4 },
      { name: 'Linux', level: 4 },
    ],
  },
  {
    category: 'Other',
    icon: '📚',
    skills: [
      { name: 'Testing', level: 4 },
      { name: 'System Design', level: 4 },
      { name: 'UI/UX', level: 3 },
      { name: 'Agile/Scrum', level: 4 },
    ],
  },
];

const Skills = () => {
  const { currentTheme } = useTheme();

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>Skills & Technologies</SectionTitle>
      <p style={{ color: currentTheme.muted, marginBottom: '1rem' }}>
        Technologies and tools I work with regularly
      </p>
      <SkillsGrid>
        {skillsData.map((category) => (
          <SkillCategory key={category.category} theme={currentTheme}>
            <CategoryTitle theme={currentTheme}>
              {category.icon} {category.category}
            </CategoryTitle>
            <SkillList>
              {category.skills.map((skill) => (
                <SkillItem key={skill.name} theme={currentTheme}>
                  <SkillName>{skill.name}</SkillName>
                  <SkillLevel theme={currentTheme}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <SkillDot
                        key={level}
                        theme={currentTheme}
                        filled={level <= skill.level}
                      />
                    ))}
                  </SkillLevel>
                </SkillItem>
              ))}
            </SkillList>
          </SkillCategory>
        ))}
      </SkillsGrid>
    </SectionContainer>
  );
};

export default Skills;
