'use strict';
let m = require('mithril');

var MyApp = {
    controller: function() {
        return {
            temp: m.prop(10) // kelvin
        }
    },
    view: function(ctrl) {
        return m("div", [
            m("input", {oninput: m.withAttr("value", ctrl.temp), value: ctrl.temp()}), "K",
            m("br"),
            m.component(TemperatureConverter, {value: ctrl.temp()})
        ]);
    }
};
var TemperatureConverter = {
    controller: function() {
        //note how the controller does not handle the input arguments

        //define some helper functions to be called from the view
        return {
            kelvinToCelsius: function(value) {
                return value - 273.15
            },
            kelvinToFahrenheit: function(v) {
                return (9 / 5 * (v - 273.15)) + 32
            }
        }
    },
    view: function(ctrl, args) {
        return m('div', [
            "celsius:", ctrl.kelvinToCelsius(args.value),
            m("br"),
            "fahrenheit:", ctrl.kelvinToFahrenheit(args.value),
        ]);
    }
};
m.mount(document.body, MyApp);