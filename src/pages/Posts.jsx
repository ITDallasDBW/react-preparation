import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
    const {id} = useParams();
 
    useEffect( () => {
        async function fetchPosts(params) {
            const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            console.log(data)
        }
        fetchPosts();
    }, []);

    return (
        <div>
            {id}
        </div>
    );
}

export default Posts;


