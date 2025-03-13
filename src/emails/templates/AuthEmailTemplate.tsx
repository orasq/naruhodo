import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

interface AuthEmailTemplateProps {
  titleText: string;
  mainText: string;
  button?: {
    label: string;
    href: string;
  };
  bottomText?: string;
}

export const AuthEmailTemplate = ({
  titleText,
  mainText,
  button,
  bottomText,
}: AuthEmailTemplateProps) => (
  <Html lang="en">
    <Body style={{ backgroundColor: "#f2f1eb", padding: "50px 30px" }}>
      <Head />
      <Container style={{ maxWidth: 500, margin: "0 auto" }}>
        <Img
          style={{ margin: "0 auto", paddingBottom: 30 }}
          src={`${process.env.NEXT_PUBLIC_APP_URL}/images/naruhodo-logo.png`}
          alt="Naruhodo"
          width="96"
          height="36"
        />

        <Section
          style={{
            padding: 30,
            backgroundColor: "#ffffff",
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <Heading
            as="h1"
            style={{
              marginBottom: 30,
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 22,
              fontWeight: "semibold",
              color: "#483e2b",
            }}
          >
            {titleText}
          </Heading>

          <Text
            style={{
              margin: 0,
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#483e2b",
            }}
            dangerouslySetInnerHTML={{ __html: mainText }}
          />

          <Section
            style={{
              paddingTop: 30,
            }}
          >
            {button && (
              <Button
                href={button.href}
                style={{
                  display: "inline-block",
                  padding: "12px 20px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  backgroundColor: "#483e2b",
                  color: "#ffffff",
                  borderRadius: 12,
                  fontWeight: "semibold",
                  textDecoration: "none",
                }}
              >
                {button.label}
              </Button>
            )}
          </Section>

          {bottomText && (
            <Text
              style={{
                margin: 0,
                paddingTop: 30,
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#483e2b",
              }}
              dangerouslySetInnerHTML={{ __html: bottomText }}
            />
          )}
        </Section>
      </Container>
    </Body>
  </Html>
);
