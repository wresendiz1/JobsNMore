
// const primary = JSON.parse(JSON.stringify(document.body.style));


const shapes = document.querySelectorAll('.shape');

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
]

const defaultshapes = [ ...shapes ].map((shape) => JSON.parse(JSON.stringify(shape.style)));

document.querySelector('#box').addEventListener('click', function(e) {
  if (e.target.matches('.shape')) {
    
    // if the target has the label2 
    if(e.target.querySelector('#label2') != null){
      window.location.pathname += document.querySelector('#label').innerHTML.toLowerCase();

      
    }
    else
    {

      document.querySelector('#label2') != null ? document.querySelector('#label2').remove() : document.querySelector('#logo-center').remove();
      e.target.style.zIndex = 3;
      e.target.style.left = '0%';
      e.target.style.top = '0%';
      e.target.style.height = '50%';
      e.target.style.width = '100%';
  
      
      let h1 = document.querySelector('#label')
      let count = 0;
      let nth = 0;
      shapes.forEach((shape) => {
        if (shape == e.target) {
          nth = count;
          return;
        }
        shape.style.zIndex = sizes[count].zIndex;
        shape.style.left = sizes[count].left;
        shape.style.top = sizes[count].top;
        shape.style.height = sizes[count].height;
        shape.style.width = sizes[count].width;
        count++;
      });
  
        // get the key of the object in list
        h1.innerHTML = Object.keys(pages[nth])[0];
        // create description
        let p = document.createElement('p');
        p.id = 'label2';
        p.innerHTML = pages[nth][h1.innerHTML];
  
        if(nth == 6 ){
          p.style.color = "#0077B6"
        }
        e.target.appendChild(p);
    }





  }});

// if the body is clicked, reset the shapes
document.querySelector('body').addEventListener('click', function(e) {
  if (e.target.matches('#container')) {
    
    
    // remove  label2
    document.querySelector('#label2') != null ? document.querySelector('#label2').remove() : null;

    // add logo if null
    let logo = document.querySelector('#logo-center')
    if(logo == null){
      let img = document.createElement('div');
      img.id = 'logo-center';
      e.target.appendChild(img);
    }
    
    let h1 = document.querySelector('#label');
    // create a new label
    h1.innerHTML = '';

    let count = 0;
    shapes.forEach((shape) => {
      shape.style = defaultshapes[count];
      count++;
    });
  }
});
