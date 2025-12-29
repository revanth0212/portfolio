import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.foreground};
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
`;

const Content = styled.div`
  color: ${props => props.theme.foreground};
  line-height: 1.8;
  font-size: 1.05rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
`;

const Highlight = styled.span`
  color: ${props => props.theme.accent};
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.accent};
  text-decoration: none;
  border-bottom: 2px solid ${props => props.theme.accent}40;
  transition: all 0.2s ease;

  &:hover {
    border-bottom-color: ${props => props.theme.accent};
  }
`;

const InfoCard = styled.div`
  background-color: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: ${props => props.theme.cardShadow};
`;

const InfoCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.foreground};
  margin-bottom: 0.75rem;
`;

const About = () => {
  const { currentTheme } = useTheme();

  return (
    <Container>
      <Title theme={currentTheme}>About Me</Title>

      <Content>
        <Paragraph>
          <Highlight theme={currentTheme}>Hello, World!</Highlight> I'm a passionate developer
          who loves building elegant solutions to complex problems. Welcome to my
          corner of the internet.
        </Paragraph>

        <Paragraph>
          I specialize in <Highlight theme={currentTheme}>full-stack web development</Highlight>,
          with a focus on creating performant, accessible, and user-friendly applications.
          My expertise spans modern JavaScript frameworks, cloud architecture, and
          developer experience.
        </Paragraph>

        <Paragraph>
          When I'm not coding, you can find me contributing to open-source projects,
          writing technical blog posts, or exploring the latest in tech.
        </Paragraph>

        <Paragraph>
          Feel free to explore my <StyledLink to="/project">projects</StyledLink>,
          check out my <StyledLink to="/blog">blog</StyledLink>, or
          <StyledLink to="/contact"> get in touch</StyledLink>!
        </Paragraph>
      </Content>

      <InfoCard theme={currentTheme}>
        <InfoCardTitle theme={currentTheme}>Quick Tip</InfoCardTitle>
        <Content>
          You can switch between the Normal view and Terminal view using the toggle button
          in the header. The terminal view offers keyboard navigation for quick access.
        </Content>
      </InfoCard>
    </Container>
  );
};

export default About;
