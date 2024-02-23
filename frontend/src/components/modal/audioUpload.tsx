import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface AudioUploadProps {
  onChange: (file: File) => void;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ onChange }) => {
  const [fileList, setFileList] = useState<any[]>([]);

  const beforeUpload = (file: any) => {
    const isAudio = file.type.startsWith('audio/');
    if (!isAudio) {
      message.error('You can only upload audio files!');
    }
    return isAudio;
  };

  const handleChange = (info: any) => {
    setFileList(info.fileList);
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      onChange(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      onChange={handleChange}
      fileList={fileList}
      customRequest={({ file, onSuccess, onError }) => {
        // Handle the file upload logic here (you may use a library like Axios).
        // onSuccess and onError should be called based on the upload result.
        // For simplicity, we'll just simulate a successful upload after a delay.
      }}
    >
      <Button icon={<UploadOutlined />}>Upload Audio</Button>
    </Upload>
  );
};

export default AudioUpload;
