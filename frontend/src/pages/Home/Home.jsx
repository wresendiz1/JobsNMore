import { useEffect, useRef, React } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const sizes = [
  {
    width: "10%",
    height: "10%",
    left: "0%",
    top: "90%",
    zIndex: 6,
  },
  {
    width: "20%",
    height: "10%",
    left: "0%",
    top: "90%",
    zIndex: 5,
  },
  {
    width: "40%",
    height: "10%",
    left: "0%",
    top: "90%",
    zIndex: 4,
  },
  {
    width: "70%",
    height: "10%",
    left: "0%",
    top: "90%",
    zIndex: 3,
  },
  {
    width: "100%",
    height: "10%",
    left: "0%",
    top: "90%",
    zIndex: 2,
  },
];

const pages = [
  { title: "About", content: "Learn more about our team and development." },
  { title: "Jobs", content: "Find a job that fits your needs." },
  { title: "Occupations", content: "Search by standardized job occupations." },
  {
    title: "Courses",
    content: "Learn new skills and improve your current ones.",
  },
  {
    title: "Locations",
    content: "Find a job near you or explore what other cities have to offer.",
  },
  {
    title: "Clusters",
    content: "Explore different clusters to find the right choice.",
  },
];
// Custom hook that runs given handler when clicked outside of the ref node
const useClickOutside = (handler) => {
  const clickBox = useRef();
  useEffect(() => {
    const listener = (e) => {
      if (!clickBox.current) return;
      if (!clickBox.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  });
  return clickBox;
};

function Home() {
  // on render
  useEffect(() => {
    document.body.classList.add("home");
    // on unmount
    return () => {
      document.body.classList.remove("home");
    };
  }, []);

  // DOM elements states
  const shapes = useRef(null);
  if (shapes.current === null) {
    shapes.current = document.getElementsByClassName("shape");
  }

  const title = useRef();
  const logo = useRef();
  const desc = useRef(null);
  const clickedShape = useRef(null);
  const navigate = useNavigate();

  // attach custom hook to clickBox ref node
  const clickBox = useClickOutside(() => {
    // if the clicked element is outside, reset the page to original state
    if (clickedShape.current !== null) {
      title.current.innerHTML = "";
      logo.current.style.display = "block";
      desc.current = null;
      clickedShape.current = null;
      // set shapes to original state
      Array.from(shapes.current).forEach((shape) => {
        shape.classList.remove("clicked");
        // reset shape to original size
        shape.style = "";
        shape.children[0].style = "";
        shape.children[0].innerHTML = shape.title;
      });
    }
  });

  const checkShape = (e) => {
    // if the target is the children, get the parent
    if (e.target.className === "shapeDescription") {
      e.target = e.target.parentElement;
    }

    if (clickedShape.current !== null) {
      // remove clicked from previous clicked shape
      clickedShape.current.classList.remove("clicked");
    }
    // redirect to the clicked shapes title
    if (clickedShape.current === e.target) {
      navigate(`/${clickedShape.current.title}`);
    }
    clickedShape.current = e.target;

    logo.current.style.display = "none";
    const [descElement] = clickedShape.current.children;
    desc.current = descElement;
    // get dictionary of clicked shape
    const clickedShapeDict = pages.find(
      (page) => page.title === e.target.title
    );

    // set the title and description
    // set description visible
    desc.current.style.display = "block";
    title.current.innerHTML = clickedShapeDict.title;
    desc.current.innerHTML = clickedShapeDict.content;

    // set the shape to the largest size
    clickedShape.current.classList.add("clicked");

    // loop through other shapes and hide the descr that are not clicked and set the size
    let count = 0;
    Array.from(shapes.current).forEach((shape) => {
      if (shape !== clickedShape.current) {
        shape.children[0].style.display = "none";
        Object.keys(sizes[count]).forEach((key) => {
          shape.style[key] = sizes[count][key];
        });
        count += 1;
      }
    });
  };
  return (
    <div id="container">
      <div id="box" ref={clickBox}>
        {pages.map((page, index) => (
          <div
            role="button"
            tabIndex={index}
            className="shape hvr-reveal"
            title={page.title}
            key={page.title}
            onClick={checkShape}
            onKeyUp={checkShape}
          >
            <div className="shapeDescription">{page.title}</div>
          </div>
        ))}
        <div id="logo-center" ref={logo} />
        <div id="shapeLabel" ref={title} />
      </div>
    </div>
  );
}

export default Home;
