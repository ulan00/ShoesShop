import HomeEdit from '../Home/HomeEdit.css'
import { Grid } from '@mui/material';
import React from 'react';
import Content from './Content/Content';
import Sidebar from './Sidebar/Sidebar';
import CarouselBox from '../Header/CarouselBox';
import Footer from '../Footer/Footer';


const Home = () => {
    return (
        <div>
            <Grid spacing-md={3} spacing-sm={3}>
                <CarouselBox />
                <Sidebar />
                <Content />
                <Footer/>
            </Grid>
        </div>
    );
};

export default Home;