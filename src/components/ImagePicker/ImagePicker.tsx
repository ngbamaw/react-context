import React from 'react'
import styles from './ImagePicker.module.css';

const loadImage = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
    };

    reader.readAsDataURL(file);
  });
}

interface Props {
  src?: string;
  onChange?: (file: File, image?: string) => void;
}

const ImagePicker: React.FC<Props> = ({ src, onChange }) => {
  const [image, setImage] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(false);
  const fileInput = React.useRef<HTMLInputElement>(null);

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const result = await loadImage(file);
      setImage(result);
      onChange?.(file, result);
      setIsLoading(false);
    }
  };

  return (
    <label>
      {!image && !isLoading && <p className={styles.btn}>Choisir une image</p>}
      {isLoading && <p>Loading...</p>}
      {image && <img src={src} />}
      <input
        type="file"
        name="image"
        ref={fileInput}
        className={styles.fileInput}
        onChange={onChangeImage}
      />
    </label>
  );
};

export default ImagePicker