import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <Copyright>© 2021 Mesto Russia</Copyright>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  margin: 100px 0 60px 0;

  @media (max-width: 680px) {
    margin: 70px 0 37px 0;
  }
`;
const Copyright = styled.p`
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  color: #545454;
  margin: 0;

  @media (max-width: 680px) {
    font-size: 14px;
    line-height: 17px;
    margin: 0 0 0 19px;
  }
`;
