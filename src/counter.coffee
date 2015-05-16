m     = require 'mithril'
h     = require './helpers'

Counter =
    controller: ->
        h.L 'Counter ctrl instantiated'
        return {
            count: m.prop 0
        }
    view: (ctrl, args) ->
        return m 'div', [
            'internal:', ctrl.count(),
            m('br'),
            'external:', args.count(),
        ]

module.exports = Counter