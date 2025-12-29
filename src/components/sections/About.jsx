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
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
`;

const Highlight = styled.span`
  color: ${props => props.theme.accent};
  font-weight: 600;
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
          <Highlight theme={currentTheme}>Hello!</Highlight> I'm Revanth Kumar Annavarapu,
          a Senior Software Engineer at Adobe with over 9 years of experience in
          frontend development and software engineering.
        </Paragraph>

        <Paragraph>
          I specialize in <Highlight theme={currentTheme}>building scalable web applications</Highlight>,
          distributed systems, and developer tools. My expertise spans frontend frameworks,
          backend architecture, database design, and network security.
        </Paragraph>

        <Paragraph>
          I hold a Master's degree from <Highlight theme={currentTheme}>The University of Texas at Dallas</Highlight>
          and have a Cisco Certified Network Associate certification. Throughout my career,
          I've worked on projects ranging from IoT systems to real-time e-commerce platforms
          and distributed database systems.
        </Paragraph>

        <Paragraph>
          Currently based in <Highlight theme={currentTheme}>Austin, Texas</Highlight>, I'm passionate
          about clean code, elegant architecture, and mentoring other developers.
        </Paragraph>

        <Paragraph>
          Feel free to explore my <Link href="/projects" theme={currentTheme}>projects</Link>,
          check out my <Link href="/blog" theme={currentTheme}>blog</Link>, or
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
