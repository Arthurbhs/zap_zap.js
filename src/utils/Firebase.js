import * as firebase from 'firebase'
import * as firestore from 'firebase/firestore'

export class Firebase {

    constructor() {

        this.init();

    }
   
    init(){

        if (!window._initializedFirebase) {

            firebase.initializeApp({
                apiKey: "AIzaSyBkEtmptkIn0XiRALz2ETI1_-ErHpZ7mK4",
                authDomain: "zapzap-51fb6.firebaseapp.com",
                projectId: "zapzap-51fb6",
                storageBucket: "gs://zapzap-51fb6.appspot.com",
                messagingSenderId: "960300567586",
                appId: "1:960300567586:web:795d522acd4312bc200e7b",
                measurementId: "G-2YPXYVYQKT"
            });

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }

    }

    initAuth(){

        return new Promise((resolve, reject)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {

                let token = result.credential.accessToken;
                let user = result.user;

                resolve(user, token);

            }).catch(function (error) {

                reject(error);

            });

        });        

    }

    static db(){

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

}