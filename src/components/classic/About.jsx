import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { personal } from '../../config/personal';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.foreground};
  margin-bottom: 2rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

const Content = styled.div`
  color: ${props => props.theme.foreground};
  line-height: 1.8;
  font-size: 1.05rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
  }
`;

const Highlight = styled.span`
  color: ${props => props.theme.accent};
  font-weight: 600;
`;

const Bold = styled.strong`
  font-weight: 700;
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

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1.5rem;
  }
`;

const InfoCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.foreground};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const About = () => {
  const { currentTheme } = useTheme();

  return (
    <Container>
      <Title theme={currentTheme}>About Me</Title>

      <Content>
        <Paragraph>
          I still remember the first time I tried to take apart a remote-controlled car just to see how the <Highlight theme={currentTheme}>'brain'</Highlight> worked. That same curiosity drives me today, but instead of toy cars, I'm diving into the world of <Highlight theme={currentTheme}>Artificial Intelligence</Highlight>.
        </Paragraph>

        <Paragraph>
          I believe that AI shouldn't feel like a secret language spoken only by engineers. My mission is to <Highlight theme={currentTheme}>strip away the jargon</Highlight> and make AI <Highlight theme={currentTheme}>super simple</Highlight> for everyone to understand. Whether you're a tech pro or just curious about the future, I'm here to bridge the gap between complex algorithms and everyday conversation.
        </Paragraph>

        <Paragraph>
          Let's make the future of tech something we can <Highlight theme={currentTheme}>all talk about</Highlight>.
        </Paragraph>

        <Paragraph>
          <Highlight theme={currentTheme}>Hi there!</Highlight> I'm {personal.name.full},
          a {personal.title} at {personal.company}.
        </Paragraph>

        <Paragraph>
          Currently based in <Highlight theme={currentTheme}>{personal.location}</Highlight>, I'm passionate
          about {personal.about.interests.join(', ')}.
        </Paragraph>

        <Paragraph>
          Feel free to check out my <StyledLink to="/blog">blog</StyledLink>, or
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
