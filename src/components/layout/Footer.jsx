import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const FooterContainer = styled.footer`
  padding: 1.5rem 2rem;
  border-top: 2px solid ${props => props.theme.accent};
  background-color: ${props => props.theme.secondary};
  text-align: center;
  margin-top: auto;
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.muted};
  margin: 0;
  font-family: 'Fira Code', monospace;
`;

const FooterLink = styled.a`
  color: ${props => props.theme.accent};
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const Footer = () => {
  const { currentTheme } = useTheme();

  return (
    <FooterContainer theme={currentTheme}>
      <FooterText theme={currentTheme}>
        Built with React & Styled Components • Hosted on{' '}
        <FooterLink
          href="https://pages.github.com/"
          target="_blank"
          rel="noopener noreferrer"
          theme={currentTheme}
        >
          GitHub Pages
        </FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
