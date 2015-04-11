/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Michael Mollick
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {

    /**
     * FlatdocRouter
     *
     * Enables client side routing for FlatdocPages,
     * this is a simple hash based router.
     * @constructor
     */
    FlatdocRouter = function() {
        // Hashchange
        window.addEventListener('hashchange', FlatdocRouter.router);
        // Page load
        window.addEventListener('load', FlatdocRouter.router);

        // Index route
        FlatdocRouter.route("/", function(url) {
            FlatdocPages.default();
        })

        // Handle other pages
        FlatdocRouter.route(/(.*)/, function(url) {
            var ele = $('[data-flatdoc]').filter('[href="'+url+'"]');
            if(ele.length < 1)
                // 404, route was not found
                FlatdocPages.default();
            else
                FlatdocPages.load(ele);
        })
    }

    /**
     * FlatdocRouter#Click
     *
     * This is the click event for router links,
     * replaces FlatdocPages#click, if this script
     * is included.
     * @param e
     */
    FlatdocRouter.click = function(e) {
        e.preventDefault();
        location.hash = $(this).attr('href');
    }

    /**
     * FlatdocRouter#Router
     *
     * This is the actual router, we get the hash
     * and find a matching route. If a route exists
     * its controller is run.
     */
    FlatdocRouter.router = function() {
        // Current route url (getting rid of '#' in hash as well):
        var url = location.hash || '/';
        // Get route by url:
        var route = FlatdocRouter.getRoute(url);
        // Do we have both a view and a route?
        if (route.controller) {
            // Render route template
            route.controller(url);
        }
    }

    /**
     * Stores routes
     *
     * @type {Array}
     */
    FlatdocRouter.routes = [];

    /**
     * FlatdocRouter#Route
     *
     * Used to create the routes. Accepts either
     * strings or regex for as a path. Controller is
     * a simple function or callback.
     * @param path
     * @param controller
     */
    FlatdocRouter.route = function(path, controller) {
        FlatdocRouter.routes.push({path: path, controller: controller}); // = {controller: controller};
    }

    /**
     * FlatdocRouter#getRoute
     *
     * Finds a route that matches the path. Checks
     * both strings and regex route paths.
     * @param path
     * @returns {*}
     */
    FlatdocRouter.getRoute = function(path) {
        for(var i = 0; i < FlatdocRouter.routes.length; i++) {
            var route = FlatdocRouter.routes[i];

            // Check if path is regex
            if(route.path.exec !== undefined) {
                if(route.path.exec(path) !== null) {
                    return route;
                }
            } else {
                if(route.path === path) {
                    return route;
                }
            }
        }
    }

})(jQuery);