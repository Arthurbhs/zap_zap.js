import { Formata } from '../utils/Formata';
import { CameraController } from '../controller/CameraController';
import { DocumentPreviewController } from './DocumentPreviewController';
import { MicrophoneController } from './MicrophoneController';
import { Firebase } from './../utils/Firebase';
import { user } from '../model/user';
import { Chat } from '../model/Chat';
import { Message } from '../model/message';

export class whatspController{

constructor(){

  this._firebase = new Firebase();

 this.initAuth(); 
 console.log('watspController ok');
 this.elementPrototype();
 
 this.loadElements(); 
 this.initEvents();  
 
}

initAuth(){

this._firebase.initAuth()
.then(response => {
   this._user = response.user();
   this._user = new user(response.user.email);

    this._user.on('datachange', data =>{
         document.querySelectorAll('title').inerHTML = data.name + ' - zap zap';

              this.el.inputNamePanelEditProfile.innerHTML = data.name;
         
               if(data.photo) {
                   let photo = this.el.imgPanelEditProfile;
                   photo.src = data.photo;
                   photo.show();
                   this.el.imgFaultPanelEditProfile.hide();

                   let photo2 = this.el.myPhoto.querySelector('img');
                   photo2.src = data.photo;
                   photo2.show();

               }
                 this.initcontacts();    

    });

      this._user.name = response.user.displayName;
      this._user.email = response.user.displayemail;
      this._user.photo = response.user.displayphotoURL;

      this._user.save().then(() => {

        this.el.appContent.css({
          display: 'flex'
        });

      });

}) .catch(err => {
   console.error(err);

});
}

initcontacts() {

 
  this._user.on('contactschange', docs => {
           this.el.contactsMessagesList.innerHTML = '';

           docs.forEach(doc => {
            let contact = doc.data();
            let div = document.createElement('div');
            div.className = 'contact-item';
            div.innerHTML = ``; 
            if(contact.photo){
             let img = div.querySelector('.photo');
             img.src = contact.photo;
             img.show();

            }

            div.on('click', e => {

           
              this.setActiveChat(contact);
                 


            })

           
            this.el.contactsMessagesList.appendChild(div);

           });
  });

  this._user.getContacts();


}

setActiveChat(contact){
if (this._contactActive) {
Message.getRef(this._contactActive.chatId).onSnapshot(() => {

});

}
;
this.contactAtive = contact;

this.el.activeName.innerHTML = contact.name;
                 this.el.activeStatus.innerHTML = contact.status;

                 if(contact.photo) {
                 let img = this.el.activePhoto;
                 img.src = contact.photo;
                 img.show();
                 }

                 this.el.home.hide();
                 this.el.main.css({
                   display:'flex'

                 });
                 this.el.panelMessagesContainer.inerHTML = '';
                 Message.getRef(this._contactActive.chatId).
                 orderBy('timeStamp').onSnapshot(docs => {

              

              let scrollTop = this.el.panelMessagesContainer.scrollTop;
              let scrollTopMax = (this.el.panelMessagesContainer.scrollHeight 
                - this.el.panelMessagesContainer.offsetHeight);
                let autoScroll = (scrollTop >= scrollTopMax);

              docs.forEach(doc => {
              let data = doc.data();
              data.id = doc.id;
              
              let message = new Message();
                message.fromJSON(data);

                let me = (data.from === this._user.email);
             
             if(!this.el.panelMessagesContainer.querySelector('#_' + data.id)){
              
                if(!me){
              doc.ref.set({
                status: 'read'
              }, {
             merge: true

              });

                }

                let view = message.getViewElement(me);

              this.el.panelMessagesContainer.appendChildI(view);

             
              }else if(!me){

                
               let msgEl = this.el.panelMessagesContainer.querySelector('#_' + data.id)
                msgEl.querySelector('.message-status').innerHTML = message.getStatusViewElement()
                .outerHTML;  
               
              }
              


              });
              if(autoScroll){
                this.el.panelMessagesContainer.scrollTop = 
                (this.el.panelMessagesContainer.scrollHeight 
                 - this.el.panelMessagesContainer.offsetHeight);}
                 else{
                  this.el.panelMessagesContainer.scrollTop = scrollTop;
                 }

             
                 });

                }
loadElements(){
this.el = {};
document.querySelectorAll('[id]').forEach(Element =>{

 this.el[Formata.getCamelCase(Element.id)] = Element;

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
  this.el.inputSearchContacts.on('keyup', e => {
if (this.el.inputSearchContacts.value.length > 0){

  this.el.inputSearchContactsPlaceholder.hide();

}else{

this.el.inputSearchContactsPlaceholder.show();
}


 this._user.getContacts(this.el.inputSearchContacts.value);
});
this.el.myPhoto.on('click', e =>{
    this.closeAllLeftPanel();
    this.el.panelEditProfile.show();
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
   
this.el.panelEditProfile.removeClass('open');
});

this.el.btnClosePanelAddContact.on('click', e =>{

    this.el.panelAddContact.removeClass('open'); 

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

      this.el.btnSavePanelEditProfile.disable = true;

      this._user.name = this.el.inputNamePanelEditProfile.innerHTML;

      this._user.save().then(() =>{
        this.el.btnSavePanelEditProfile.disable = false;

      });

     });

         this.el.formPanelAddContact.on('submit', e =>{
            e.preventDefault();

  

      e.preventDefault();

      let formData = new FormData(this.el.formPanelAddContact);

      let contact = new user(formData.get('email'));

          contact.on('datachange', data => {
                if (data.name){

            Chat.crateIfNotExists(this._user.email, contact.email).then(chat => {


              contact.chatId = chat.id;

               this._user.chatId = chat.id;

                contact.addContact(this._user);

                  this._user.addContact(contact).then(() => {

                    this.el.btnClosePanelAddContact.click();
                   console.info('contato foi adicionado!');

                  }); 
                });
                }else{
                  console.error('Usuário não foi encontrado');
                }
            
          });

        
      
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
           document.addEventListener('click', this.closeMenuAttach.bind(this));
          });

            this.el.btnAttachPhoto.on('click', e=> {
               this.el.inputPhoto.click();

            });

            this.el.inputPhoto.on('change', e=> {
              console.log(this.el.inputPhoto.files);
             [...this.el.inputPhoto.files].forEach(files =>{
              console.log(files);
                    

             });

            });

            this.el.btnAttachCamera.on('click', e => {
               this.closeAllMainPanel()
                this.el.panelCamera.addClass('open');
                this.el.panelCamera.css({
                      'height':'calc(100% - 120px)'

                });
                     this._camera = new CameraController(this.el.videoCamera);

            });

            this.el.btnClosePanelCamera.on('click', e=> {
                this.closeAllMainPanel();
                 this.el.panelMessagesContainer.show();
                 this._camera.stop();

            });

            this.el.btnTakePicture.on('click', e=>{
                
              let dataUrl = this._camera.takePicture();

              this.el.pictureCamera.src = dataUrl;
              this.el.pictureCamera.show();
              this.el.videoCamera.hide();   
              this.el.btnReshootPanelCamera.show();
              this.el.containerTakePicture.hide();
              this.el.containerSendPicture.show();
            });

            this.el.btnReshootPanelCamera.on('click', e =>{
              this.el.pictureCamera.hide();
              this.el.videoCamera.show();   
              this.el.btnReshootPanelCamera.hide();
              this.el.containerTakePicture.show();
              this.el.containerSendPicture.hide();

            });

             this.el.btnSendPicture.on('click', e => {
               console.log(this.el.pictureCamera.src);

             });


            this.el.btnAttachDocument.on('click', e=> {
                this.closeAllMainPanel()
                this.el.panelDocumentPreview.addClass('open');
                this.el.panelDocumentPreview.css({
                    'height':'calc(100% - 120px)'

              });
               this.el.inputDocument.click();

            });

             this.el.inputDocument.on('change', e=>{
               
              if(this.el.inputDocument.file.length) {

               let file = this.el.inputDocument.files[0];
                
               this._camera._documentPreviewController = new DocumentPreviewController(file);

               this._documentPreviewController.getPreviewData().then(data =>{
 
                 console.log('ok', data);

                   this.el.imgPanelDocumentPreview.src = result.src;
                   this.el.infoPanelDocumentPreview.innerHTML = result.info;
                   this.el.imagePanelDocumentPreview.show();
                   this.el.filePanelDocumentPreview.hide();

               }).catch(err =>{

                console.log(file.type);

                switch(file.type) {
              case 'application/vnd.ms-excel':
              case 'applivation/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';
               break;

               case 'application/vnd.ms-powerpoint':
               case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';
               break;
              
               case 'application/msword':
               case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
               break;

               default:
                  this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
               break;
                }
                this.el.filenamePanelDocumentPreview.innerHTML = file.name; 
                this.el.imagePanelDocumentPreview.hide();
                this.el.filePanelDocumentPreview.show();

               });
              }

             })


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

         this.el.btnSendMicrophone.on('click', e=>{
               this.el.recordMicrophone.show();
               this.el.btnSendMicrophone.hide();
            

             this.microphoneController = new MicrophoneController();
             
             this._microphoneController.on('ready', musica => {
               console.log('ready event');
              this._microphoneController.satrtRecorder();
             });
             this._microphoneController.on('recordTimer', timer => {
               this.el.recordMicrophoneTimer.innerHTML = Formata.toTime(timer);
             })
         });

            this.el.btnCancelMicrophone.on('click', e=>{
              this._microphoneController.stopRecorder();          
              this.closeRecordMicrophone();

            });
            

            this.el.btnFinishMicrophone.on('click', e=>{
              this._microphoneController.stop();
              this.closeRecordMicrophone();
                
            });


            this.el.inputText.on('keypress', e => {
         if(e.key === 'Enter' && !e.ctrlkey) {
             e.preventDefault();
             this.el.btnSend.click();

         }
           

            });

  this.el.inputText.on('keyup', e =>{
    if(this.el.inputText.innerHTML.length){
          this.el.inputPlaceholder.hide();
           this.el.btnSendMicrophone.hide();
           this.el.btnSend.show();
    }
    else{
      this.el.inputPlaceholder.show();
      this.el.btnSendMicrophone.show();
      this.el.btnSend.hide();

    }
  });

    this.el.btnSend.on('click', e =>{
Message.send(this._contactAcive.chatId,
  this._user.email,
  'text',
  this.el.inputText.innerHTML);

  this.el.inputText.innerHTML = '';
  this.el.panelEmojis.removeClass('open');
    });
    this.el.btnEmojis.on('click', e => {
           this.el.panelEmojis.addClass('open');

    });

    this.el.panelEmojis.querySelectorAll('.emojiK').forEach(emoji =>{
        emoji.on('click', e => {
           

           let img = this.el.imgEmojiDefault.cloneNode();

           img.style.cssText = emoji.style.cssText;
           img.dataset.unicode = emoji.dataset.unicode;
           img.alt = emoji.dataset.unicode;

           emoji.classList.forEach(name =>{
             img.classList.add(name);

           });

           let cursor = window.getSelection();

           if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
              this.el.inputText.focus();
               cursor = window.getSelection();
           }

           let range = document.createRange();

           range = cursor.getRangeAt(0);
           range.deleteContents(); 

           let frag = document.createDocumentFragment();

           frag.appendChild(img);

           range.insertNode(frag);
 
           range.setStartAfter(img);

           

           this.el.inputText.dispatchEvent(new Event('keyup'));

        });

    })



} 



closeRecordMicrophone(){

    this.el.recordMicrophone.hide();
    this.el.btnSendMicrophone.show();
   



}

closeAllMainPanel(){
this.el.panelMessagesContainer.hide();
this.el.btnAttachDocumentPreview.removeClass('open');
this.el.panelCamera.removeClass('open');
}



 closeMenuAttach(e){
document.removeEventListener('click', this.closeMenuAttach);
this.el.menuAttach.removeClass('open');



 }

closeAllLeftPanel(){

    this.el.panelEditProfile.hide();
    this.el.panelAddContact.hide();
}
}