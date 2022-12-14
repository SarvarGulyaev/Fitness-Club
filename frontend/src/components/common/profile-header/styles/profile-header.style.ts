import styled from "styled-components";

export const GlobalProfileTemplate = styled.div`

`

export const UpperProfileHeaderTemplate = styled.div`
  background-color: #333;
  margin: 0 auto;
  padding: 25px;
  color: #fff;
  font-size: 18px;
  font-weight: normal;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const LowerProfileHeaderTemplate = styled.div`
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LogoBlock = styled.div`
  display: flex;
`

export const ProfileLogo = styled.div`
  margin: 0 100px 0 200px;
  display: flex;
  cursor: pointer;
`

export const ProfileTitle = styled.div`
  
    div {
      color: #968057;
    }
`

export const ProfileSection = styled.div`
  padding: 25px 100px;
  border: 1px solid #eee;
  
  &:hover {
    color: #968057;
    cursor: pointer;
  }
`

export const ProfileLogout = styled.div`
  cursor: pointer;

  &:hover {
    color: #7c7979;
  }
`