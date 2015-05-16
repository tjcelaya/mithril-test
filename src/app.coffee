m       = require 'mithril'
h       = require './helpers'
Counter = require './counter'


MyApp = {
    model: {
        count: m.prop(0),
        inc: ->
            # h.L 'model inc called'
            MyApp.model.count(MyApp.model.count() + 1)
    }
    controller: ->
        @count = MyApp.model.count
        @inc = =>
            # h.L 'ctrl inc called'
            MyApp.model.inc()
        @
    view: (ctrl) ->
        # debugger;
        return m 'div', [
            # m('input', {oninput: m.withAttr('value', ctrl.temp), value: ctrl.temp()}), 'K',
            m('button', {
                onclick: ctrl.inc
                # , value: ctrl.count()
            }, ctrl.count()),
            m.component Counter, {
                count: ctrl.count
            }
        ]
};
# TemperatureConverter = {
#     controller: ->
#         # note how the controller does not handle the input arguments

#         # define some helper functions to be called from the view
#         return {
#             kelvinToCelsius: (value) -> value - 273.15
#             kelvinToFahrenheit: (v) -> (9 / 5 * (v - 273.15)) + 32
#         }
#     view: (ctrl, args) ->
#         return m('div', [
#             'celsius:', ctrl.kelvinToCelsius(args.value),
#             m('br'),
#             'fahrenheit:', ctrl.kelvinToFahrenheit(args.value),
#         ])
# }
m.mount(document.body, MyApp)
