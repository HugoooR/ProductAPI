import { Routes } from '@angular/router';
import {HomeComponent} from './features/module-home/pages/home/home.component';
import {HomeClientComponent} from './features/module-client/pages/home-client/home-client.component';
import {DetailClientComponent} from './features/module-client/pages/detail-client/detail-client.component';
import {HomeProductComponent} from './features/module-product/pages/home-product/home-product.component';
import {DetailProductComponent} from './features/module-product/pages/detail-product/detail-product.component';
import {HomeOrderComponent} from './features/module-order/pages/home-order/home-order.component';
import {DetailOrderComponent} from './features/module-order/pages/detail-order/detail-order.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'client',
        component: HomeClientComponent
    },
    {
        path: 'client/:id',
        component: DetailClientComponent
    },
    {
        path: 'product',
        component: HomeProductComponent
    },
    {
        path: 'product/:id',
        component: DetailProductComponent
    },
    {
        path: 'order',
        component: HomeOrderComponent
    },
    {
        path: 'order/:id',
        component: DetailOrderComponent
    }
];
