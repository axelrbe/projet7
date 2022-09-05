import { useState, useEffect } from "react";
import "./Thumb.css";

const Thumb = ({ file, imageUrl }) => {
  const [thumb, setThumb] = useState(null);

  useEffect(() => {
    if (!file && !imageUrl) {
      return;
    } else if (!imageUrl) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setThumb(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setThumb(imageUrl);
    }
  }, [file, imageUrl]);

  return (
    <div>
      {thumb ? (
        <img
          src={thumb}
          alt={file && file.name}
          className="img__thumbnail"
          height={300}
          width={300}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Thumb;
