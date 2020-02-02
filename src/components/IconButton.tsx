import styled from "styled-components";

export const IconButton = styled.button`
  background: transparent;
  border: transparent;
  transition-duration: 0.2s;
  padding: 0;
  opacity: 0.5;
  :hover:not(:disabled) {
    opacity: 1;
  }
`;
