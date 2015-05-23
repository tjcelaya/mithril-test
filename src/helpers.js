'use strict';
import m from 'mithril';

export let l = console.log.bind(console);
export let e = console.error.bind(console);

export function containerize(columns, ...nodes) {
    return m('.container', [
        m('.row', [
            m(`.col-md-${columns}`, nodes)
        ])
    ]);
}

export let row = (any) => m('.row', any);

export let cols = (...nodes) =>
  nodes.map( n =>
    m(`.col-xs-${ Math.floor(12 / nodes.length) }`, n));

export let layout = (...nodes) =>
  row(cols(...nodes));

window.cols = cols;
