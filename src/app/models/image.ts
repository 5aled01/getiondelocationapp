import { Byte } from "@angular/compiler/src/util";

export class Image {
    
    constructor(public id : number,public idCorespondance :number ,public  corespondance : String ,public image : Byte[]) {
   
}
}