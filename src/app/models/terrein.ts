import { Point } from "./Point";

export class Terrian {
    
    constructor(public id :number ,
     
        public adresse :String ,
        public localisation : Point ,
        public numeroPermie:  String,
        public  longueur :Number,
        public  largeur :Number,
        public idProprietaire :number,
        public typeProprietaire :string,
        public description :string
        ){}
           
}