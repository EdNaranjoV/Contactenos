import { Component, OnInit } from '@angular/core';

import { NavController,ToastController } from '@ionic/angular';

import {Contact}from '../../models/contact'
import { from } from 'rxjs';

@Component({
  selector: 'Add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
    public nombres:string="";
    public tel:String="";
  constructor(public navCtrl: NavController,public toastController: ToastController) { 
  }

  ngOnInit() {
  }

  validaNum(num:String){
    return num && num.length>=8;
  }

  onClick(){
    

     let contactoModel:Contact= new Contact(this.nombres,Number(this.tel));

     if(!this.validaNum(this.tel)){
       this.presentToast("Error en formato del Telefono");
     }else{
    if(localStorage.getItem("contacts")){
      let list:Array<Contact>=JSON.parse(localStorage.getItem("contacts"));
      let existe:boolean=true;
      list.forEach(element => {
        console.log(element);
        if(element.telephone==contactoModel.telephone){
          existe=false;
        };
      });
      if(existe){
        list.push(contactoModel);
        localStorage.setItem("contacts", JSON.stringify(list));
        this.presentToast("Numero añadido a Contactos.");
      }else{
        this.presentToast("El número telefonico ya se encuentra registrado.");
      }
      console.log(list);
    }else{
      {
        let list = [];
        list.push(contactoModel);
        localStorage.setItem("contacts", JSON.stringify(list));  
      }
    }}
    
  }

  async presentToast(estado:string) {
    const toast = await this.toastController.create({
      message: estado,
      duration: 4000
    });
    toast.present();
  }

 


}
