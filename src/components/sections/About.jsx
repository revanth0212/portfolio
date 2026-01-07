import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { personal } from '../../config/personal';

const SectionContainer = styled.section`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${props => props.theme.accent};
  border-bottom: 2px solid ${props => props.theme.accent};
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const ASCIIArt = styled.pre`
  font-size: 0.7rem;
  line-height: 1;
  color: ${props => props.theme.accent};
  background: transparent;
  border: none;
  padding: 0;
  margin-bottom: 2rem;
  overflow-x: auto;
  white-space: pre;
`;

const Content = styled.div`
  line-height: 1.8;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
`;

const Highlight = styled.span`
  color: ${props => props.theme.accent};
  font-weight: 600;
`;

const Bold = styled.strong`
  font-weight: 700;
`;

const Link = styled.a`
  color: ${props => props.theme.accent};
  text-decoration: none;
  border-bottom: 1px solid ${props => props.theme.accent};
  padding-bottom: 2px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

const About = () => {
  const { currentTheme } = useTheme();

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>About Me</SectionTitle>

      <ASCIIArt theme={currentTheme}>
{`
 ██████╗ ███████╗ █████╗ ██╗     ███████╗██████╗
██╔════╝ ██╔════╝██╔══██╗██║     ██╔════╝██╔══██╗
██║  ███╗█████╗  ███████║██║     █████╗  ██║  ██║
██║   ██║██╔══╝  ██╔══██║██║     ██╔══╝  ██║  ██║
╚██████╔╝███████╗██║  ██║███████╗███████╗██████╔╝
 ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝
`}
      </ASCIIArt>

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
          Feel free to check out my <Link href="/blog" theme={currentTheme}>blog</Link>, or
          <Link href="/contact" theme={currentTheme}> get in touch</Link>!
        </Paragraph>

        <Paragraph>
          <Highlight theme={currentTheme}>Fun fact:</Highlight> This portfolio is fully
          keyboard-navigable! Press <code>?</code> to see all available commands.
        </Paragraph>
      </Content>
    </SectionContainer>
  );
};

export default About;
