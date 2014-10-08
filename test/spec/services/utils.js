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

describe('Service: Utils', function () {

    beforeEach(module('cc.misc.service'));

    var utils, $templateCache, $httpBackend;

    beforeEach(function(){
        module(function($provide){
            $provide.value('$templateCache', jasmine.createSpyObj('$templateCache', ['get', 'put']));
        });
    });

    beforeEach(inject(function (_utils_, _$templateCache_, _$httpBackend_) {
        utils = _utils_;
        $templateCache = _$templateCache_;
        $httpBackend = _$httpBackend_;
    }));

    
    describe('uriEncodeObject method', function() {
        var encoded_object, split_object;

        beforeEach(inject(function(utils) {
            encoded_object = utils.uriEncodeObject({
                'username': 'name with spaces',
                'password': '#$!?=^%*&()/',
                'accept_terms': true,
                'register': false});
            split_object = encoded_object.split('&');
        }));

        it('should consist of 4 elements', function() {
            expect(split_object.length).toBe(4);
        });

        it('should contain username', function() {
            expect(split_object).toContain('username=name%20with%20spaces');
        });

        it('should contain password', function() {
            expect(split_object).toContain('password=%23%24!%3F%3D%5E%25*%26()%2F');
        });

        it('should contain accept_terms', function() {
            expect(split_object).toContain('accept_terms=true');
        });

        it('should contain register', function() {
            expect(split_object).toContain('register=false');
        });
    });

    describe('.getTemplate()', function(){
        var templContent, templUrl;

        beforeEach(function(){
            templContent = '';
            templUrl = 'views/testtempl.html';
        });

        describe('when template in cache given', function(){
            beforeEach(function(){
                $templateCache.get.andReturn('cache content');
                utils.getTemplate(templUrl, function(content){
                    templContent = content;
                });
            });

            it('should return template content from cache', function(){
                expect($templateCache.get).toHaveBeenCalledWith(templUrl);
                expect(templContent).toEqual('cache content');
            });
        });

        describe('when template in cache not given', function(){
            beforeEach(function(){
                $templateCache.get.andReturn(undefined);
                $httpBackend.expectGET(templUrl).respond('http content');
                utils.getTemplate(templUrl, function(content){
                    templContent = content;
                });
                $httpBackend.flush();
            });

            it('should do request for template content', function(){
                expect(templContent).toEqual('http content');
            });

            it('should set template in cache', function(){
                expect($templateCache.put).toHaveBeenCalledWith(templUrl, 'http content');
            });
        });
    });

    describe('.getUrlWithSearchParams()', function(){
        it('should return full url by given path and search params as object', function(){
            expect(utils.getUrlWithSearchParams('/r/v1/', {pa: 1, pb: 'abc'}))
                .toEqual('/r/v1/?pa=1&pb=abc');
        });
    });

    describe('.precision()', function(){
        it('should return precision length of the number', function(){
            expect(utils.precision(1.1234)).toEqual(4);
            expect(utils.precision(1.123)).toEqual(3);
            expect(utils.precision(123)).toEqual(0);
        });
    });
});
