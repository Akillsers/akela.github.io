var viewer;

function view_image(image_name) {
  viewer = document.getElementById("image-viewer");
  viewer.style.display = "block";
}

function viewer_close()
{
    viewer.style.display = "none";    
    viewer = null; 
}

function viewer_click(e) {
    console.log(e.target)
    if(e.target === viewer)
    {
        viewer_close();
    }
}

document.onkeydown = function(e) {
    if(e.key == "Escape"){
    	if(viewer)
        {
            viewer_close();
        }
    }
}