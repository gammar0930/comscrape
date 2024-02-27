import React, { useState, ChangeEvent } from 'react';

interface AudioUploadProps {
    onUpload: (file: File) => void;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selected = files[0];
            onUpload(selected);
            setSelectedFile(selected);
        }
    };

    return (
        <div>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
        </div>
    );
};

export default AudioUpload;
