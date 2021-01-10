// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.bs.js");
var Js_math = require("bs-platform/lib/js/js_math.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Garter_Vector = require("../src/Garter_Vector.bs.js");

Jest.describe("Vector.init", (function (param) {
        return Jest.test("empty", (function (param) {
                      return Jest.ExpectJs.toBe(0, Jest.ExpectJs.expect(Garter_Vector.length(Garter_Vector.make(undefined))));
                    }));
      }));

Jest.describe("Belt.Array vs. Js.Array vs. Js.Array (mutable) vs. Garter.Vector", (function (param) {
        var smallSet = Belt_List.fromArray(Belt_Array.rangeBy(1000, 5000, 1000));
        var targets = [
          [
            "Js.Array2.push (mutable)",
            (function (n) {
                var ar = [];
                Belt_Array.forEach(Belt_Array.range(1, n), (function (v) {
                        ar.push(v);
                        
                      }));
                return Jest.ExpectJs.toBe(n, Jest.ExpectJs.expect(ar.length));
              })
          ],
          [
            "Garter.Vector.push",
            (function (n) {
                var v = Garter_Vector.fromArray(Belt_Array.range(1, n));
                return Jest.ExpectJs.toBe(n, Jest.ExpectJs.expect(Garter_Vector.length(v)));
              })
          ]
        ];
        return Belt_Array.forEach(targets, (function (param) {
                      return Jest.testAll(param[0] + " (small)", smallSet, param[1]);
                    }));
      }));

Jest.describe("Vector.push", (function (param) {
        var isomorphic = function (ar) {
          return Caml_obj.caml_equal(Garter_Vector.toArray(Garter_Vector.fromArray(ar)), ar);
        };
        Jest.testAll("fromArray", Belt_List.fromArray(Belt_Array.range(1, 32)), (function (n) {
                return Jest.ExpectJs.toBeTruthy(Jest.ExpectJs.expect(isomorphic(Belt_Array.range(1, n))));
              }));
        return Jest.testAll("fromArray (large)", Belt_List.fromArray(Belt_Array.rangeBy(1000, 10000, 1000)), (function (n) {
                      return Jest.ExpectJs.toBeTruthy(Jest.ExpectJs.expect(isomorphic(Belt_Array.range(1, n))));
                    }));
      }));

function pushpop(n, m) {
  var v = Garter_Vector.fromArray(Belt_Array.range(1, n));
  return Belt_Array.reduce(Belt_Array.range(1, m), v, (function (v, param) {
                return Garter_Vector.pop(v);
              }));
}

Jest.describe("Vector.pop", (function (param) {
        return Jest.testAll("pushpop (push > pop)", {
                    hd: [
                      100,
                      50
                    ],
                    tl: {
                      hd: [
                        100,
                        100
                      ],
                      tl: {
                        hd: [
                          10000,
                          5000
                        ],
                        tl: /* [] */0
                      }
                    }
                  }, (function (param) {
                      var m = param[1];
                      var n = param[0];
                      return Jest.ExpectJs.toBeTruthy(Jest.ExpectJs.expect(Caml_obj.caml_equal(Garter_Vector.toArray(pushpop(n, m)), Belt_Array.range(1, n - m | 0))));
                    }));
      }));

Jest.describe("Vector.get", (function (param) {
        var v = pushpop(20000, 10000);
        Jest.test("random access (10,000 times)", (function (param) {
                var every = Belt_Array.every(Belt_Array.range(1, 10000), (function (param) {
                        var idx = Js_math.random_int(0, 10000);
                        return Garter_Vector.getExn(v, idx) === (idx + 1 | 0);
                      }));
                return Jest.ExpectJs.toBeTruthy(Jest.ExpectJs.expect(every));
              }));
        return Jest.testAll("out of bounds", {
                    hd: -1,
                    tl: {
                      hd: 10000,
                      tl: /* [] */0
                    }
                  }, (function (idx) {
                      return Jest.ExpectJs.toThrow(Jest.ExpectJs.expect(function (param) {
                                      return Garter_Vector.getExn(v, idx);
                                    }));
                    }));
      }));

Jest.describe("Vector.set", (function (param) {
        var v = Garter_Vector.fromArray(Belt_Array.range(1, 100000));
        Jest.test("random update (" + 100000 + " times)", (function (param) {
                var v$prime = Belt_Array.reduce(Belt_Array.shuffle(Belt_Array.range(1, 100000)), v, (function (v, idx) {
                        return Garter_Vector.setExn(v, idx - 1 | 0, Math.imul(idx, -1));
                      }));
                var every = Belt_Array.every(Garter_Vector.toArray(v$prime), (function (x) {
                        return x < 0;
                      }));
                return Jest.ExpectJs.toBeTruthy(Jest.ExpectJs.expect(every));
              }));
        var ar = Belt_Array.range(1, 100000);
        return Jest.test("mutable random update (" + 100000 + " times)", (function (param) {
                      Belt_Array.forEach(Belt_Array.shuffle(Belt_Array.range(1, 100000)), (function (idx) {
                              ar[idx - 1 | 0] = Math.imul(idx, -1);
                              
                            }));
                      var every = Belt_Array.every(ar, (function (x) {
                              return x < 0;
                            }));
                      return Jest.ExpectJs.toBeTruthy(Jest.ExpectJs.expect(every));
                    }));
      }));

var A;

var V;

exports.A = A;
exports.V = V;
exports.pushpop = pushpop;
/*  Not a pure module */
