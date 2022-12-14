import { User } from '../model/user';
import { Chat } from '../model/Chat';
import { Message } from '../model/message';
import { Base64 } from '../utils/Base64';
import { Upload } from '../utils/Upload';
import { Format } from '../utils/Formata';
import { CameraControllerr } from './CameraControllerr';
import { DocumentPreviewController } from './DocumentPreviewController';
import { Firebase } from '../utils/Firebase';
import { MicrophoneController } from './MicrophoneController';

export class WhatspController{

constructor(){ 
this._active = true;
  this._firebase = new Firebase();

 this.initAuth(); 
 this.elementPrototype();
 
 this.loadElements(); 
 this.initEvents();  
 this.checkNotifications();
 
}
checkNotifications(){

if(typeof Notification === 'function'){

  if (Notification.permission !== 'granted'){

    this.el.alertNotificationPermission.show();

  } else {

          this.el.alertNotificationPermission.hide();

  }
  this.el.alertNotificationPermission.on('click', e => {

       Notification.requestPermission(permission => {
        if(permission === 'granted') {
          this.el.alertNotificationPermission.hide();
          console.info('notificações permitidas!')
        }


       });

  });
}
  



  }

  notification(data){

    if (Notification.permission === 'granted') {
  
      let n = new Notification(this._contactActive.name, {
        icon: this._contactActive.photo,
        body: data.content
      });

         let sound = new Audio('./audio/alert.mp3');
         sound.currentTime = 0;
         sound.play();

      setTimeout(() => {

     if (n) n.close();

      }, 3000);
    }
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

                 this._messagesRecived = [];

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

              if(!me && this._messagesRecived.filter(id => { return ( id === data.id ) }).length === 0 ) {

                   this.notification(data);
                   this._messagesReceived.push(data.id);

              }
               

                

                let view = message.getViewElement(me);
             
             if(!this.el.panelMessagesContainer.querySelector('#_' + data.id)){
              
                if(!me){
              doc.ref.set({
                status: 'read'
              }, {
             merge: true

              });

                }

               

              this.el.panelMessagesContainer.appendChild(view);

             
              }else {
                

                let parent = this.el.panelMessagesContainer.querySelector('#_' + data.id);
                      parent.replaceChild(view, this.el.panelMessagesContainer.querySelector('#_' + data.id))
                

              }
              
              
              
              if(this.el.panelMessagesContainer.querySelector('#_' + data.id)){

                
               let msgEl = this.el.panelMessagesContainer.querySelector('#_' + data.id)
                msgEl.querySelector('.message-status').innerHTML = message.getStatusViewElement()
                .outerHTML;  
               
              }
                    if(message.type === 'contact') {
                      div.querySelector('.btn-message-send').on('click', e => {
                        Chat.crateIfNotExists(this._user.email, message.contact.email).then(chat => {
                          
                          let contact = new user(message.content);

                          contact.on('datachange', data => {
                                
                            contact.chatId = chat.id;

                            this._user.addContact(contact);
            
                            this._user.chatId = chat.id;
             
                             contact.addContact(this._user);
             
                              this.setActiveChat(contact);

                          })

                         
                            });
                       });

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

 this.el[Format.getCamelCase(Element.id)] = Element;

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
    
  window.addEventListener('focus', e=>{
       this._active = true;

  });

  window.addEventListener('blur', e=>{
    this._active = false;

});

  this.el.inputSearchContacts.on('keyup', e => {
if (this.el.inputSearchContacts.value.length > 0){

  this.el.inputSearchContactsPlaceholder.hide();

}else{

this.el.inputSearchContactsPlaceholder.show();
}format


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

       this.el.photoContainerEditProfile.on('change', e =>{

       if (this.el.inputProfilePhoto.files.length > 0){
        let file = this.el.inputProfilePhoto.files[0];
           
         Upload.send(file, this._user.email).then(snapshot => {
          this._user.photo = snapshot.downloadURL;
          this._user.save().then(() => {
             
            this.el.btnClosePanelEditProfile.click();

          });
         });

       }

       })

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

      let contact = new User(formData.get('email'));

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
              
             [...this.el.inputPhoto.files].forEach(files =>{
              
                   message.sendImage(this._contactActive.chatId, this._user.email, file);
                   message.sendImage(this._contactActive.chatId, this._user.email, file);  

             });

            });

            this.el.btnAttachCamera.on('click', e => {
               this.closeAllMainPanel()
                this.el.panelCamera.addClass('open');
                this.el.panelCamera.css({
                      'height':'calc(100% - 120px)'

                });
                     this._camera = new CameraControllerr(this.el.videoCamera);

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

              this.el.bntSendPicture.disabled = true;
               
                let regex = /^data:(.+)png;base64,(.*)$/;
                 let result = this.el.pictureCamera.src.match(regex);
                  let mimeType = result[1];
                  let ext = mimeType.split('/')[1];
                  let filename = `camera${Date.now()}.${ext}`;

                 let picture = new Image();
                 picture.src = this.el.pictureCamera.src;
                 picture.onload = e =>{
                  let canvas = document.createElement('canvas');
                  let context = canvas.getContext('2d');

                  canvas.width = picture.width;
                  canvas.height = picture.height;

                  context.translate(picture.width, 0);
                  context.scale(-1, 1);

                  context.drawImage(picture, 0, 0, canvas.width, canvas.height);
                  fetch(canvas.toDataURL(mimeType))
                  .then(res => {return res.arrayBuffer(); })
                  .then(buffer => { return new File([buffer], filename, {type: mimeType});})
                  .then(file => {

                        Message.sendImage(this._contactAcive.chatId, this._user.email, file);
                       this.el.btnSendPicture.disable = false;
                       this.claseAllMainPanel();
                       this.el._camera.stop();
                       this.el.btnReshootPanelCamera.hide();
                       this.el.pictureCamera.hide();
                       this.el.videoCamera.show();
                       this.el.containerSendPicture.hide();
                       this.el.containerTakePicture.show();
                       this.el.panelMessagesContainer.show();

                      });
                 }


                 
                   

                 
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
                    let file = this.el.inputDocument.files[0];
                    let base64 = this.el.imgPanelDocumentPreview.src

                    if(file.type === 'apllication/pdf') {
                      Base64.toFile(base64).then(filePreview => {
                      Message.sendDocument(this._contactActive.chatId,
                        this._user.email, file, filePreview,
                        this.el.infoPanelDocumentPreview.innerHTML);
                      });
                    }else{
                      Message.sendDocument(this._contactActive.chatId,
                        this._user.email, file);
                    }
                  this.el.btnAttachContact.click();


            });

            this.el.btnAttachContact.on('click', e=> {
                 
                  this._contactsController = new ContactsController(this._contactsController, this._user);
                  
                  this._contactsController.on('select', contact => {

                    Message.sendContact(this._contactive.chatId,
                      this._user.email,
                      contact)
                  })
                 
                  this._contactsController.open();
             
            });

            this.el.btnCloseModalContacts.on('click', e=>{
                 this._contactsController.close();
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
               this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);
             })
         });

            this.el.btnCancelMicrophone.on('click', e=>{
              this._microphoneController.stopRecorder();          
              this.closeRecordMicrophone();

            });
            

            this.el.btnFinishMicrophone.on('click', e=>{
              this._microphoneController.on('recorded', (file, metadata) => {;
             Message.sendAudio(
              this._contactActive.chatId,
              this._user.email,
              file,
              metadata,
              this._user.photo
             );

              this._microphoneController.stopRecorder();
              this.closeRecordMicrophone();
                
            });
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