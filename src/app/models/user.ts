import { Byte } from "@angular/compiler/src/util";

export class User {
    
    constructor(public id :number ,public username :string,public password :string ,public role : string ,public image:  any,public phone :Number){

    }
 
    public getImage(){
    
        const base64Data = this.image
        const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
        console.log(retrievedImage);
        return retrievedImage;
    
      }


}