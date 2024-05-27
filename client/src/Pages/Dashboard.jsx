import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import CardComponent from '../Component/Card'
import { Box, Container, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../Redux/Blogs/action'
import { useSearchParams } from 'react-router-dom'


const Dashboard = () => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger, setTrigger] = useState(0);
    const blogs = useSelector((store) => store.blogReducer.blogs);

    const handleTrigger = () => {
        setTrigger(trigger + 1)
    }

    let params = {
        q: searchParams.get("q")
    }


    useEffect(() => {
        dispatch(getBlogs(params));
    }, [searchParams, trigger])

    return (
        <Box>
            <Navbar handleTrigger={handleTrigger} section={"My Blog"} />

            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {blogs.length > 0 ? blogs.map((el, i) => {
                    return <CardComponent key={el?._id} data={el} handleTrigger={handleTrigger} />
                }) : <Typography>
                    No Blogs
                </Typography>}
            </Container>

        </Box>
    )
}

export default Dashboard
