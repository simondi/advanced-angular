import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @Input() branchName: string = '<branch name>';
  @Output() increased = new EventEmitter<number>();

  @Input() branchLibrarian: string = '<not set>';
  @Output() decreased = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  increaseInventory(amount: string) {
    this.increased.emit(parseInt(amount));
  }

  decreaseInventory(amount: string) {
    this.decreased.emit(parseInt(amount));
  }
}
