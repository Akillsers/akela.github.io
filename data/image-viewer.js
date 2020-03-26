var viewer;

function view_image(image_name) {
  viewer = document.getElementById("image-viewer");
  viewer.style.display = "block";
}


function viewer_click(e) {
    console.log(e.target)
    if(e.target === viewer || e.target.className.baseVal === "close")
    {
        viewer.style.display = "none";    
        viewer = null;
    }
    
}

document.onkeydown = function(e) {
    if(e.key == "Escape"){
    	if(viewer)
        {
            viewer.style.display = "none"
            viewer = null;
        }
    }
}