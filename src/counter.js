'use strict';
import m from 'mithril';
import { l, e } from './helpers';

let Counter = {
    controller: function(args) {
        l('Counter ctrl instantiated');
        this.count = m.prop(0);
        this.incInternal = () => this.count(this.count() + 1);
        return this;
    },
    view: function(ctrl, args) {
        return m('.row', [
            m('.col-md-6',
                m('button.btn.btn-success', {
                    onclick: ctrl.incInternal
                }, ctrl.count())
            ),
            m('.col-md-6', [
                'internal:', ctrl.count(),
                m('br'),
                'external:', args.externalCount(),
            ]),
        ])
    }
};
export default Counter;