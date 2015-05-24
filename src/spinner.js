'use strict';
import m from 'mithril';
import { l, layoutRow } from './helpers';

let Spinner = {
    vm: {
        states: '|/-\\'.split(''),
        currentState: m.prop(0)
    },
    controller: function (args) {
        setInterval(() => { this.advance(); m.redraw() }, 500);
        this.advance = () => {
                return Spinner.vm.currentState() === Spinner.vm.states.length - 1 ?
                    Spinner.vm.currentState(0) :
                    Spinner.vm.currentState(Spinner.vm.currentState() + 1)
        }
        return this;
    },
    view: (ctrl, args) => {
        return m('span', Spinner.vm.states[Spinner.vm.currentState()]);
    }
};
export default Spinner;