import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  area = 'Normal';
  orderForm: FormGroup;
  selectedItems: any[] = [];
  itemsCodeList: any[] = [];
  itemsNameList: any[] = [];
  waiterCodeList: any[] = [];
  tableNumberList: any[] = [];
  ordersData: any[] = [];
  selectedIndex: any;
  isUpDate = false
  isTabletOrIpad = false;
  constructor(private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private alertController: AlertController, 
    public toastController: ToastController, private platform: Platform) {
      console.log(this.platform);
      console.log(this.platform.platforms());
      this.isTabletOrIpad = this.platform.is('tablet') || this.platform.is('ipad');
  }
  add(): void {
    if (this.orderForm.valid) {
      if (this.ordersData[this.orderForm.value.tableNumber.id] && this.ordersData[this.orderForm.value.tableNumber.id].length) {
        this.ordersData[this.orderForm.value.tableNumber.id].push(this.orderForm.value);
      } else {
        this.ordersData[this.orderForm.value.tableNumber.id] = [];
        this.ordersData[this.orderForm.value.tableNumber.id].push(this.orderForm.value);
      }
      this.resetForm();
      this.presentToast('Item Added Sucessfully');
    } else {
      this.presentToast();
    }
    console.log(this.ordersData);
  }
  update(): void {
    this.ordersData[this.orderForm.value.tableNumber.id][this.selectedIndex] =  this.orderForm.value;
    this.presentToast('Item Updated Sucessfully');
    this.isUpDate = false;
    this.resetForm();
  }
  delete(): void {
    this.showAlert(this.orderForm.value.tableNumber.id, this.selectedIndex);
  }
  clear(): void {
    this.orderForm.reset();
    this.isUpDate = false;
  }
  ngOnInit() {
    this.selectedItems = [];
    this.setorderForm();
    this.setStaticData();
    this.route.params.subscribe((params) => {
      console.log(params);
      if (+params.id) {
        this.area = 'Normal';
      } else {
        this.area = 'Deluxe';
      }
     // this.orderForm.controls.area.setValue(this.area);
    });
  }
  setStaticData(): void {
    this.tableNumberList = [
      {
        id: 1,
        name: 1
      },
      {
        id: 2,
        name: 2
      },
      {
        id: 3,
        name: 3
      }, {
        id: 4,
        name: 4
      }, {
        id: 5,
        name: 5
      }
    ];
    this.waiterCodeList = [
      {
        id: 1,
        name: 'WAITER1'
      },
      {
        id: 2,
        name: 'WAITER2'
      },
      {
        id: 3,
        name: 'WAITER3'
      }, {
        id: 4,
        name: 'WAITER4'
      }, {
        id: 5,
        name: 'WAITER5'
      }
    ];
    this.itemsCodeList = [
      {
        id: 1,
        name: 'MINI BEERS'
      },
      {
        id: 2,
        name: 'VODKA'
      },
      {
        id: 3,
        name: 'SALADS'
      }, {
        id: 4,
        name: 'BREVERGES'
      }, {
        id: 5,
        name: 'WINE'
      }
    ];
    this.itemsNameList = [
      {
        id: 1,
        name: 'SODA 350 ML',
        price: 25
      },
      {
        id: 2,
        name: 'KF BEER',
        price: 125
      },
      {
        id: 3,
        name: 'KNOCK OUT',
        price: 100
      }, {
        id: 4,
        name: 'MINI BUDWEISER',
        price: 90
      }, {
        id: 5,
        name: 'TUBROG',
        price: 125
      },
      {
        id: 6,
        name: 'MINI BARCADI',
        price: 95
      }
    ];
  }
  getLabelById(arrayName, value): string {
    if (value === '' || value === 0) {
      return '';
    }
    let x;
    return (x = this[arrayName] && this[arrayName].filter(element => element.id === value)).length ? x[0].name : '';
  }
  setorderForm(): void {
    this.orderForm = this.formBuilder.group({
      tableNumber: ['', [Validators.required]],
      itemCode: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      narr: [''],
      pax: [1],
      itemName: ['', [Validators.required]],
    });
    // this.orderForm.valueChanges.pipe(distinctUntilChanged()).subscribe(form => {
    //   if (+form.quantity && form.itemName) {
    //     this.orderForm.controls.rate.setValue(form.quantity * this.getelectedItemPrice(form.itemName), { emitEvent: false });
    //     this.orderForm.controls.tax.setValue(4, { emitEvent: false });
    //   } else {
    //     this.orderForm.controls.rate.setValue(null, { emitEvent: false });
    //   }
    // });
  }
  getelectedItemPrice(itemId): any {
    let x;
    return (x = this.itemsNameList && this.itemsNameList.filter(element =>
      element.id === itemId)).length ? x[0].price : 0;
  }
  getTotalAmount(): any {
    let sum = 0;
    this.selectedItems.forEach(e => {
      sum = sum + e.rate;
    });
    return sum;
  }
  removeItem(index): void {
    this.selectedItems.splice(index, 1);
  }
  async showAlert(tableNumber, index) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you want to delete this item',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          cssClass: 'danger',
          handler: () => {
             this.ordersData[tableNumber].splice(index, 1);
             this.isUpDate = false;
             this.resetForm();
          }
        }
      ]
    });
    await alert.present();
  }
  resetForm(): void {
    this.orderForm.patchValue({
      itemCode: null,
      quantity: null,
      narr: null,
      pax: null,
      itemName: null
    });
  }
  async presentToast(message = 'Please select all fields to Add') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  saveOrder(): void {
  }
  onClickItem(tableName, index): void {
    this.isUpDate = true;
    this.selectedIndex = index;
    console.log(this.ordersData[tableName][index]);
    this.orderForm.patchValue(this.ordersData[tableName][index]);
    this.orderForm.updateValueAndValidity();
    this.content.scrollToTop();
  }
  portChange($event, controlName): void {
    this.orderForm.controls[controlName].patchValue($event.value);
    this.orderForm.updateValueAndValidity();
    if (controlName == 'itemCode') {
        this.orderForm.controls.itemName.patchValue(this.itemsNameList[$event.value.id-1]);
    } else if (controlName == 'itemName') {
      this.orderForm.controls.itemCode.patchValue(this.itemsCodeList[$event.value.id-1]);
    }
  }

}
