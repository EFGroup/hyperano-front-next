import {useEffect, useState} from 'react';

const ScrollPosition = () => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const handleScroll = event => {
      setPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return position;
};

export default ScrollPosition;
