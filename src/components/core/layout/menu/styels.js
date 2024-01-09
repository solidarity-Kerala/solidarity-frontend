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
  padding-top: 0em;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.secForeground};
  padding-bottom: 1em;
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
    font-size: 14px;
    transition: all 0.2s;
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
    color: ${(props) => props.theme.secForeground};
    box-shadow: rgba(0, 0, 0, 0.16) -1px 0px 4px;
    font-weight: bold;
    opacity: 1;
  }
  .down a.main.active:first-child,
  .down a.main:hover:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .down a.main.active:last-child,
  .down a.main:hover:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
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
    transition: all 0.2s;
    margin-right: 10px;
    width: 30px;
  }
  a.main.active svg,
  a.main:hover svg {
    width: 30px;
    transform: scale(1.1);
  }
`;
export const SubMenu = styled.nav`
  margin-left: 1em;
  margin-right: 1em;
  padding-left: 0em;
  border: 1px solid #f2e5e5;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 10px 2px;
  &.close {
    display: none;
  }
  a {
    border-bottom: 1px solid #dfdfdf;
  }
  a:last-child {
    border-bottom: 0;
  }
`;
export const MenuGroup = styled.div`
  cursor: pointer;
  transition: all 0.2s;
  svg:last-child {
    margin-left: auto;
  }
  &.active svg:last-child {
    transform: rotate(180deg) scale(1.1);
    font-weight: bold;
    opacity: 1;
  }
`;
