
import { Firebase } from "./Firebase";

export class Upload{

    static send(file, from){
        return new Promise((s, f) => {

            let uploadTask =  Firebase.hd().ref(from).child(Date.now() + '_' + file.name).put(file);
            essage.send(this._contactActive.chatId, this._user.email, 'image', '');
            MuploadTask.on('state_changed', e => {
          
          console.info('upload', e);
          
            }, err => {
          
             f(err);
            }, () => {
              
                s(uploadTask.snapshot);
               
          
            })
          
          
          });
    }
}