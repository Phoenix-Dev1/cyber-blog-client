import { toast } from "sonner";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import PropTypes from "prop-types"; // For prop validation
import api, { errorMessage } from "../api/client";

// ImageKit asks the API to sign each upload (logged-in users only)
const authenticator = async () => {
  try {
    const { data } = await api.get("/posts/upload-auth");
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    // sessionExpired: the "session expired" message was already shown
    throw Object.assign(new Error(errorMessage(error, "The upload couldn't be authorized.")), {
      sessionExpired: error.sessionExpired,
    });
  }
};

const Upload = ({ children, type, setProgress, setData, className, style }) => {
  const ref = useRef(null);

  // Handle upload error
  const onError = (err) => {
    console.error(err);
    if (err?.sessionExpired) return;
    toast.error(
      err.message || "Upload Failed. Please try again or check your connection."
    );
  };

  // Handle upload success
  const onSuccess = (res) => {
    setData(res);
    toast.success("Upload Successful!");
  };

  // Handle upload progress
  const onUploadProgress = (progress) => {
    const percentage = Math.round((progress.loaded / progress.total) * 100);
    setProgress(percentage);
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden" // Hide the actual file input
        ref={ref}
        accept={`${type}/*`} // Accept specified file type
      />
      {/* Custom upload button */}
      <div
        className={`cursor-pointer ${className || ""}`}
        style={style}
        onClick={(e) => {
          e.preventDefault(); // Prevent accidental form submission
          if (ref.current) {
            ref.current.value = null; // Clear the input value to allow selecting the same file again
            ref.current.click(); // Trigger file input click
          }
        }}
      >
        {children}
      </div>
    </IKContext>
  );
};

// Prop validation for better debugging and stricter type checking
Upload.propTypes = {
  children: PropTypes.node.isRequired, // Content to render inside the upload button
  type: PropTypes.oneOf(["image", "video"]).isRequired, // Specify file type (image or video)
  setProgress: PropTypes.func.isRequired, // Function to handle progress state
  setData: PropTypes.func.isRequired, // Function to handle uploaded data
  className: PropTypes.string, // Optional custom CSS classes for the wrapper
  style: PropTypes.object, // Optional inline styles for the wrapper
};

export default Upload;
