'use strict';
import m from 'mithril';
import { l, e, layout } from './helpers';

let Counter = {
    controller: function(args) {
        l('Counter ctrl instantiated');
        this.count = m.prop(0);
        this.incInternal = () => this.count(this.count() + 1);
        return this;
    },
    view: function(ctrl, args) {
        let t = layout(
            [
                m('button.btn.btn-success', {
                    onclick: ctrl.incInternal
                }, ctrl.count())
            ],[
                'internal:', ctrl.count(),
                m('br'),
                'external:', args.externalCount(),
            ]
        );
        return t;
    }
};
export default Counter;