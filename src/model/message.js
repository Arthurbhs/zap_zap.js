import { Firebase } from "../utils/Firebase";
import { Model } from "./Model";
import { Format } from "../utils/Formata";

export class Message extends Model {

constructor(){

super();



}

get content() { return this._data.content; }
set content(value) { return this._data.content = value;}

get id() { return this._data.id; }
set id(value) { return this._data.id = value;}

get type() { return this._data.type; }
set type(value) { return this._data.type = value }

get timeStanp() { return this._data.timeStamp; }
set timeStanp(value) { return this._data.timeStamp = value }

get status() { return this._data.status; }
set status(value) { return this._data.status = value; }

getViewElement( me = true){
  let div = document.createElement('div');

  div.className = 'message';

    switch(this.type) {

      case 'contract':
             divinnerHTML 
      break;
              
      case 'image':
        divinnerHTML
        break;

        case 'document':
            divinnerHTML
            break;

            case 'audio':
                divinnerHTML = ``
                break;
                default:
                    div.innerHTML = ``;
    }


  let className =  'message-in';

  if (me) {
    className = 'message-out';

    div.querySelector('.msg-time').parentElement
    .appendChild(this.getStatusViewElement());

   
  }

  div.firstElementChild.classList.add(className);

  return div;

  st
}

static send(chatId, from, content, type){
return new Promisse((s, f) => {

  Message.getRef(chatId).add({
    conten,
    timeStamp: new Date(),
     status: 'wait',
     type,
     from
}).then(result => {
  result.parent.doc(result.id).set({
         status:'sent'

  }, {
    merge: true
  }).then(() => { 

    s();
  });

});
 
 });

}

static getRef(chatId){

return Firebase.db().collection('chats')
.doc(chatId).collection('messages');

}

getStatusViewElement(){

let div = document.createElement('div');

div.ClassName = 'message-status';


switch (this.status) {

case 'wait': 
  break;

  case 'sent': 
  break;

  case 'received': 
  break;

  case 'read': 
  break;

}

}



}