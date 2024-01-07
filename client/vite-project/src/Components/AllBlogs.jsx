
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllBlogs = () => {

    const [allBlogs,setAllBlogs] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);


    const getAllBlogs = async(e)=>{

        try {
            const res = await axios.get('http://localhost:5001/blog/getAllBlogs');
            console.log(res.data);

            // Update the state with the received data
            setAllBlogs(res.data.allBlogs);

            setShouldFetch(false);

            // Now allBlogs will contain the fetched data
            console.log(allBlogs);

        } 
        
        catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };



    useEffect(() => {
      
        getAllBlogs()
      
    }, [shouldFetch])
    

  return (
    <div style={{marginTop:'10rem'}}>
       {allBlogs.map(item=>(
        <h1 key={item._id}>{item.title}</h1>
       ))}
    </div>
  )

  }
  
export default AllBlogs