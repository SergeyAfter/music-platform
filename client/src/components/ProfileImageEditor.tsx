import React, { useRef, useState, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form } from "react-bootstrap";
import PictureEdit from "../interfaces/PictureEdit";
import axios from "axios";

interface ProfileImageEditorProps {
  picture: PictureEdit;
  setPicture: (picture: PictureEdit) => void;
}

const ProfileImageEditor: React.FC<ProfileImageEditorProps> = ({
  picture,
  setPicture,
}) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const editor = useRef<AvatarEditor>(null);

  const handleSlider = (e: any, type: string) => {
    setPicture({
      ...picture,
      [type]: e.target.value,
    });
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      isEditorOpen: false,
    });
  };

  const handleSave = async () => {
    if (editor.current) {
      const canvasScaled = editor.current?.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      if (user && user.sub) {
        try {
          const url = `${process.env.REACT_APP_API_URL}/upload`;
          const { data: imageUrl } = await axios.post(url, {
            image: croppedImg,
            userId: user.sub,
          });
          const token = await getAccessTokenSilently();
          const auth0Url = `${process.env.REACT_APP_AUTH0_AUDIENCE}users/${user?.sub}`;
          const options = {
            method: "PATCH",
            url: auth0Url,
            headers: {
              authorization: `Bearer ${token}`,
              "content-type": "application/json",
            },
            data: {
              user_metadata: { picture: imageUrl },
            },
          };

          await axios.request(options);

          window.location.reload();
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const handleFileChange = async (e: any) => {
    const preview = URL.createObjectURL(e.target.files[0]);

    setPicture({
      ...picture,
      img: preview,
      isEditorOpen: true,
    });
  };

  return (
    <div>
      <AvatarEditor
        ref={editor}
        image={picture?.img}
        width={220}
        height={250}
        border={50}
        borderRadius={picture.borderRadius}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={picture.zoom}
        rotate={picture.rotate}
        crossOrigin="anonymous"
      />
      <Form.Control type="file" onChange={handleFileChange} />
      <Form.Label>Zoom</Form.Label>
      <Form.Range
        aria-label="raceSlider"
        value={picture.zoom}
        min={1}
        max={10}
        step={0.1}
        onChange={(e) => handleSlider(e, "zoom")}
      />

      <Form.Label>Rotate</Form.Label>
      <Form.Range
        aria-label="raceSlider"
        value={picture.rotate}
        max={360}
        step={3.6}
        onChange={(e) => handleSlider(e, "rotate")}
      />

      <Form.Label>Border Radius</Form.Label>
      <Form.Range
        aria-label="raceSlider"
        value={picture.borderRadius}
        max={100}
        onChange={(e) => handleSlider(e, "borderRadius")}
      />

      <Button onClick={() => handleSave()}>Save</Button>
      <Button onClick={() => handleCancel()}>Cancel</Button>
    </div>
  );
};

export default ProfileImageEditor;
