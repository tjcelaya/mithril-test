'use strict';
import m from 'mithril';
import h from './helpers';
import Counter from './counter'


let MyApp = {
    model: {
        count: m.prop(0),
        inc: () => {
            h.L('model inc called');
            MyApp.model.count(MyApp.model.count() + 1);
        }
    },
    controller: function () {
        this.count = MyApp.model.count
        this.inc = () => {
            h.L('ctrl inc called');
            MyApp.model.inc();
        }
        return this;
    },
    view: function (ctrl) {
        return m('div', [
            m('button', {
                onclick: ctrl.inc
            }, ctrl.count()),
            m.component(Counter, {count: ctrl.count}),
            m.component(Counter, {count: ctrl.count}),
        ])
    }
};
m.mount(document.body, MyApp)
