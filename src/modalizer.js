'use strict';
import m from 'mithril';

export default class Modalizer {
  controller() {
    var ctrl = this;
    ctrl.alerts = [{
      type: 'danger',
      msg: 'Oh! Change something and try again.'
    }, {
      type: 'success',
      msg: m("span", ["Well done! Alert can also have ", m("b", ["markup"]), "."])
    }];

    ctrl.addAlert = function() {
      ctrl.alerts.push({
        msg: 'This is sample alert.'
      });
    };

    ctrl.closeAlert = function(index) {
      ctrl.alerts.splice(index, 1);
    };
  };

  view (ctrl) {
    return m("div", [

      ctrl.alerts.map(function(alert, index) {
        return m.ui.renderAlert({
          type: alert.type,
          close: m.u.bind(ctrl.closeAlert, ctrl, index),
          msg: alert.msg
        });
      }),

      m("button", {
        class: "btn btn-default",
        onclick: ctrl.addAlert
      }, [
        "Add alert"
      ])
    ]);
  };
}
