import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://deepakchopra.it/wp-content/uploads/2018/07/dieta-sana.png',
    altText: '',
    caption: '',
    header: ''
  },
  {
    src: 'https://media.adhocash.it/blog/1/112/b.jpg',
    altText: '',
    caption: '',
    header: ''
  },
  {
    src: 'http://www.fruit-trade-ltd.com/images/slider/frutta/02-albero-di-arancio.png',
    altText: '',
    caption: '',
    header: ''
  }

  
];

const CarouselCustom = () => <UncontrolledCarousel items={items} />;

export default CarouselCustom;