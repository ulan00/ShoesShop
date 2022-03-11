import React from 'react';
import { Carousel } from 'react-bootstrap';
import image2  from '../../Images/image2.jpg';
import image5  from '../../Images/image5.jpg';
import image4  from '../../Images/image4.jpg';
import image3  from '../../Images/image3.jpg';
import image6  from '../../Images/image6.jpg';
import image1  from '../../Images/image1.jpg';
import { Component } from 'react';

export default class CarouselBox extends Component {
    render(){
        return (
            <Carousel>
            <Carousel.Item>
                <img
                style={{height: '550px'}}
                className="d-block w-100"
                src={ image5 }
                alt="First slide"
                />
                <Carousel.Caption>
                <h3 style={{color: 'red', fontWeight: 'bold 30px'}}>Кроссовки</h3>
                <p style={{color: 'black', fontWeight: 'bold 10px'}}>Качественная ОБУВЬ</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                style={{height: '550px'}}
                className="d-block w-100"
                src={image4}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3 style={{color: 'red', fontWeight: 'bold 20px'}}>Женская Обувь</h3>
                <p style={{color: 'black', fontWeight: 'bold 10px'}}>Качественная ОБУВЬ</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                style={{height: '550px'}}
                className="d-block w-100"
                src={image3}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3 style={{color: 'red', fontWeight: 'bold 20px'}}>Женская Обувь</h3>
                <p style={{color: 'black', fontWeight: 'bold 10px'}}>Качественная ОБУВЬ</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                style={{height: '550px'}}
                className="d-block w-100"
                src={image6}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3 style={{color: 'red', fontWeight: 'bold 20px'}}>Кроссовки</h3>
                <p style={{color: 'black', fontWeight: 'bold 10px'}}>Качественная ОБУВЬ</p>
                </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
                <img
                style={{height: '550px'}}
                className="d-block w-100"
                src={image1}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3 style={{color: 'red', fontWeight: 'bold 20px'}}>Туфли</h3>
                <p style={{color: 'black', fontWeight: 'bold 10px'}}>Качественная ОБУВЬ</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                style={{height: '550px'}}
                className="d-block w-100"
                src={image2}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3 style={{color: 'red', fontWeight: 'bold 20px'}}>Туфли</h3>
                <p style={{color: 'black', fontWeight: 'bold 10px'}}>Качественная ОБУВЬ</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        );
    } 
};

