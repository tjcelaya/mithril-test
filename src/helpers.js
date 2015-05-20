import m from 'mithril';

export const l = console.log.bind(console);
export const e = console.error.bind(console);
// export const toArray = [].slice;

export function containerize(columns, ...nodes) {
    return m('.container', [
        m('.row', [
            m(`.col-md-${columns}`, nodes)
        ])
    ]);
}

