import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ITrack from "../interfaces/Track";

const UploadTrackPage = () => {
  const [track, setTrack] = useState<ITrack>({
    title: "$orries",
    artist: "Peachy!",
    album: " Shiloh",
    image: ``,
    audio: ``,
  });

  const handleChange = (e: any, key: string) => {
    setTrack({
      ...track,
      [key]: e.currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    const url = process.env.REACT_APP_API_URL;
    const { data } = await axios.post(url, track, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Artist</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter artist"
          value={track.artist}
          onChange={(e) => handleChange(e, "artist")}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={track.title}
          onChange={(e) => handleChange(e, "name")}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Album name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter album name"
          value={track.album}
          onChange={(e) => handleChange(e, "album")}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Album picture</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => handleChange(e, "image")}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Audio</Form.Label>
        <Form.Control
          type="file"
          accept="audio/*"
          value={track.audio}
          onChange={(e) => handleChange(e, "audio")}
          required={true}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default UploadTrackPage;
