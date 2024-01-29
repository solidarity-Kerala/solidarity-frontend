import styled from "styled-components";
// Container for the dashboard section

export const DashboardSection = styled.div`
  margin: 30px;
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, 250px);
  height: auto;
  align-content: flex-start;
  @media screen and (max-width: 560px) {
    grid-template-columns: auto;
    width: auto;
  }
`;

export const Tile = styled.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(221, 221, 221);
  padding: 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: auto;
  border-radius: 12px;
  justify-content: space-between;
  align-items: center;
`;
export const TitleBox = styled.div`
  margin-top: 0;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: column;
`;
export const Title = styled.span`
  font-size: 16px;
  color: gray;
`;

export const Count = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const IconWrapper = styled.div`
  font-size: 25px;
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
`;
