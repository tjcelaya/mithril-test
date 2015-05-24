'use strict';
import m from 'mithril';
require('mithril-bootstrap');
import { l, e, containerize } from './helpers';
import Counter from './counter';
import Cart from './cart'

let MyApp = {
    model: {
        count: m.prop(0),
        inc: () => {
            l('model inc called');
            MyApp.model.count(MyApp.model.count() + 1);
        }
    },
    vm: {
        confirming: m.prop(false)
    },
    controller: () => {
        return {
            count: MyApp.model.count,
            inc: () => {
                l('ctrl inc called');
                if (confirm('are you sure?')) MyApp.model.inc();
            }
        };
    },
    view: (ctrl) =>
        containerize(3,
            m('button.btn.btn-danger', {
                onclick: ctrl.inc
            }, ctrl.count()),
            m.component(Counter, { externalCount: ctrl.count }),
            m.component(Counter, { externalCount: ctrl.count }),
            m.component(new Modalizer),
            null
        )
};
m.mount(document.body, MyApp)
