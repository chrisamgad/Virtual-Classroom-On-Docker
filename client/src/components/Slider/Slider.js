import React from 'react'
import {Carousel} from 'react-bootstrap'
import styles from './Slider.module.css'
const Slider = () =>{
    return(
        
        <Carousel>
            <Carousel.Item interval={2000}>
                <img
                className="d-block w-100"
                src="/images/Slider/image1-1.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h2 className={styles.headingstyle} >Learn</h2>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                className="d-block w-100"
                src="/images/Slider/image2.jpg"
                alt="Second slide"
                />

                <Carousel.Caption>
                <h2 className={styles.headingstyle} style={{color: "white"}} >Online</h2>
                <p style={{color: "white"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}> 
                <img
                className="d-block w-100"
                src="/images/Slider/image3.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h2 className={styles.headingstyle} style={{color: "white"}} >Virtual</h2>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Slider;