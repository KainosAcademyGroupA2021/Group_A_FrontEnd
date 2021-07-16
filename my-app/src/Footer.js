import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
  Text
} from "./FooterStyles";

const Footer = () => {

  return (
    <Box style={{marginTop: "40px"}}>
      <h1 style={{ color: "white", 
                   textAlign: "Left", 
                   marginTop: "-50px",
                    }}>
        Kainos
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>Navigation</Heading>
            <FooterLink href="#">Capability</FooterLink>
            <FooterLink href="#">Band</FooterLink>
            <FooterLink href="#">Role</FooterLink>
            <FooterLink href="#">Job</FooterLink>
          </Column>
          <Column>
            <Heading>About us</Heading>
            <FooterLink href="https://www.kainos.com/about-us">About us</FooterLink>
            <FooterLink href="https://www.kainos.com/about-us/our-culture">Our Culture</FooterLink>
            <FooterLink href="https://www.kainos.com/about-us/our-approach">Our Approach</FooterLink>
            <FooterLink href="https://www.kainos.com/about-us/diversity-and-inclusion">Diversity and Inclusion</FooterLink>
            <FooterLink href="https://www.kainos.com/about-us/sustainability">Sustainability</FooterLink>
          </Column>
          <Column>
            <Heading>Investor Relations</Heading>
            <FooterLink href="https://www.kainos.com/investor-relations">Investor Relations</FooterLink>
            <FooterLink href="https://www.kainos.com/investor-relations/investor-tools">Investor Tools</FooterLink>
            <FooterLink href="https://www.kainos.com/investor-relations/results-and-presentations">Results and presentations</FooterLink>
            <FooterLink href="https://www.kainos.com/investor-relations/regulatory-news-and-events">Regulatory news and events</FooterLink>
            <FooterLink href="https://www.kainos.com/investor-relations/people-and-policies">People and policies</FooterLink>
          </Column>
          <Column>
            <Heading>Legal</Heading>
            <FooterLink href="https://www.kainos.com/information/privacy-notice">Privacy Notice</FooterLink>
            <FooterLink href="https://www.kainos.com/information/corporate-information">Corporate information</FooterLink>
            <FooterLink href="https://www.kainos.com/information/modern-slavery-statement">Modern Slavery statement</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://www.facebook.com/KainosSoftware/">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="https://www.linkedin.com/company/kainos">
              <i className="fab fa-linkedin">
                <span style={{ marginLeft: "10px" }}>
                  LinkedIn
                </span>
              </i>
            </FooterLink>
            <FooterLink href="https://twitter.com/KainosSoftware?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="https://www.youtube.com/c/kainos">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
      <Text>
      Copyright © 2021 Kainos. Registered in NI NI019370
      </Text>


      

    </Box>
  );
};

export default Footer;