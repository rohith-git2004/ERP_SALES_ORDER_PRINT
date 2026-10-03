import { Component } from '@angular/core';
interface OrderItem { name:string; code:string; size:string; qty:number; rate:number; }
@Component({selector:'app-root',standalone:true,templateUrl:'./app.component.html',styleUrl:'./app.component.css'})
export class AppComponent {
 order={voucherNumber:'SO-1001',voucherType:'Voucher Receipt',routePlan:'Dubai',date:'03-10-2026',customer:'ABC Trading',status:'Approved',
 items:[{name:'Shirt',code:'SH-001',size:'L',qty:10,rate:500},{name:'Pants',code:'PT-002',size:'32',qty:5,rate:800}] as OrderItem[]};
 get subtotal(){return this.order.items.reduce((s,i)=>s+i.qty*i.rate,0)} get vat(){return this.subtotal*.05} get total(){return this.subtotal+this.vat}
 get totalQty(){return this.order.items.reduce((s,i)=>s+i.qty,0)} print(){window.print()}
 money(v:number){return v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}
}
