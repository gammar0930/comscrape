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
        <div className='flex items-start flex-col justify-start'>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            {
                selectedFile && (
                    <div className='mt-2'>
                        <h2>Preview:</h2>
                        <audio controls>
                            <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                )
            }
        </div>
    );
};

export default AudioUpload;
