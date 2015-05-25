'use strict';
import m from 'mithril';
window.m = m;

export let l = console.log.bind(console);
export let e = console.error.bind(console);

export let contain = (...nodes) => m('.container', nodes);

export let row = (...any) => m('.row', any);

export let col = (width, ...nodes) => {
    // debugger;
    return m(`.col-xs-${width}`, nodes);
};

export let layoutCol = (nodesInRow, ...nodes) => {
    // debugger;
    return row(nodes.map( n => col(Math.floor(12 / nodesInRow), n)));
};

export let layoutSpread = (...nodes) => {
    // debugger;
    return layoutCol(nodes.length, ...nodes);
};

export const MISSING_IMAGE = '/img/placeholder_small.png';