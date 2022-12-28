import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MediaCard from './MediaCard';

const Media = () => {
    const datas = useLoaderData()
    console.log(datas)
    return (
        <div className='grid grid-cols-1 md:grid-cols-1 px-4 md:px-10 gap-10'>
            {
                datas.map(data => <MediaCard
                    key={data._id}
                    data={data}
                ></MediaCard>)
            }
        </div>
    );
};

export default Media;