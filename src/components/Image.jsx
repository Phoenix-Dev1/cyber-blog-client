import { IKImage } from "imagekitio-react";

const Image = ({ src, className, width, height, alt }) => {
  if (!src || src.trim() === "") {
    // Avoid rendering the element if src is empty or null
    return null;
  }

  const isExternalUrl =
    src?.startsWith("http://") || src?.startsWith("https://");

  if (isExternalUrl) {
    // Render a regular <img> tag for external URLs
    return (
      <img
        src={src}
        className={className}
        loading="lazy"
        width={width}
        height={height}
        alt={alt || "Image"}
      />
    );
  }

  // Render <IKImage> for ImageKit paths
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      width={width}
      height={height}
      alt={alt || "Image"}
      transformation={[{ width: width, height: height }]}
    />
  );
};

export default Image;
