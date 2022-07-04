import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import AvatarEditor from "react-avatar-editor";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ProfileCardContainer from "../components/ProfileCardContainer";
import ProfileImageEditor from "../components/ProfileImageEditor";
import ProfileCard from "../components/ProfileCard";
import PictureEdit from "../interfaces/PictureEdit";

const ProfilePage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [picture, setPicture] = useState<PictureEdit>({
    isEditorOpen: false,
    img: user?.picture || "",
    zoom: 1,
    rotate: 0,
    borderRadius: 0,
    croppedImg: user?.picture,
  });
  const [name, setName] = useState<string | undefined>(user?.name);
  const [nickname, setNickname] = useState<string | undefined>(user?.nickname);

  const handleChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeNicknameInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNickname(e?.target.value);
  };

  const switchEditor = () => {
    setPicture({
      ...picture,
      isEditorOpen: !picture.isEditorOpen,
    });
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <Col>
          <ProfileCardContainer>
            <ProfileCard
              {...{ ...user, picture: picture.croppedImg }}
              isEditorOpen={picture.isEditorOpen}
              switchEditor={switchEditor}
            />
          </ProfileCardContainer>
        </Col>
        <Col>
          {picture.isEditorOpen && (
            <ProfileImageEditor picture={picture} setPicture={setPicture} />
          )}
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={handleChangeNameInput} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              value={nickname}
              onChange={handleChangeNicknameInput}
            />
          </Form.Group>
          <Button>Edit</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
