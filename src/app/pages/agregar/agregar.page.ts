import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from '../../models/lista-model';
import { ListaItem } from '../../models/lista-items.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreItem='';

  constructor(private deseosService:DeseosService,
              private activatedRouter:ActivatedRoute
    ) { 
      const listaId = this.activatedRouter.snapshot.paramMap.get('listaId');
      console.log(listaId);
      this.lista = this.deseosService.obtenerLista(listaId);
    }

  ngOnInit() {
  }
  agregarItem(){
    if(this.nombreItem.length === 0){
        return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    console.log(nuevoItem);
    this.lista.items.push(nuevoItem);
    

    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }
  cambioCheck(item:ListaItem){
    const PENDIENTE = this.lista.items.filter(itemData => !itemData.completado
    ).length;
    if(PENDIENTE === 0){
        this.lista.terminadaEn = new Date();
        this.lista.completada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }
    
    this.deseosService.guardarStorage();
  }

  borrar(i:number){
  this.lista.items.splice(i,1);
  this.deseosService.guardarStorage();
  }
}
