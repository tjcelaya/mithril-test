'use strict';
import m from 'mithril';
import { l, e, containerize } from './helpers';
import Counter from './counter';

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
    view: function (ctrl) {
        return containerize(3,
            m('button.btn.btn-danger', {
                onclick: ctrl.inc
            }, ctrl.count()),
            m.component(Counter, { externalCount: ctrl.count }),
            m.component(Counter, { externalCount: ctrl.count }),
            null,
            m('.modal', { })
        );
    }
};
m.mount(document.body, MyApp)
