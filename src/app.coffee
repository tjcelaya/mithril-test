m = require('mithril');

MyApp = {
    controller: ->
        _ctrl = {}
        _ctrl.now = m.prop(0)
        _ctrl.update = setInterval ->
            current = _ctrl.now()
            if current < 1000
                _ctrl.now(current + 1)
            else
                _ctrl.now(1) 
            m.redraw()
        , 1
        
        _ctrl
    view: (ctrl) ->
        return m 'div', [
            [0...100].map -> 
                [
                    m 'span', ctrl.now(),
                    m 'br'
                ]
            # m('input', {oninput: m.withAttr('value', ctrl.temp), value: ctrl.temp()}), 'K',
            # m('br'),
            # m.component(TemperatureConverter, {value: ctrl.temp()})
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
