import { Firebase } from "../utils/Firebase";
import { Model } from "./Model";
import { Formata } from "../utils/Formata";
import { Upload } from "../utils/Upload";


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

get preview() { return this._data.preview; }
set preview(value) { return this._data.preview = value; }

get info() { return this._data.info; }
set info(value) { return this._data.info = value; }

get from() { return this._data.from; }
set from(value) { return this._data.from = value; }

get fileType() { return this._data.fileType; }
set fileType(value) { return this._data.fileType = value; }

get size() { return this._data.size; }
set size(value) { return this._data.size = value; }

get fileName() { return this._data.fileName; }
set fileName(value) { return this._data.fileName = value; }

get photo() { return this._data.photo; }
set photo(value) { return this._data.photo = value; }

get duration() { return this._data. duration; }
set  duration(value) { return this._data. duration = value; }





getViewElement( me = true){
  let div = document.createElement('div');
  div.id = `_${this.id}`;
  div.className = 'message';

    switch(this.type) {

      case 'contract':
             divinnerHTML 

             if(this.content.photo){
            
             let img = div.querySelector('.photo-contact-sended');
             img.src = this.content.photo;
             img.show();

             }
            
      break;
              
      case 'image':
        divinnerHTML
        break;

        case 'document':
            divinnerHTML


            div.on('click', e => {

           window.open(this.content);

            });
            break;

            case 'audio':
                divinnerHTML = ``;

                if (this.photo){

               let img = div.querySelector( '.message-photo');
               img.src = this.photo;
               img.show();
                }

                let audioEl = div.querySelector('audio');
                let loadEl = div.querySelector('audio-load');
                let btnpause = div.querySelector('audio-pause');
                let inputRange = div.querySelector('[type=range]');
                let audioDuration = div.querySelector('.message-audio-duration');

                audioEl.onloadeddata = e => {
                  
                 loadEl.hide();
                 btnPlay.show();

                }

                audioEl.onplay = e => {
                  
                  btnPlay.hide();
                  btnPause.show();
 
                 }

                 audioEl.onpause= e => {
                  
                  div.querySelector('.message-audio-duration').innerHTML = Formata.toTime(
                    this.duration*1000
                  );
                  btnPlay.show();
                  btnPause.hide();
 
                 }

                 audioEl.onloadeddata = e => {
                  
                  loadEl.hide();
                  btnPlay.show();
 
                 }

                 audioEl.onended = e => {
                 
                  audioEl.currentTime = 0;

                 }

                 audioEl.ontimeupdate = e => {
                 
                  btnPlay.hide();
                  btnPause.hide();
 
                  audioDuration.innerHTML = Formata.toTime(audioEl.currenTime * 1000);
                  inputRange.value = (audioEl.currentTime * 100) / this.duration;

                  if (audioEl.paused) {
                    btnPlay.show();

                  }else {
                    btnPause.show();
                  }

                 }

                 btnPlay.on ('click', e => {
                 
                  audioEl.play();

                 });

                 btnpause.on('click', e => {
                 
                  audioEl.pause();

                 });

                 btnpause.on('change', e => {
                 
                  audioEl.currentTime = (inputRange.value * this.duration) / 100;

                 });


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

  
}

static upload(file, from){

return Upload.send(file, from);

 
}
static sendContact(chatId, from, contact){

return Message.send(chatId, from, 'contact', contact);

}

static sendAudio( chatId, from, file, metadata, photo ){

return Message.send(chatId, from, 'audio', ''). then(msgRef => {

Message.upload(file, from).then(snapshot => {
  let downloadFile = snapshot.downloadURL;

  msgRef.set({
    content: downloadFile,
    size: file.type,
    status: 'sent',
    photo,
    duration: metadata.duration
   }, {
         merge: true
   });

});

});

};

static sendDocument(chatId, from, file, filePreview, info){
Message.send(chatId, from, 'document', '').then(msgRef => {

  
    Message.upload(file, from).then((snapshot) => {
     let downloadFile = snapshot.downloadURL;
    if(filePreview){
     Message.upload(filePreview, from).then((snapshot2) => {
      let downloadPreview = snapshot2.downloadURL;

      msgRef.set({
       content: downloadFile,
       preview: downloadPreview,
       filename: file.name,
       size: file.type,
       status: 'sent',
       info
      }, {
            merge: true
      });

      });
    } else{
      msgRef.set({
        content: downloadFile,
        
        filename: file.name,
        size: file.type,
        status: 'sent',
       }, {
             merge: true
       });
    }
   });

  

});
}
       
      

static sendImage(chatId, from, file){
  return new Promise((s, f) => {
    Message.upload(file, from).then((snapshot) => {
 
     Message.send(chatId, from,
       'image', snapshot.downloadURL).then(() => {
      s();
     });

  })
});

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

      let docRef = result.parent.doc(result.id);
  docRef.set({
         status:'sent'

  }, {
    merge: true
  }).then(() => { 

    s(docRef);
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