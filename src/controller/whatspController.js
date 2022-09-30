class whatspController{

constructor(){

 console.log('watspController ok');
 this.elementPrototype();
 
 this.loadElements(); 
 this.initEvents();  

}

loadElements(){
this.el = {};
document.querySelectorAll('[id]').forEach(Element =>{

 this.el[format.getCamelCase(Element.id)] = Element;

});

}
elementPrototype(){

Element.prototype.hide = function(){

this.style.display = 'none';
return this;
}

Element.prototype.show = function(){

    this.style.display = 'block';
    return this;
    }

    Element.prototype.toggle = function(){

        this.style.display = (this.style.display === 'none') ? 'block' : 'none';
        return this;
        }

        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event =>{
                this.addEventListener(event, fn);
                return this;
            });

            Element.prototype.css = function(styles){
               for (let name in styles) {
                   this.style[name] = styles[name];
                }
                return this;
            }
            Element.prototype.addClass = function(name){
              this.classList.add(name);
              return this;
            }

            Element.prototype.removeClass = function(name){
                this.classList.remove(name);
                return this;
              }
              Element.prototype.toglleClass = function(name){
                this.classList.toglle(name);
                return this;
              }
              Element.prototype.hasClass = function(name){
                return this.classList.contain(name);
  
     }



}}


initEvents(){

this.el.myPhoto.on('click', e =>{
    this.closeAllLeftPanel();
    this.el.PanelEditProfile.show();
    setTimeout(()=>{
        this.el.panelEditProfile.addClass('open');
    }, 300);
 

});

this.el.btnNewContact.on('click' , e =>{
    this.closeAllLeftPanel();
    this.el.panelAddContact.show();
    
    setTimeout(()=>{
        this.el.panelAddContact.addClass('open');
    }, 300);

});
this.el.btnClosePanelEditProfile.on('click' , e =>{
   
this.el.PanelEditProfile.removeClass('open');
});

this.el.btnClosePanelAddContact.on('click', e =>{

    this.el.this.el.panelAddContact.removeClass('open'); 

});

}
closeAllLeftPanel(){

    this.el.PanelEditProfile.hide();
    this.el.panelAddContact.hide();
}
}