
// code for the animation on the home page

// DOM Elements
const shapes = document.querySelectorAll('.shape');
const default_shapes = JSON.parse(localStorage.getItem('.shape')) || [];
const box  = document.querySelector('#box');
const body = document.querySelector('body');




const sizes = [
  { width: '10%', height: '50%', left: '0%', top: '50%', zIndex: 6 },
  { width: '20%', height: '50%', left: '0%', top: '50%', zIndex: 5 },
  { width: '40%', height: '50%', left: '0%', top: '50%', zIndex: 4 },
  { width: '70%', height: '50%', left: '0%', top: '50%', zIndex: 3 },
  { width: '90%', height: '50%', left: '0%', top: '50%', zIndex: 2 },
  { width: '100%', height: '50%', left: '0%', top: '50%', zIndex: 1 }
];

const pages = [
  {"About": "Learn more about our team and development."},
  {"Jobs": "Find a job that fits your needs."},
  {"Skills": "Find in-demand skills."},
  {"Courses": "Learn new skills and improve your current ones."},
  {"Locations": "Find a job near you or explore what other cities have to offer."},
  {"Contact": "Contact us with any questions or concerns."},
  {"Other": "Explore other resources."}
];



box.addEventListener('click', function(e) {
  if (!e.target.matches('.shape')) return;
    
  const shape = e.target;

  // if the shape is clicked, and it has a label2, go to the page
  if(shape.hasChildNodes())
  {
    window.location.pathname += label.innerHTML.toLowerCase();
  }
  else
  {
    // if a shape is clicked and a label2 exists outside of the shape, remove it
    // else remove the logo as we are the starting position
    document.querySelector('#label')? document.querySelector('#label').remove() : null;
    document.querySelector('#label2')? document.querySelector('#label2').remove() : null;
    document.querySelector('#logo-center') ? document.querySelector('#logo-center').remove() : null;
    
    // set the shape to the largest size
    shape.style.zIndex = 3;
    shape.style.left = '0%';
    shape.style.top = '0%';
    shape.style.height = '50%';
    shape.style.width = '100%';

    // shift other shapes to positon stated in array of dictionaries
    let nth = 0;
    let count = 0;
    shapes.forEach((shape) => {
      if (shape == e.target){
        nth = count;
        return;
      }
      
      for (let key in sizes[count]){
        shape.style[key] = sizes[count][key];
      }
      count++;
      
    });

    label = document.createElement('h1');
    label.id = 'label';
    label.innerHTML = Object.keys(pages[nth])[0];
    box.appendChild(label);

    label2 = document.createElement('h2');
    label2.id = 'label2';
    label2.innerHTML = pages[nth][label.innerHTML];
    if(nth == 6) label2.style.color = "#0077B6";
    shape.appendChild(label2);

  }

});

// if the body is clicked, reset the shapes
body.addEventListener('click', function(e) {
    if (e.target.matches('.shape')) return;
    document.querySelector('#label')? document.querySelector('#label').remove() : null;
    document.querySelector('#label2')? document.querySelector('#label2').remove() : null;

    // add logo if null
    if(document.querySelector('#logo-center') == null){
      let img = document.createElement('div');
      img.id = 'logo-center';
      box.appendChild(img);
    }
    
    let count = 0;
    shapes.forEach((shape) => {
      shape.style = default_shapes[count];
      count++;
    });
  
});
