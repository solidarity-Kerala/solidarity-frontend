import styled from "styled-components";
export const Header = styled.div`
  display: flex;
  padding: 10px;
  &.hd {
    justify-content: space-between;
    align-items: center;
  }
  @media (min-width: 768px) {
    &.hd {
      display: none;
    }
  }
`;
export const Nav = styled.nav`
  padding-top: 0 em;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.secForeground};
  overflow-y: auto;
  a.main,
  .open {
    text-decoration: none;
    color: ${(props) => props.theme.secForeground};
    padding-left: 1em;
    height: 50px;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  && {
    .down {
      a.main span,
      .open span {
        padding-right: 1em;
      }
    }
  }

  a.open {
    cursor: unset;
  }
  a.main.active,
  a.main:hover {
    background: linear-gradient(102deg, rgb(2, 0, 36) 0%, rgb(232 232 232) 0%, rgb(255, 255, 255) 83%);
    color: black;
    box-shadow: rgba(0, 0, 0, 0.16) -1px 0px 4px;
  }
  a.main.active:first-child,
  a.main:hover:first-child {
    border-top-left-radius: 12px;
  }
  a.main.active:last-child,
  a.main:hover:last-child {
    border-bottom-left-radius: 12px;
  }
  a.main.active::after {
    /* content: ""; */
    width: 6px;
    color: white;
    height: 100%;
    background: rgb(82 103 96);
    margin-left: auto;
  }
  a.main svg,
  .open svg {
    margin-right: 10px;
    width: 30px;
  }
`;
export const SubMenu = styled.nav`
  margin-left: 1em;
  padding-left: 0em;
  border-left: 1px solid lightgrey;
  border-radius: 12px 0 0 12px;
  &.close {
    display: none;
  }
`;
export const MenuGroup = styled.div`
  cursor: pointer;
  svg:last-child {
    margin-left: auto;
  }
`;
