var carte =new Array("carte1.jpg","carte2.jpg","carte3.jpg","carte4.jpg","carte5.jpg","carte6.jpg","carte7.jpg","carte1.jpg","carte2.jpg","carte3.jpg","carte4.jpg","carte5.jpg","carte6.jpg","carte7.jpg");

function melange(carte){
    for (var i=0; i<carte.length; i++){
        var alea=Math.floor(Math.random()*carte.length);
        temp=carte[i];
        carte[i]=carte[alea];
        carte[alea]=temp;
    }
}
function changeImage(x){ // Applique le chemin de l'image au clique
    i=0;                 
    if (i<1){                     
        i=i+1;                 
        var src = "<img src='img/"+carte[x]+"'/> "; //choix des image a partir d'une base donné
        document.getElementById(x).innerHTML = src;
    
    }else{
        i=0;            
}         
}



