import { Byte } from "@angular/compiler/src/util";

export class User {
    constructor(public id :number ,public username :string,public password :string ,public role : string ,public image : Byte[]){

    }


}