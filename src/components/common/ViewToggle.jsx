import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useView } from '../../context/ViewContext';
import { useHotkeys } from 'react-hotkeys-hook';

const ToggleButton = styled.button`
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
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accent};
    color: ${props => props.theme.name === 'light' || props.theme.name === 'normal-light' ? '#fff' : props.theme.background};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }
`;

const ViewToggle = () => {
  const { currentTheme } = useTheme();
  const { view, toggleView } = useView();

  useHotkeys('ctrl+v', (e) => {
    e.preventDefault();
    toggleView();
  });

  const getIcon = () => {
    return view === 'terminal' ? '📄' : '💻';
  };

  const getLabel = () => {
    return view === 'terminal' ? 'Normal' : 'Terminal';
  };

  return (
    <ToggleButton
      onClick={toggleView}
      aria-label={`Switch to ${view === 'terminal' ? 'normal' : 'terminal'} view`}
      title={`Toggle view (${getLabel()}) - Ctrl+V`}
      theme={currentTheme}
    >
      <span>{getIcon()}</span>
      <span>{getLabel()}</span>
    </ToggleButton>
  );
};

export default ViewToggle;
