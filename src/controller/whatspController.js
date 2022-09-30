class whatspController{

constructor(){
    
 console.log('watspController ok');
 this.loadElements();    
}

loadElements(){
this.el = {};
document.querySelectorAll('[id]').forEach(element =>{

 this.el[format.getCamelCase(element.id)] = element;

});

}




}