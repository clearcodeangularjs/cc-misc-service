/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-misc-service.

    cc-misc-service is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-misc-service is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-misc-service.  If not, see <http://www.gnu.org/licenses/>.

*/
'use strict';

angular.module('cc.misc.service', [])
    .service('utils', ['$templateCache', '$http',
    function($templateCache, $http) {

        this.uriEncodeObject = function(obj) {
            var parameter, result = [];

            for(parameter in obj) {
                if(obj.hasOwnProperty(parameter)) {
                    result.push(encodeURIComponent(parameter) + '=' + encodeURIComponent(obj[parameter]));
                }
            }
            return result.join('&');
        };

        this.getTemplate = function(path, callback){
            var cachedTempl = $templateCache.get(path);

            if (cachedTempl){
                callback(cachedTempl);
            }
            else {
                $http.get(path).success(function(data){
                    $templateCache.put(path, data);
                    callback(data);
                });
            }
        }

        this.getUrlWithSearchParams = function(url, params){
            var searchElements = [];

            return url + '?' + uriEncodeObject(params);
        }

        this.precision = function(number){
            var numsplit = String(number).split('.');
            if(numsplit.length == 2){
                return numsplit[1].length;
            }
            else {
                return 0;
            }
        }
    }]);
