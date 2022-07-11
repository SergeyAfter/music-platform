import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ITrack from "../interfaces/Track";

const UploadTrackPage = () => {
  const [track, setTrack] = useState<ITrack>({
    title: "$orries",
    artist: "Peachy!",
    album: "Shiloh",
    image: "",
    audio: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTrack({
      ...track,
      [name]: value,
    });
  };

  const handleChangeFile = (e: any) => {
    const { name, files } = e.target;

    setTrack({
      ...track,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e: any) => {
    const formData = new FormData();
    formData.append("image", track.image);
    formData.append("audio", track.audio);
    formData.append("title", track.title);
    formData.append("artist", track.artist);
    formData.append("album", track.album);

    const url = `${process.env.REACT_APP_API_URL}/api/tracks`;
    const { data } = await axios.post(url, formData, {
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
          name="artist"
          onChange={handleChange}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={track.title}
          name="title"
          onChange={handleChange}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Album name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter album name"
          value={track.album}
          name="album"
          onChange={handleChange}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Album picture</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChangeFile}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Audio</Form.Label>
        <Form.Control
          type="file"
          accept="audio/*"
          name="audio"
          onChange={handleChangeFile}
          required={true}
        />
      </Form.Group>

      <Button variant="primary" type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default UploadTrackPage;
