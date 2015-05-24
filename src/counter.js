'use strict';
import m from 'mithril';
import { l, e, layoutRow } from './helpers';

let Counter = {
    controller: function(args) {
        l('Counter ctrl instantiated');
        this.count = m.prop(0);
        this.incInternal = () => this.count(this.count() + 1);
        return this;
    },
    view: (ctrl, args) =>
        layoutRow(
            [
                m('button.btn.btn-success', {
                    onclick: ctrl.incInternal
                }, ctrl.count())
            ],[
                'internal:', ctrl.count(),
                m('br'),
                'external:', args.externalCount(),
            ]
        )
};
export default Counter;