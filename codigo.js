//JUlIO CESAR MEJIA
//CARNET:MR20084
//GRUPO:06
var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  document.getElementById("accion").style.display = "block";
	  document.getElementById("radioB").style.display = "block";
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		}
	}

function obtenerProductos() {
	  fetch('https://api-generator.retool.com/bDkUNC/productos')
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(
					function(producto){
producto.price=parseFloat(producto.price)
					});
				listarProductos(data)})
	
}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}

function ejecutar(){
	let radioE = document.getElementById("eliminar").checked;
	let radioA = document.getElementById("agregar").checked;
	


if(radioE==true){
	let id = document.getElementById("id").value;
	var delresult;
    fetch("https://api-generator.retool.com/bDkUNC/productos/"+id,
{ method:"DELETE"})
.then(response=>response.json())
.then(data=>delresult=data);
delresult;
alert("Producto con Id: "+id+" Eliminado con exito..");
obtenerProductos();
}
else
if(radioA==true){
	let titulo= document.getElementById("titulo").value;
	let precio = document.getElementById("precio").value;
	let descripcion = document.getElementById("descripcion").value;
	let imagen = document.getElementById("imagen").value;
	let categoria = document.getElementById("categoria").value;
	var producto ={image:imagen,price:precio,title:titulo,description:descripcion,category:categoria}
	var addresult;
fetch("https://api-generator.retool.com/bDkUNC/productos",
{ method:"POST",
  body: JSON.stringify(producto),
  headers: {
     'Accept': 'application/json',
     'Content-type': 'application/json; charset=UTF-8',
  }
})
.then(response=>response.json())
.then(data=>addresult=data);
 alert("Producto Agregado con exito");
 obtenerProductos();
 id.reset();
}
	else
	alert("No Ha seleccionado Ninguna accion a realizar");

}
function visibilityE(){
	document.getElementById("elim").style.display = "block";
	document.getElementById("agre").style.display = "none";
}
function visibilityA(){
	document.getElementById("agre").style.display = "block";
	document.getElementById("elim").style.display = "none";
}	