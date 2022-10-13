const firebase = require('firebase');
require('firebase/firestore');

export class Firebase{

constructor(){
    this._firebaseConfig =  {
        apiKey: "AIzaSyBkEtmptkIn0XiRALz2ETI1_-ErHpZ7mK4",
        authDomain: "zapzap-51fb6.firebaseapp.com",
        projectId: "zapzap-51fb6",
        storageBucket: "gs://zapzap-51fb6.appspot.com",
        messagingSenderId: "960300567586",
        appId: "1:960300567586:web:795d522acd4312bc200e7b",
        measurementId: "G-2YPXYVYQKT"
      };
  this.init();
     
}
init(){

 if(!Window._initilizedFirebase){

   firebase.initializeapp(this._config);
   firebase.firestore().settings({
    timestampsInSnapshots: true
   });
  Window._initializedFirebase = true; 
}

}
 static db(){

return firebase.firestore();

 }

 static hd(){

    return firebase.storage();
    
     }

     initAuth(){

         return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => {

            let token = result.credential.accessTaken;
            let user = result.user;

            s({user, token});
      

        }).catch(err => {
            f(err);

        });

         } );


     }
}