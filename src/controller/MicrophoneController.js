import { ClassEvent } from "../utils/ClassEvent";

export class MicrophoneController extends ClassEvent{
    
   constructor(){
        
      super();

    navigator.mediaDevices.getUserMedia({
       audio: true
        
          }).then(stream=>{
            this._available = true;
        this._stream = stream;

         this.triggger('ready', this._stream);
        
         }).catch(err=>{
            console.error(err);
          });

   }

   isAvailable(){
      this._available;

   }

   stop(){ 
      this._stream.getTracks().forEach(track =>{
          track.stop();
  
      });

}

startRecorder(){

if (this.isAvailable()){

  this._mediaRecord = new MediaRecorder(this._stream, {mimeType: this._mimeType});
   this._recordedChunks = [];
   this._mediaRecorder.addEventListeners('dataavailable', e => {
         if (e.data.size > 0) this._recordedChunks.push();

   });
  this._mediaRecorder.addEventListener('stop', e => {
   let blob = new Blob(this._recordedChunks, {
     type: this._mimetype
  
   });

   let filename = `rec${Date.now()}.webm`;

   let file = new File([blob], filename, {
      type: this._mimeType,
      lastModified: Date.now()

   });
   console.log('file', file);
   
  });
  
  this._mediaRecorder.start();
     this.startTimer();
}

}

stopRecorder(){

   if (this.isAvailable()){
this._mediaRecorder.stop();
this.stop();
this.stopTimer();

   }
   
   }

   startTimer(){

      let start = Date.now();
     
      this._recordMicrophoneInterval = setInterval(() => {

        this.triggger('recordTimer', (Date.now() - start));

      }, 100);
     }

     stopTimer(){
      clearInterval(this._recordMicrophoneInterval);
     }
     

}