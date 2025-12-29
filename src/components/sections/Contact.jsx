import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const SectionContainer = styled.section`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${props => props.theme.accent};
  border-bottom: 2px solid ${props => props.theme.accent};
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

const ContactCard = styled.div`
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  padding: 2rem;
  background-color: ${props => props.theme.secondary};
  margin-top: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateX(5px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactIcon = styled.span`
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.muted};
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.a`
  color: ${props => props.theme.foreground};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    color: ${props => props.theme.accent};
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  color: ${props => props.theme.foreground};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.name === 'light' ? '#fff' : props.theme.background};
    transform: translateY(-2px);
  }
`;

const Contact = () => {
  const { currentTheme } = useTheme();

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>Get In Touch</SectionTitle>
      <p style={{ color: currentTheme.muted }}>
        I'm a Senior Software Engineer at Adobe with 9+ years of experience.
        Always open to discussing new opportunities and ideas.
      </p>

      <ContactCard theme={currentTheme}>
        <ContactItem theme={currentTheme}>
          <ContactIcon>📧</ContactIcon>
          <ContactInfo>
            <ContactLabel theme={currentTheme}>Email</ContactLabel>
            <ContactValue href="mailto:revanth0212@gmail.com" theme={currentTheme}>
              revanth0212@gmail.com
            </ContactValue>
          </ContactInfo>
        </ContactItem>

        <ContactItem theme={currentTheme}>
          <ContactIcon>📍</ContactIcon>
          <ContactInfo>
            <ContactLabel theme={currentTheme}>Location</ContactLabel>
            <ContactValue theme={currentTheme}>Austin, Texas</ContactValue>
          </ContactInfo>
        </ContactItem>

        <ContactItem theme={currentTheme}>
          <ContactIcon>💼</ContactIcon>
          <ContactInfo>
            <ContactLabel theme={currentTheme}>Company</ContactLabel>
            <ContactValue theme={currentTheme}>Adobe</ContactValue>
          </ContactInfo>
        </ContactItem>
      </ContactCard>

      <SocialLinks>
        <SocialButton
          href="https://github.com/revanth0212"
          target="_blank"
          rel="noopener noreferrer"
          theme={currentTheme}
        >
          <span>🐙</span> GitHub
        </SocialButton>
        <SocialButton
          href="https://www.linkedin.com/in/revanth0212"
          target="_blank"
          rel="noopener noreferrer"
          theme={currentTheme}
        >
          <span>💼</span> LinkedIn
        </SocialButton>
      </SocialLinks>
    </SectionContainer>
  );
};

export default Contact;
