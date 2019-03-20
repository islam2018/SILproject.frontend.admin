import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort} from '@angular/material';
import { TableUtilisateursFabricantsDataSource } from '../../dataSources/table-utilisateurs-fabricants-datasource';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MarqueService} from '../../services/marque.service';
import {NouvelleMarqueComponent} from '../../pages/administration/nouvelle-marque/nouvelle-marque.component';
import {SupprimerMarqueComponent} from '../../pages/administration/supprimer-marque/supprimer-marque.component';
import {ModifierMarqueComponent} from '../../pages/administration/modifier-marque/modifier-marque.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TableMarquesComponent} from '../table-marques/table-marques.component';
import {TableMarquesDataSource} from '../../dataSources/table-marques-datasource';
import {ViewUpdateService} from '../../services/view-update.service';
import {UtilisateurfabricantService} from '../../services/utilisateurfabricant.service';
import {NouvelUtilisateurComponent} from '../../pages/administration/nouvel-utilisateur/nouvel-utilisateur.component';

@Component({
  selector: 'app-table-utilisateurs-fabricants',
  templateUrl: './table-utilisateurs-fabricants.component.html',
  styleUrls: ['./table-utilisateurs-fabricants.component.css'],
  animations: [
    trigger('popOverState', [
      state('not', style({backgroundColor: 'transparent'})),
      state('changed', style({backgroundColor: '#68ffe1'})),
      transition('not => changed', animate('500ms ease-out')),
      transition('changed => not', animate('1000ms ease-in'))
    ])
  ]
})
export class TableUtilisateursFabricantsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableUtilisateursFabricantsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id','Photo', 'Nom', 'Prénom', 'Fabricant', 'Compte' , 'Gestion'];

  searchForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private utilfabService: UtilisateurfabricantService,
              private view: ViewUpdateService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new TableUtilisateursFabricantsDataSource(this.view, this.utilfabService, this.paginator, this.sort);
    this.searchForm = this.formBuilder.group({
      filter: ''
    });
  }

  nouvelUtilisateur() {
    this.dialog.open(NouvelUtilisateurComponent, {
      width: '50%'
    });
  }

  supprimerMarque(code) {
    let dialogRef: MatDialogRef<SupprimerMarqueComponent> = this.dialog.open(SupprimerMarqueComponent, {
      width: '35%'
    });
    dialogRef.componentInstance.CodeMarque = code;
  }

  modifierMarque(code, rowIndex) {
    /*let dialogRef: MatDialogRef<ModifierMarqueComponent> = this.dialog.open(ModifierMarqueComponent, {
      width: '35%'
    });
    dialogRef.componentInstance.CodeMarque = code;
    dialogRef.componentInstance.rowIndex = rowIndex;
    console.log(rowIndex);*/
  }

  applyFilter(filterValue: string) {
    //this.view.filter(filterValue);
  }


  getStateName(index) {
    return this.view.usersStates[index] ? 'changed' : 'not';
  }
}
