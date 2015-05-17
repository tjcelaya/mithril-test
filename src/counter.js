'use strict';
import m from 'mithril';
import { L } from './helpers';

export default Counter = {
    controller: function(args) {
        L('Counter ctrl instantiated');
        this.count = m.prop(0);
        this.incInternal = () => this.count(this.count() + 1)
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
                m('br'),
                'internal:', ctrl.count(),
                m('br'),
                'external:', args.externalCount(),
            ]),
        ])
    }
}