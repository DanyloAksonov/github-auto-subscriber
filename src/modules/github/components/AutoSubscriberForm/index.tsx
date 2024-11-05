import { FC, useState } from "react";
import {
  autoSubscriberFormSchema,
  AutoSubscriberFormFieldsType,
} from "./schema";
import { Button, Col, Form, message, Modal, Row } from "antd";
import Input from "@modules/common/components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

const AutoSubscriberForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, formState } =
    useForm<AutoSubscriberFormFieldsType>({
      resolver: yupResolver(autoSubscriberFormSchema),
    });

  const followUsers = handleSubmit(async ({ token }) => {
    setIsLoading(true);

    const subscribe = async (usernames: string[]) => {
      const [username, ...restUsernames] = usernames;
      if (!username) {
        return;
      }
      try {
        await fetch(`https://api.github.com/user/following/${username}`, {
          method: "PUT",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            Authorization: `Bearer ${token}`,
          },
        });
        subscribe(restUsernames);
      } catch (error: any) {
        return error;
      }
    };
    try {
      await subscribe(userNames);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Form>
      <Row justify="center">
        <Col style={{ maxWidth: 640 }}>
          <Row>
            <Col>
              <Paragraph>
                <Title style={{ color: "#fff" }} level={4}>
                  Guide
                </Title>
                <ol style={{ color: "#fff", textAlign: "left" }}>
                  <li>
                    <a
                      href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
                      target="_blank"
                    >
                      Create a personal access GitHub token
                    </a>
                    , with selected <b>user:follow</b> scope <br />
                    <i>
                      P.S. You also may want to create a token for a short term,
                      for one time use only here
                    </i>
                  </li>
                  <li>Copy & paste generated token to the field below</li>
                  <li>Check that you have followed new users on GitHub</li>
                  <li>Remove GitHub token</li>
                </ol>
              </Paragraph>
              <Paragraph style={{ textAlign: "left" }}>
                <Button type="link" onClick={() => setIsModalOpen(true)}>
                  See full list of SysGears JS Devs
                </Button>
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={24} sm={18}>
              <Input.Controlled
                name="token"
                control={control}
                placeholder="Enter github token: ghp_..."
                autoComplete="off"
              />
            </Col>
            <Col span={24} sm={6}>
              <Button
                style={{
                  backgroundColor:
                    !formState.isValid || isLoading ? "gray" : "#fff",
                }}
                htmlType="submit"
                disabled={!formState.isValid || isLoading}
                onClick={followUsers}
              >
                FOLLOW USERS
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title="SysGears JS Devs list"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ol>
          {userNames.map((ghUsername) => {
            return <li key={ghUsername}>{ghUsername}</li>;
          })}
        </ol>
        <b>
          <a href="slack://user?team=TJ4TL1U14&id=U01RBTHTKTJ">Let me know</a>{" "}
          if I missed someone =)
        </b>
      </Modal>
    </Form>
  );
};
const userNames = [
  "Roman-Pieskov",
  "PashaSysGears",
  "SimonenkoYaroslav",
  "KoretskyiMax",
  "Merjey",
  "EddyDunda",
  "alexanderKhvostov",
  "dmitryd-sysgears",
  "vanuka77",
  "kovbasenko",
  "sstby",
  "Gorb1k",
  "perseverance50k",
  "vsevolodbvd",
  "anhromovyi",
  "bnwebdev",
  "dmytroipatov",
  "oleksii-babenko",
  "khanbabaev",
  "AndrewZinko",
  "olha-hoshko",
  "AndreyMartunyk",
  "DanyloVarlyhin",
  "serhii-sierov",
  "LuckyDnepr",
  "Drelanis",
  "alexeyzvegintcev",
  "DanyloAksonov",
  "Igor-Polischuk",
  "Tskate",
  "Dmytro-Onufrienko",
  "IliaKobalia",
  "SurokDima",
  "DenisShelmanov",
  "NaumZakletskiy",
  "RybalkaOleksandr",
  "Kate-SG",
];

export default AutoSubscriberForm;
