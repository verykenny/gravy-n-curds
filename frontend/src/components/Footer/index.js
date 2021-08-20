

import './Footer.css'


const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <p>About the developer:</p>
                <a href='https://github.com/verykenny' target='blank'><i className='fab fa-github-square'/></a>
                <a href='https://www.linkedin.com/in/kenneth-donahue/' target='blank'><i className='fab fa-linkedin'/></a>
            </div>
            <p className='copy'>&copy; Copyright 2021, veryKenny-Labs</p>
        </div>
    )
}


export default Footer;
