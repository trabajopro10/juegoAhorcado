// Se crea un arreglo con los mensajes que van saliendo a medida que la persona
// vaya avanzando y no pueda adivinar la palabra. 
var arrMensajes = ["1- Fue Sentenciado ","2- Todavía tiene 6 oportunidades","3- Intente una vez más", "4- La cosa no pinta bien","5- Tiene 2 oportunidades más","6- Pilas AHORA O NUNCA !!!", "Aprete ... Muere.. Se nos vuela ... Ayayayay.."];
var arrImages = ["ahorcado1.jpg","ahorcado2.jpg","ahorcado3.jpg","ahorcado4.jpg","ahorcado5.jpg","ahorcado6.jpg"];

var varLetrasFrase = 0;  // TIENE LOS 15 LUGARES PARA IR COLOCANDO LA LETRA QUE COINCIDA EN LA FRASE O PALABRA
var varFrasePalabra = ""; // ES LA FRASE O PALBRA QUE SE VA A ADIVINAR
var varSiNo = false; // SABER SI UNA LETRA SI ESTÁ DENTRO DE LA FRASE, DE LO CONTRATRIO MOSTRAR ERROR
var varAdicionarLetra =""; // CAMPO DONDE SE COLOCA CADA LETRA QUE SE BUSCARA DENTRO DE LA FRASE PARA ADIVINAR 
var varTextAreaError = "";// TextArea donde se van mostrando los mensajes de error 
var varIntentos = arrMensajes.length;
var varContador = 0;
var varImagen; // Tiene la imágen que va mostrando los errores de cada fallo buscando la frase 
var varMensaje = " BIEN HECHO HA ADIVIDANDO LA FRASE... FELICITACIONES.!!";
var varSiNo= false; // Si se encuentra o no la letra 

function fnLetras(){
    /* Llena las variables */ 
    varImagen = document.getElementById('idImagen');
    varLetrasFrase = document.querySelectorAll('.input-letra');
    varTextAreaError = document.getElementById('idquepasa');
    varAdicionarLetra = document.querySelector('#idletra16');
    document.getElementById('idquepasa');
    /* Si la persona ha escrito la frase se valida si coinciden */
    fnUneLetras(varFrasePalabra);
   // alert(varLetrasFrase.length + " varLetrasFrase");
        varAdicionarLetra.addEventListener("focusout",function(event){
            event.preventDefault();
            varSiNo=false; // Inicia diciendo que nos se ha encontrado la letra
            //alert("hola");
            // Si no ha digitado nada aún dentro de Frase Buscada, no debe permitir 
            // colocar ninguna letra para empezar a trabajar con la frase. 
            varFrasePalabra = document.querySelector("#idfraseopalabra").value;
            if (varFrasePalabra.length<=1){
                varAdicionarLetra.value = "";
                alert("NO SE HA DEFINIDO AÚN UNA FRASE O PALABRA PARA TRABAJAR ... ");
            }else{
                // Cuando ya está definida la frase, se va a colocar cada letra dentro de 
                // la Frase ganadora, siempre y cuando exista dentro la Frase buscada 
                //alert("Aca Vamos " + varFrasePalabra.length);
                fnCompLetraFrase(varFrasePalabra, varAdicionarLetra.value);
            }
        });   
}

function fnCompLetraFrase(Frase,Letra){
    /* Recorre el arreglo que tiene la frase y lo compara con la letra que el usuario a digitado*/
    for(var le =0; le < Frase.length; le++){
        if (Frase[le].toUpperCase() == Letra.toUpperCase()){
            varSiNo=true; // La letra coincide con alguna en la frase
            for (var li=0;li<varLetrasFrase.length;li++){
               
                if(le==li){
                   // alert("si");
                   varLetrasFrase[li].value=Letra;
                   break;
                }                
            }
        }
    }
    // Si no se ha encontrado la letra coloca los mensajes de error 
    if (!varSiNo && varContador < varIntentos){
        //varTextAreaError.innerText  = "Error";
        varTextAreaError.value =  varTextAreaError.value + arrMensajes[varContador]+'\r\n';
        console.log("Error, esa letra no coincide... " + varTextAreaError.value);
        /* Permite colocar una clase que muestre y oculte la imagen cuando sea necesario */
        varImagen.src= "static/img/" + arrImages[varContador];
        varImagen.classList.remove("nomostrarImagen");
        varImagen.classList.add("mostrarImagen");
        varContador++;
    }
    if (varContador==varIntentos){
        varTextAreaError.value = varTextAreaError.value + " Esta es la frase que estaba adivinando... " + varFrasePalabra+'\r\n';
    }
    fnUneLetras(Frase);
   // alert(textoFrase);
}

function fnUneLetras(Frase){
    var textoFrase = ""
    /* Recorre los campos donde ha colocado cada letra y los compara con la frase en general */
    for (var lo=0;lo<varLetrasFrase.length;lo++){
           textoFrase = textoFrase + varLetrasFrase[lo].value;
        } 
    if(textoFrase.length > 2 && textoFrase.toUpperCase()==Frase.toUpperCase()){
        varTextAreaError.value = varTextAreaError.value + varMensaje;
        varImagen.classList.remove("mostrarImagen");
        varImagen.classList.add("nomostrarImagen");
        alert(varMensaje);
    }            
}
