import React from "react";
import { Card } from "react-bootstrap";

interface ProfileCardContainerProps {
  children: React.ReactNode;
}

const ProfileCardContainer: React.FC<ProfileCardContainerProps> = ({
  children,
}) => {
  return <Card style={{ width: "20rem" }}>{children}</Card>;
};

export default ProfileCardContainer;
