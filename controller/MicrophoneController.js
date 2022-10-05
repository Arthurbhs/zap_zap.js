class MicrophoneController{
    
   constructor(){
    navigator.mediaDevices.getUserMedia({
       audio: true
        
          }).then(stream=>{
        this._stream = stream;

let audio = new Audio();


        this._audio.src = URL.createObjectURL(stream);
        this._audio.play();
        
         }).catch(err=>{
            console.error(err);
          });

   }

}