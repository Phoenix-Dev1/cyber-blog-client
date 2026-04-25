const Image = ({ src, className, width, height, alt }) => {
  if (!src || typeof src !== "string" || src.trim() === "") {
    return null;
  }

  const isExternalUrl =
    src.startsWith("http://") || src.startsWith("https://");

  // For external URLs, render as-is
  if (isExternalUrl) {
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

  // Build ImageKit URL manually to avoid IKImage's empty-src initialization bug
  const endpoint = (import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "").replace(
    /\/$/,
    ""
  );
  const path = src.startsWith("/") ? src : `/${src}`;

  // Build transformation query string
  const trParts = [];
  if (width) trParts.push(`w-${width}`);
  if (height) trParts.push(`h-${height}`);
  const trQuery = trParts.length > 0 ? `?tr=${trParts.join(",")}` : "";

  const fullUrl = `${endpoint}${path}${trQuery}`;

  return (
    <img
      src={fullUrl}
      className={className}
      loading="lazy"
      width={width}
      height={height}
      alt={alt || "Image"}
    />
  );
};

export default Image;
