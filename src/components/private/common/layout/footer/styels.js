import styled from "styled-components";

export const FooterText = styled.footer`
  display: flex;
  align-items: flex-end;
  margin-top: auto;
  padding: 0;
  border-top: 1px solid #657599;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.secForeground};

  a {
    text-decoration: none;
    padding: 0.5em 1em;
    color: ${(props) => props.theme.secForeground};
    text-transform: uppercase;
    height: 30px;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  a:hover {
    background: rgb(2, 0, 36);
    background: linear-gradient(102deg, rgba(2, 0, 36, 1) 0%, rgba(25, 138, 214, 1) 0%, rgba(8, 34, 95, 0) 83%);
    box-shadow: rgb(0 0 0 / 16%) -1px 0px 4px;
  }
  a svg {
    margin-right: 10px;
  }
`;
