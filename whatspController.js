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
     HTMLFormElement.prototype.getForm = function () {
        return new FormData(this);

     }
     HTMLFormElement.prototype.toJSON = function () {
       let json = {};
       this.getForm().forEach((value, key)=>{
        json[key] = value;
                
       });
       return json;

       
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
       this.el.photoContainerEditProfile.on('click', e =>{
          this.el.inputProfilePhoto.click();

       });

     this.el.inputNamePanelEditProfile.on('keypress', e=>{
               if(e.key === 'Enter'){
           e.preventDefault();
             this.el.btnSavePanelEditProfile.click();
               }
     });

     this.el.btnSavePanelEditProfile.on('click', e=>{
console.log(this.el.inputNamePanelEditProfile.innerHTML);

     });

         this.el.formPanelAddContact.on('submit', e =>{
            e.preventDefault();

  let formData = new FormData(this.el.formPanelAddContact);
  
         });

         this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item =>{
          item.on('click', e => {
            this.el.home.hide();
            this.el.main.css({
                display: 'flex'
            });

          });

          this.el.btnAttach.on('click', e =>{
          e.stopPropagation();
        this.el.menuAttach.addClass('open');
           document.addEventListener('click', this.closeMenuAttach);
          });

            this.el.btnAttachPhoto.on('click', e=> {
               this.el.inputPhoto.click();

            });

            this.el.btnAttachPhoto.on('change', e=> {
             [...this.el.inputPhoto.files].forEach(file =>{
                    

             });

            });

            this.el.btnAttachCamera.on('click', e=> {
               this.closeAllMainPanel()
                this.el.panelCamera.addClass('open');
                this.elpanelCamera.css({
                      'height':'calc(100% - 120px)'

                });
               

            });

            this.el.btnAttachCamera.on('click', e=> {
                this.closeAllMainPanel()

             
             this.el.panelMessagesContainer.show();

            });

            this.el.btnTakePicture.on('click', e=>{
                 

            })

            this.el.btnAttachDocument.on('click', e=> {
                this.closeAllMainPanel()
                this.el.btnAttachDocumentPreview.addClass('open');
                this.el.btnAttachDocumentPreview.css({
                    'height':'calc(100% - 120px)'

              });

            });

            this.el.btnClosePanelDocumentPreview.on('click', e =>{
this.closeAllMainPanel();
this.el.panelMessagesContainer.show();

            });

            this.el.btnSendDocument.on('click', e=>{


            });

            this.el.btnAttachContact.on('click', e=> {
                  this.el.modalContacts.show();
             
            });

            this.el.btnCloseModalContacts.on('click', e=>{

                this.el.modalContacts.hide();
            })


         });

         this.el.recordMicrophone.on('click', e=>{
               this.el.recordMicrophone.show();
               this.el.btnSendMicrophone.hide();
               this.starRecordMicrophoneTime();
         });

            this.el.btnCancelMicrophone.on('click', e=>{
this.closeRecordMicrophone();

            });

            this.el.btnFinishMicrophone.on('click', e=>{
this.closeRecordMicrophone();
                
            });
  

} 
startRacordMicrophoneTime(){

 let start = Date.now();

 this._recordMicrophoneInterval = setInterval(()=>{
   this.el.recordMicrophoneTimer.innerHTML = format.toTime(Date.now() - start);

 }, 100);
}


closeRecordMicrophone(){

    this.el.recordMicrophone.hide();
    this.el.btnSendMicrophone.show();
    clearInterval(this._recordMicrophoneInterval);



}

closeAllMainPanel(){
this.el.panelMessagesContainer.hide();
this.el.btnAttachDocumentPreview.removeClass('open');
this.el.panelCamera.removeClass('open');
}



 closeMenuAttach(e){
document.removeEventListener('click', this.cioseMenuAttach);
this.el.menuAttach.removeClass('open');



 }

closeAllLeftPanel(){

    this.el.PanelEditProfile.hide();
    this.el.panelAddContact.hide();
}
}