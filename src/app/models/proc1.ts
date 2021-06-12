import { Byte } from '@angular/compiler/src/util';
export class ProC1 {

    constructor(public id :number ,public nom :string ,public prenom :string ,public nni :number ,public numcomp :string ,
        public pronom :string ,public password :string ,public telephone :number ,public img : any){

    }
    public getImage(){
    
        const base64Data = this.img
        const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
        console.log(retrievedImage);
        return retrievedImage;
    
      }
}