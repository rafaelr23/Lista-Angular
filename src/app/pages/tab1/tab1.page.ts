import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseosServices:DeseosService,
               private router:Router,
               private alert:AlertController,
               private activatedRouter: ActivatedRoute) {}


  async agregarLista(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs:[
        {
          name:'Titulo',
          type:'text',
          placeholder:'Nombre de la Lista'
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler:() =>{
            console.log('Cancelar');
          }
        },
        {
          text:'Crear',
          handler: (data) => {
            console.log(data);
            if(data.Titulo.length === 0){
              return;
            }

            //Crear la Lista
            const listaId = this.deseosServices.crearLista(data.Titulo);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });

    alert.present();
   // this.router.navigateByUrl('/tabs/tab1/agregar');
  }

  subLista(pendiente:number){
    this.router.navigateByUrl(`/tabs/tab1/agregar/${pendiente}`);
  }
}
