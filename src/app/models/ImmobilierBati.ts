import { Point } from "./Point";

export class ImmobilierBati {
    
    constructor(public id :number ,
     
        public adresse :String ,
        public localisation : Point ,
        public numeroPermie:  String,
        public longueur :Number,
        public  largeur :Number,
        public idProprietaire :number,
        public nom :string,
        public  longueurBati :number,
        public largeurBati :number){}
           
}