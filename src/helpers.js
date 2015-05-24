'use strict';
import m from 'mithril';

export let l = console.log.bind(console);
export let e = console.error.bind(console);

export let containerize = (columns, ...nodes) =>
    m('.container', nodes.map(n => layoutRow(n)))

export let row = (any) => m('.row', any);

export let cols = (...nodes) =>
  nodes.map( n =>
    m(`.col-xs-${ Math.floor(12 / nodes.length) }`, n));

export let layoutRow = (...nodes) =>
  row(cols(...nodes));
