interface IPictureEdit {
  isEditorOpen: boolean;
  img: string;
  zoom: number;
  rotate: number;
  borderRadius: number;
  croppedImg: string | undefined;
}

export default IPictureEdit;
