'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 TomTom International B.V
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _BinaryConstants = require('../BinaryConstants');

var _BinaryConstants2 = _interopRequireDefault(_BinaryConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Unknown radius type */
var UNKNOWN = 0;
/** Small radius (BINARY_VERSION_3: up to 255m) */
var SMALL = 1;
/** Medium radius (BINARY_VERSION_3: up to 65536m) */
var MEDIUM = 2;
/** Large radius (BINARY_VERSION_3: up to 16777216m) */
var LARGE = 3;
/** Extra large radius (BINARY_VERSION_3: up to 4294967296m) */
var EXTRA_LARGE = 4;

var Radius = function () {
    function Radius() {
        _classCallCheck(this, Radius);
    }

    _createClass(Radius, [{
        key: 'put',
        value: function put(bitStreamOutput) {
            if (this._radius <= Radius._MAX_RADIUS_SMALL) {
                bitStreamOutput.putBits(this._radius, _BinaryConstants2.default.SMALL_RADIUS_BITS);
            } else if (this._radius <= Radius._MAX_RADIUS_MEDIUM) {
                bitStreamOutput.putBits(this._radius, _BinaryConstants2.default.MEDIUM_RADIUS_BITS);
            } else if (this._radius <= Radius._MAX_RADIUS_LARGE) {
                bitStreamOutput.putBits(this._radius, _BinaryConstants2.default.LARGE_RADIUS_BITS);
            } else if (this._radius <= Radius._MAX_RADIUS_EXTRA_LARGE) {
                bitStreamOutput.putBits(this._radius, _BinaryConstants2.default.EXTRA_LARGE_RADIUS_BITS);
            } else {
                throw new Error('Invalid range');
            }
        }
    }, {
        key: 'radius',
        get: function get() {
            return this._radius;
        }
    }], [{
        key: 'fromValues',


        /**
         * The Enum RadiusType.
         */


        /** The Constant MAX_RADIUS_LARGE. */

        /** The Constant MAX_RADIUS_SMALL. */
        value: function fromValues(radiusValue) {
            var radius = new Radius();
            radius._radius = radiusValue;
            return radius;
        }

        /** The radius (up to 4 bytes) according to OpenLR white paper */


        /** The Constant MAX_RADIUS_EXTRA_LARGE. */


        /** The Constant MAX_RADIUS_MEDIUM. */

    }, {
        key: 'fromBitStreamInput',
        value: function fromBitStreamInput(bitStreamInput, type) {
            var radius = new Radius();
            switch (type) {
                case SMALL:
                    radius._radius = Radius._intToLong(bitStreamInput.getBits(_BinaryConstants2.default.SMALL_RADIUS_BITS));
                    break;
                case MEDIUM:
                    radius._radius = Radius._intToLong(bitStreamInput.getBits(_BinaryConstants2.default.MEDIUM_RADIUS_BITS));
                    break;
                case LARGE:
                    radius._radius = Radius._intToLong(bitStreamInput.getBits(_BinaryConstants2.default.LARGE_RADIUS_BITS));
                    break;
                case EXTRA_LARGE:
                    radius._radius = Radius._intToLong(bitStreamInput.getBits(_BinaryConstants2.default.EXTRA_LARGE_RADIUS_BITS));
                    break;
                default:
                    throw new Error('Invalid value range');
            }
            return radius;
        }
    }, {
        key: '_intToLong',
        value: function _intToLong(integer) {
            if (integer < 0) {
                return integer & Radius._MAX_RADIUS_EXTRA_LARGE - 1;
            } else {
                return integer;
            }
        }
    }]);

    return Radius;
}();

Radius._MAX_RADIUS_SMALL = Math.pow(2, _BinaryConstants2.default.SMALL_RADIUS_BITS);
Radius._MAX_RADIUS_MEDIUM = Math.pow(2, _BinaryConstants2.default.MEDIUM_RADIUS_BITS);
Radius._MAX_RADIUS_LARGE = Math.pow(2, _BinaryConstants2.default.LARGE_RADIUS_BITS);
Radius._MAX_RADIUS_EXTRA_LARGE = Math.pow(2, _BinaryConstants2.default.EXTRA_LARGE_RADIUS_BITS);
Radius.RadiusType = {
    SMALL: SMALL,
    MEDIUM: MEDIUM,
    LARGE: LARGE,
    EXTRA_LARGE: EXTRA_LARGE,
    UNKNOWN: UNKNOWN,
    resolveRadius: function resolveRadius(type) {
        return type >= UNKNOWN && type <= EXTRA_LARGE ? type : UNKNOWN;
    }

};
exports.default = Radius;
;