import { Point } from "./Point";

export class ImmobilierBati {
    
    constructor(public id :number ,
        public idProprietaire :number,
        public adresse :String ,
        public localisation : Point ,
        public numPermie:  number,
        public longueur :Number,
        public  largeur :Number,
        public  longueurBati :number,
        public largeurBati :number){
    }
}