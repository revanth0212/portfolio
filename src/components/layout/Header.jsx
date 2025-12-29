import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';

const HeaderContainer = styled.header`
  padding: 1.5rem 2rem;
  border-bottom: 2px solid ${props => props.theme.accent};
  background-color: ${props => props.theme.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.foreground};
  margin: 0;
  font-family: 'Fira Code', monospace;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const HelpButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.border};
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  transition: all 0.3s ease;
  color: ${props => props.theme.foreground};

  &:hover {
    background-color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accent};
    color: ${props => props.theme.name === 'light' ? '#fff' : props.theme.background};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }
`;

const Header = ({ onToggleHelp }) => {
  const { currentTheme } = useTheme();

  return (
    <HeaderContainer theme={currentTheme}>
      <Title theme={currentTheme}>user@portfolio:~$</Title>
      <Controls>
        <HelpButton
          theme={currentTheme}
          onClick={onToggleHelp}
          aria-label="Show keyboard shortcuts"
          title="Help (?)"
        >
          ?
        </HelpButton>
        <ThemeToggle />
      </Controls>
    </HeaderContainer>
  );
};

export default Header;
