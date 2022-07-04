import React from "react";
import { User } from "@auth0/auth0-react";
import { Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface ProfileCardProps extends User {
  switchEditor: () => void;
  isEditorOpen: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  picture,
  name,
  nickname,
  email,
  isEditorOpen,
  switchEditor,
}) => {
  return (
    <Form>
      <div style={{ position: "relative" }}>
        <Card.Img variant="top" src={picture} />
        <Form.Check.Input
          checked={isEditorOpen}
          className="edit-icon-container"
          onChange={switchEditor}
        />
        <FontAwesomeIcon icon={faEdit} size="2x" className="edit-icon" />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Title>{nickname}</Card.Title>
        <Card.Text>{email}</Card.Text>
      </Card.Body>
    </Form>
  );
};

export default ProfileCard;
