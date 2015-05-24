'use strict';
import m from 'mithril';
window.m = m;

export let l = console.log.bind(console);
export let e = console.error.bind(console);

export let contain = (...nodes) => m('.container', nodes)

export let row = (...any) => m('.row', any);

export let cols = (...nodes) => {
  debugger;
  return nodes.map( n =>
    m(`.col-xs-${ Math.floor(12 / nodes.length) }`, n));
}
export let layoutRow = (...nodes) =>
  row(cols(...nodes));

export let col = (width, ...nodes) => {
  debugger;
  return m(`.col-xs-${width}`, ...nodes)
}