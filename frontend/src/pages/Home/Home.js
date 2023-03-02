import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import CustomBar from '../../components/Navbar/Navbar'
import './home.css';

const sizes = [
  { width: '10%', height: '10%', left: '0%', top: '90%', zIndex: 6 },
  { width: '20%', height: '10%', left: '0%', top: '90%', zIndex: 5 },
  { width: '40%', height: '10%', left: '0%', top: '90%', zIndex: 4 },
  { width: '70%', height: '10%', left: '0%', top: '90%', zIndex: 3 },
  { width: '100%', height: '10%', left: '0%', top: '90%', zIndex: 2 },
];

const pages = [
  { "About": "Learn more about our team and development." },
  { "Jobs": "Find a job that fits your needs." },
  { "Skills": "Find in-demand skills." },
  { "Courses": "Learn new skills and improve your current ones." },
  { "Locations": "Find a job near you or explore what other cities have to offer." },
  { "Contact": "Contact us with any questions or concerns." },
];

function Home() {
  // DOM elements states
  const shapes = useRef();
  const title = useRef();
  const logo = useRef();
  const clickBox = useRef();
  const desc = useRef(null);
  const clickedShape = useRef(null);
  const navigate = useNavigate();

  // on render
  useEffect(() => {
    shapes.current = document.getElementsByClassName('shape');
    // checks if the click is outside the shapes
    document.addEventListener('click', clickOutside, true);
    document.body.classList.add('home');

    // on unmount
    return () => {
      document.body.classList.remove('home');
      document.removeEventListener('click', clickOutside, true);
    };


  }, []);


  const clickOutside = (e) => {
    if (!clickBox.current.contains(e.target) && clickedShape.current !== null) {
      // if the clicked element is outside, reset the page to original state
      title.current.innerHTML = '';
      logo.current.style.display = 'block';
      desc.current = null;
      clickedShape.current = null;
      // set shapes to original state
      for (let shape of shapes.current) {
        shape.classList.remove('clicked');
        shape.style.zIndex = 1;
        // reset shape to original size
        shape.style = '';
        shape.children[0].style = '';
        shape.children[0].innerHTML = shape.title;

      };


    }
  }

  const checkShape = (e) => {
    // if the target is the children, get the parent
    if (e.target.className === 'shapeDescription') {
      e.target = e.target.parentElement;
    }

    if (clickedShape.current !== null) {
      // remove clicked from previous clicked shape
      clickedShape.current.classList.remove('clicked');
    }
    // redirect to the clicked shapes title
    if (clickedShape.current === e.target) {
      // window.location.href = "/" + clickedShape.current.title;
      navigate("/" + clickedShape.current.title);
    }
    clickedShape.current = e.target;

    logo.current.style.display = 'none';
    desc.current = clickedShape.current.children[0];
    // get dictionary of clicked shape
    let clickedShapeDict = pages.find((page) => Object.keys(page)[0] === e.target.title);

    // set the title and description
    // set description visible
    desc.current.style.display = 'block';
    title.current.innerHTML = Object.keys(clickedShapeDict)[0];
    desc.current.innerHTML = Object.values(clickedShapeDict)[0];


    // set the shape to the largest size
    clickedShape.current.classList.add('clicked');


    // loop through other shapes and hide the descr that are not clicked and set the size
    let count = 0;
    for (let shape of shapes.current) {
      if (shape !== clickedShape.current) {
        shape.children[0].style.display = 'none';
        for (let key in sizes[count]) {
          shape.style[key] = sizes[count][key];
        }
        count++;
      }

    };
  }
  return (
    <>
      <CustomBar />
        <div id='container'>
          <div id='box' ref={clickBox} >
            {pages.map((page) => (
              <div className='shape hvr-reveal' title={Object.keys(page)[0]} key={Object.keys(page)[0]} onClick={checkShape}>
                <div className='shapeDescription'>
                  {Object.keys(page)[0]}
                </div>
              </div>
            ))}
            <div id='logo-center' ref={logo}></div>
            <div id='shapeLabel' ref={title}></div>
          </div>
        </div>
    </>

  )
}

export default Home;