import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SlideSidebar.scss'


const SlideSidebar = ({children}: {children: JSX.Element}) => {
    const [active, setActive] = useState<string>('/');
    const location = useLocation();

    useEffect(() => {
        setActive(location.pathname)
    }, [location])
    
  return (
        <div className={active === '/' ? "SlideSidebar": "SlideSidebar__active"}>
            {children}
        </div>
    ) 
    
};

export {SlideSidebar};