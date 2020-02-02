import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #e0e0e0;
  color: #000;

  align-items: center;
  div {
    flex-grow: 1;
    margin: 0 10px;
  }
`;

export const TextEditor = styled.input`
  flex-grow: 1;
`;
