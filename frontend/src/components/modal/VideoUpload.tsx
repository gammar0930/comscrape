import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface VideoUploadProps {
    formData: FormData;
    onFormDataUpdate: (updatedFormData: FormData) => void;
  }
  
const VideoUpload: React.FC<VideoUploadProps> = ({ formData, onFormDataUpdate }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        formData.append('video', file);

        onFormDataUpdate(formData);
        // // Replace 'YOUR_UPLOAD_API_ENDPOINT' with your actual API endpoint for handling file uploads
        // axios.post('http://localhost:8000', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // })
        //     .then((response) => {
        //         console.log('File uploaded successfully!', response.data);
        //         // You can handle success here, e.g., update state, show success message, etc.
        //     })
        //     .catch((error) => {
        //         console.error('Error uploading file:', error);
        //         // Handle errors here, e.g., show error message to the user
        //     });
    }, [formData, onFormDataUpdate]);

    const { getRootProps, getInputProps } = useDropzone({
        // accept: ['video/*'], // Specify accepted file types as an array
        onDrop,
    });

    return (
        <div>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop a video file here, or click to select one</p>
            </div>
        </div>
    );
};

const dropzoneStyles: React.CSSProperties = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

export default VideoUpload;
