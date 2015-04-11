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
     * FlatdocPages
     *
     * Grabs elements with the flatdoc data
     * attribute and creates on click events
     * for each of them. Throws an exception
     * if Flatdoc is not available.
     * @constructor
     */
    FlatdocPages = function() {
        if (typeof Flatdoc !== "object")
            throw new PagesException("Flatdoc not found");

        $(function() {
            if(typeof FlatdocRouter !== "function") {
                $('body').on('click','[data-flatdoc]', FlatdocPages.click);
                FlatdocPages.default();
            } else {
                $('body').on('click', '[data-flatdoc]', FlatdocRouter.click);
                this.router = new FlatdocRouter();
            }
        });
    }

    /**
     * FlatdocPages#default
     *
     * Looks for a default flatdoc link
     * and loads this link.
     */
    FlatdocPages.default = function() {
        var ele = $('[data-flatdoc=default]').eq(0);

        if(ele.length === 0)
            ele = $('[data-flatdoc]').eq(0);

        this.load(ele)
    }

    /**
     * FlatdocVersion#click
     *
     * Event handler for Flatdoc links
     * @param e
     */
    FlatdocPages.click = function(e) {
        e.preventDefault();
        FlatdocPages.load( $(this) );
    }

    /**
     * FlatdocPages#load
     *
     * Looks for source, md, repo, branch
     * data attributes in link element. These
     * are passed into the Flatdoc fetcher
     * and in turn to sent to the Flatdoc runner.
     *
     * source: [file, github, bitbucket]
     * path: path to markdown file
     * repo: Github/Bitbucket repository
     * branch: Github/Bitbucket branch
     * @param ele Link element
     */
    FlatdocPages.load = function(ele) {
        var source = ele.attr('data-source'),
            path = ele.attr('data-path'),
            repo = ele.attr('data-repo'),
            branch = ele.attr('data-branch'),
            fetcher;

        if(ele.hasClass('active'))
            return;
        
        $('[data-flatdoc]').removeClass('active');
        ele.addClass('active');

        if(source === 'file')
            fetcher =  Flatdoc.file(path);

        else if(source === 'github')
            fetcher =  Flatdoc.github( repo, path, branch );

        else if(source === 'bitbucket')
            fetcher =  Flatdoc.bitbucket( repo, path, branch );

        else
            return;

        // Invoke FlatDoc runner
        Flatdoc.run({
            fetcher: fetcher
        });

        // Remove
    }

})(jQuery);

function PagesException(message) {
    this.message = message;
    this.name = "VersionsError";
    this.toString = function() {
        return this.name + ": " + this.message
    };
}