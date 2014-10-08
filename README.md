Clearcode Misc Services
=========

This package consists of three util services.

- Getting cached templates or downloads them form url and store in cache.
- Getting url with search params
- Returning precision of numbers



Installation
--------------
TODO


Usage
------

Add ``` cc.misc.service ``` module to your app module list :


```
angular
    .module('yourAwesomeApp', [
        'cc.misc.service'
    ]);
```
and you are ready to go!

How to use services:

*getTemplate*

```
utils.getTemplate(templUrl, function(content){
                    //do what you want with template
                });
```

*getUrlWithSearchParams*

```
utils.getUrlWithSearchParams('url', {searchParam:'searchVal' }); // returns url with search params
utils.getUrlWithSearchParams('/r/v1/', {pa: 1, pb: 'abc'}); // -> '/r/v1/?pa=1&pb=abc'
```

*precision*

```
utils.precision(number); // returns number precision
utils.precision(1.1234); // -> 4
utils.precision(1.123); // -> 3
utils.precision(123); // -> 0
```

Author
------

Pawel Galazka


License
----

LGPL

