import { ClassEvent } from "../utils/ClassEvent";

export class ContactsController  extends ClassEvent{
constructor(modalEl, user){

 super();

 this._user = user;
 this._modalEl = modalEL;
 this._listEl = document.querySelector('#contact-list');

}
open(){
 this._user.getContacts().then(contacts => {
    this._listEl.innerHTML = '';

    contacts.forEach(contact => {

     let div = document.createElement('div');
         div.innerHTML 

         if(contact.photo){
   let img = div.querySelector('.contact-photo');
img.src = contact.photo;
img.show();
         }
         div.onabort('click', e => {
          this.triggger('slect', contact); 
          this.close();  
         });
         this._listEl.appendChild(div);
    });
 });
 this._modalEl.show();

}
close(){
  this._modalEl.hide();

}

}