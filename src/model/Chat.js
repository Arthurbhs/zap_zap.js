import { Firebase } from "../utils/Firebase";

export class Chat extends Model{
 
contructor(){
super();



}

get user() {this._data.user;}
set user(value) {this._data.user = value;}

get TimeStamp() {this._data.TimeStamp;}
set TimeStamp(value) {this._data.TimeStamp = value;}

static getRef(){

     return Firebase.db().collection('/chats');
}

 static create(meEmail, contactEmail){

   return new Promise((s, f) => {

     let users = {};

     users[btoa(meEmail)] = true;
     users[btoa(contactEmail)] = true;

       chat.getRef().add({
        users,
        timeStamp: new Date()
       }).then(doc => {

          chat.getRef().doc(doc.id).get().then(chat => {

              s(chat);

          }).catch(err => { f(err) });


       }).catch(err => { f(err) });

   });

 }

 static find(meEmail, contactEmail){

   return chat.getRef().where(btoa(meEmail), '==', true)
 .where(btoa(contactEmail), '==', true).get();

 };

 static crateIfNotExists(meEmail, contactEmail){

return new Promise((s, f) =>{

        Chat.find(meEmail, contactEmail).then(chats => {

            if (chats.empty) {
              chats.create(meEmail, contactEmail).then(chat => {

           s(chat);

              });


            }
            else{
                chats.forEach(chat => {

                    s(chat);
                });
            }

        });

});

 }

}