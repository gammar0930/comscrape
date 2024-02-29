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
