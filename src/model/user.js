import { Firebase } from './../utils/Firebase';
import { Model } from './Model';


export class User extends Model{
constructor(id){

super();

this._data = {};
 
if (id) this.getByid(id);
}
get name(){return this._data.name; }
set name(value){this._data.name = value; }

get email(){return this._data.email; }
set email(value){this._data.email = value; }

get photo(){return this._data.photo; }
set photo(value){this._data.photo = value; }

get chatId(){return this._data.chatId; }
set chatId(value){this._data.chatId = value; }

gerByid(id){

    return new Promise((s, f) => {
         
        user.findByEmail(id).onSnapshot(doc => {

            this.fromJSON(doc.data());
              
            s(doc);
        });

    });

}



save(){

return user.findByEmail(this.email).set(this.toJSON());

}


static getRef(){

 return Firebase.db().collection('/users');
 
}

static getContactRef(id){
    return user.getRef()
    .doc(id).collection('contacs');
   
}

static findByEmail(email){
  
    return user.getRef().doc(email);

} 
    addContact(contact){

        return user.ugetContactRef(this.email).doc
        (btoa(contact.email))
        .set(contact.toJSON());

    }
    getContacts(filter = ''){
    return new Promise((s, f) => {
user.getContactRef(this.email).where('name', '>=', filter).onSnapshot(docs => {
     let contacts = [];
     docs.forEach(doc => {

      let data = doc.data();
      data.id = doc.id;
      contacts.push(data);

     });

     thid.trigger('contactschange', docs);

     s(contacts);

});

    });



    }


}
