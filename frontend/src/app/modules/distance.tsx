import React from 'react';

interface Video {
    id: number;
    distances: number[];
}

interface DistancesProps {
    videos: Video[];
}

const Distances: React.FC<DistancesProps> = ({ videos }) => {
    return (
        <div>
            {videos.map(video => (
                <div key={video.id} className='flex'>
                    <h2>Distances for video with ID {video.id}:</h2>
                    <ul>
                        {video.distances.map((distance, index) => (
                            <li key={index}>Distance {index + 1}: {distance}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Distances;
