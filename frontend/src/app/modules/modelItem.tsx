import React from 'react';

interface TextModuleProps {
    content: string;
}

const TextModule: React.FC<TextModuleProps> = ({ content }) => (
    <div>
        <p>{content}</p>
    </div>
);

interface ImageModuleProps {
    url: string;
    name: string;
    attributes: {
        width?: number | null | undefined;
        height?: number | null | undefined;
    };
}

const ImageModule: React.FC<ImageModuleProps> = ({ url, name, attributes }) => (
    <div>
        {/* <img src={url} alt={name} width={attributes.width || 0} height={attributes.height || 0} style={{ width: '500', height: '300' }} /> */}
        <img src={url} alt={name} style={{ width: '550px', height: '300px' }} />
    </div>
);

interface VideoModuleProps {
    url: string;
    name: string;
    attributes: {
        duration?: string | null | undefined;
        resolution?: string | null | undefined;
    };
}

const VideoModule: React.FC<VideoModuleProps> = ({ url, name, attributes }) => (
    <div>
        <video controls width={parseInt(attributes.resolution?.split('x')[0] || '0')} height={parseInt(attributes.resolution?.split('x')[1] || '0')}>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
);

interface AudioModuleProps {
    url: string;
    name: string;
    attributes: {
        duration?: string | null | undefined;
        bitrate?: string | null | undefined;
    };
}

const AudioModule: React.FC<AudioModuleProps> = ({ url, name, attributes }) => (
    <div>
        <audio controls>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio tag.
        </audio>
    </div>
);

interface ModuleTileProps {
    item: {
        type: string;
        content?: string | null | undefined;
        url?: string | null | undefined;
        name?: string | null | undefined;
        attributes?: {
            width?: number | null | undefined;
            height?: number | null | undefined;
            duration?: string | null | undefined;
            resolution?: string | null | undefined;
            bitrate?: string | null | undefined;
        } | null | undefined;
    };
}

const ModuleTile: React.FC<ModuleTileProps> = ({ item }) => {
    let moduleContent;

    switch (item.type) {
        case 'text':
            moduleContent = <TextModule content={item.content || ''} />;
            break;
        case 'image':
            moduleContent = <ImageModule url={item.url || ''} name={item.name || ''} attributes={item.attributes || {}} />;
            break;
        case 'video':
            moduleContent = <VideoModule url={item.url || ''} name={item.name || ''} attributes={item.attributes || {}} />;
            break;
        case 'audio':
            moduleContent = <AudioModule url={item.url || ''} name={item.name || ''} attributes={item.attributes || {}} />;
            break;
        default:
            return null;
    }

    return (
        <div className='p-2'>
            {moduleContent}
        </div>
    );
};

interface ModuleTilePropsContainer {
    data: ModuleTileProps['item'][];
}

const ModuleTileProps: React.FC<ModuleTilePropsContainer> = ({ data }) => (
    <div>
        {data.map((item, index) => (
            <ModuleTile key={index} item={item} />
        ))}
    </div>
);

export default ModuleTileProps;
