import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  overflow: scroll;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  overflow: scroll;
  margin: 10px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 10px;
    color: #fff;
  }
`;
