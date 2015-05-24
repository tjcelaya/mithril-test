'use strict';
import m from 'mithril';
require('mithril-bootstrap');
import { l, e, containerize } from './helpers';
import Counter from './counter';
import Cart from './cart';

let MyApp = {
    model: {
        products: () => m.request({ url: 'http://localhost:3000/products', method: 'GET', background: true, initialValue: []})
    },
    vm: {
        confirming: m.prop(false)
    },
    controller: () => {
        return {
            getProducts: MyApp.model.products()
        };
    },
    view: (ctrl) => {
        return containerize(3,
            m('p', JSON.stringify(ctrl.getProducts()))
        )
    }
};
m.mount(document.body, MyApp)
