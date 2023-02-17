/* global CodeMirror */
/* global define */

(function(mod) {


  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
    mod(require('codemirror'));
  else if (typeof define === 'function' && define.amd) // AMD
    define(['codemirror'], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {


  CodeMirror.defineOption('searchbox', false, function(cm) {
    var Search;
    // console.log('Search', Search);
    // console.log(cm, cm.getWrapperElement(), 'cm');
    cm.addKeyMap({
      'Cmd-Alt-F': function() {
        if (!Search) {
          // eslint-disable-next-line no-use-before-define
          Search = new SearchBox(cm);
        }
        Search.show(null, true);
      },
      'Ctrl-F': function() {
        // if (!Search)
        // eslint-disable-next-line no-use-before-define
        Search = new SearchBox(cm);

        Search.show();
      },

      'Esc': function() {
        if (!Search || !Search.isVisible())
          return CodeMirror.Pass;

        Search.hide();

        if (typeof event !== 'undefined')
          event.stopPropagation();
      },

      'Cmd-F': function() {
        if (!Search)
          // eslint-disable-next-line no-use-before-define
          Search = new SearchBox(cm);

        Search.show();
      }
    });
  });

  function setCssClass(el, className, condition) {
    var list = el.classList;

    list[condition ? 'add' : 'remove'](className);
  }

  function delayedCall(fcn, defaultTimeout) {
    var timer,
      callback = function() {
        timer = null;
        fcn();
      },

      _self = function(timeout) {
        if (!timer)
          timer = setTimeout(callback, timeout || defaultTimeout);
      };

    _self.delay = function(timeout) {
      timer && clearTimeout(timer);
      timer = setTimeout(callback, timeout || defaultTimeout);
    };
    _self.schedule = _self;

    _self.call = function() {
      this.cancel();
      fcn();
    };

    _self.cancel = function() {
      timer && clearTimeout(timer);
      timer = null;
    };

    _self.isPending = function() {
      return timer;
    };

    return _self;
  }

  /* https://github.com/coderaiser/key */
  function key(str, event) {
    var right,
      KEY = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESC: 27,

        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        UP: 38,
        DOWN: 40,

        INSERT: 45,
        DELETE: 46,

        INSERT_MAC: 96,

        ASTERISK: 106,
        PLUS: 107,
        MINUS: 109,

        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,

        SLASH: 191,
        TRA: 192, /* Typewritten Reverse Apostrophe (`) */
        BACKSLASH: 220
      };

    // eslint-disable-next-line no-use-before-define
    keyCheck(str, event);

    right = str.split('|').some(function(combination) {
      var wrong;

      wrong = combination.split('-').some(function(key) {
        var right;

        switch (key) {
          case 'Ctrl':
            right = event.ctrlKey;
            break;

          case 'Shift':
            right = event.shiftKey;
            break;

          case 'Alt':
            right = event.altKey;
            break;

          case 'Cmd':
            right = event.metaKey;
            break;

          default:
            if (key.length === 1)
              right = event.keyCode === key.charCodeAt(0);
            else
              Object.keys(KEY).some(function(name) {
                var up = key.toUpperCase();

                if (up === name)
                  right = event.keyCode === KEY[name];
              });
            break;
        }

        return !right;
      });

      return !wrong;
    });

    return right;
  }

  function keyCheck(str, event) {
    if (typeof str !== 'string')
      throw Error('str should be string!');

    if (typeof event !== 'object')
      throw Error('event should be object!');
  }
  // ============

  function SearchState() {
    this.posFrom = this.posTo = this.lastQuery = this.query = null;
    this.overlay = null;
  }

  function queryCaseInsensitive(query) {
    return typeof query == 'string' && query == query.toLowerCase();
  }

  function getSearchState(cm) {
    return cm.state.search || (cm.state.search = new SearchState());
  }

  function RegExpCommon(o, query, caseInsensitive) {
    let val;
    if (o.wholeWord && !o.regExp) {
      val = '\\b' + query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') + '\\b';
    } else if (o.regExp) {
      // if (!o.caseSensitive) {
      //   val = query?.toLowerCase();
      // } else {
      val = query;
      // }
      // val = '\\b' + val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + '\\b'
    } else {
      val = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
    return new RegExp(val, caseInsensitive ? 'gi' : 'g');
  }

  function searchOverlay(query, caseInsensitive, o) {
    // eslint-disable-next-line no-unused-vars
    let value = query;
    // console.log(query, query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'), 'searchOverlay', '\\b' + query + '\\b');
    if (typeof query == 'string') {
      /* let val;
      if (o.wholeWord && !o.regExp) {
        val = '\\b' + query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + '\\b'
      } else if (o.regExp) {
        // if (!o.caseSensitive) {
        //   val = query?.toLowerCase();
        // } else {
          val = query;
        // }
        // val = '\\b' + val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + '\\b'
      } else {
        val = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }
      query = new RegExp(val, caseInsensitive ? "gi" : "g");*/
      // eslint-disable-next-line new-cap
      query = RegExpCommon(o, query, caseInsensitive);
    } else if (!query.global) {
      query = new RegExp(query.source, query.ignoreCase ? 'gi' : 'g');
    }
    // console.log(o, value, query, value.match(query), '匹配');
    return {
      token: function(stream) {
        query.lastIndex = stream.pos;
        var match = query.exec(stream.string);
        // console.log(match,stream,query,'stream')
        if (match && match.index == stream.pos) {
          stream.pos += match[0].length || 1;
          return 'searching';
        } else if (match) {
          stream.pos = match.index;
        } else {
          stream.skipToEnd();
        }
      }
    };
  }

  function getSearchCursor(cm, query, pos, options) {
    // Heuristic: if the query string is all lowercase, do a case insensitive search.
    // console.log(query, pos, 'getSearchCursor');
    return cm.getSearchCursor(query, pos, options);
  }

  // ============
  function SearchBox(cm) {
    var self = this;

    // eslint-disable-next-line no-use-before-define
    init();

    function initElements(el) {
      self.searchBox = el.querySelector('.ace_search_form');
      self.replaceBox = el.querySelector('.ace_replace_form');
      self.searchOptions = el.querySelector('.ace_search_options');

      self.regExpOption = el.querySelector('[action=toggleRegexpMode]');
      self.caseSensitiveOption = el.querySelector('[action=toggleCaseSensitive]');
      self.wholeWordOption = el.querySelector('[action=toggleWholeWords]');

      self.searchInput = self.searchBox.querySelector('.ace_search_field');
      self.replaceInput = self.replaceBox.querySelector('.ace_search_field');
    }

    function init() {
      // eslint-disable-next-line no-use-before-define
      var el = self.element = addHtml();
      // eslint-disable-next-line no-use-before-define
      addStyle();
      initElements(el);
      // eslint-disable-next-line no-use-before-define
      bindKeys();

      el.addEventListener('mousedown', function(e) {
        setTimeout(function() {
          self.activeInput.focus();
        }, 0);

        e.stopPropagation();
      });

      el.addEventListener('click', function(e) {
        var t = e.target || e.srcElement;
        var action = t.getAttribute('action');
        if (action && self[action])
          self[action]();
        else if (self.commands[action])
          self.commands[action]();

        e.stopPropagation();
      });

      self.searchInput.addEventListener('input', function() {
        self.$onChange.schedule(20);
      });

      self.searchInput.addEventListener('focus', function() {
        self.activeInput = self.searchInput;
      });

      self.replaceInput.addEventListener('focus', function() {
        self.activeInput = self.replaceInput;
      });

      // eslint-disable-next-line no-use-before-define
      self.$onChange = delayedCall(function() {
        self.find(false, false);
      });
    }

    function bindKeys() {
      var obj = {
        'Ctrl-F|Cmd-F|Ctrl-H|Command-Alt-F': function() {
          var isReplace = self.isReplace = !self.isReplace;
          self.replaceBox.style.display = isReplace ? '' : 'none';
          self[isReplace ? 'replaceInput' : 'searchInput'].focus();
        },
        'Ctrl-G|Cmd-G': function() {
          self.findNext();
        },
        'Ctrl-Shift-G|Cmd-Shift-G': function() {
          self.findPrev();
        },
        'Esc': function() {
          setTimeout(function() {
            self.hide();
          });
        },
        'Enter': function() {
          if (self.activeInput === self.replaceInput)
            self.replace();
          self.findNext();
        },
        'Shift-Enter': function() {
          if (self.activeInput === self.replaceInput)
            self.replace();
          self.findPrev();
        },
        'Alt-Enter': function() {
          if (self.activeInput === self.replaceInput)
            self.replaceAll();
          self.findAll();
        },
        'Tab': function() {
          if (self.activeInput === self.replaceInput)
            self.searchInput.focus();
          else
            self.replaceInput.focus();
        }
      };

      self.element.addEventListener('keydown', function(event) {
        Object.keys(obj).some(function(name) {
          // eslint-disable-next-line no-use-before-define
          var is = key(name, event);

          if (is) {
            event.stopPropagation();
            event.preventDefault();
            obj[name](event);
          }

          return is;
        });
      });
    }

    this.commands = {
      toggleRegexpMode: function() {
        self.regExpOption.checked = !self.regExpOption.checked;
        self.$syncOptions();
      },

      toggleCaseSensitive: function() {
        self.caseSensitiveOption.checked = !self.caseSensitiveOption.checked;
        self.$syncOptions();
      },

      toggleWholeWords: function() {
        self.wholeWordOption.checked = !self.wholeWordOption.checked;
        self.$syncOptions();
      }
    };

    function resetCount(cm) {
      cm.getWrapperElement().parentNode.querySelector('.CodeMirror-search-count').innerHTML = '';
    }

    function updateCount(cm, o, query, caseInsensitive) {
      // eslint-disable-next-line no-unused-vars
      let state = getSearchState(cm);
      let value = cm.getDoc().getValue();
      let globalQuery;
      let queryText = self.searchInput.value;
      if (!queryText || queryText === '') {
        resetCount(cm);
        return;
      }
      /* while (queryText.charAt(queryText.length - 1) === '\\') {
        queryText = queryText.substring(0, queryText.lastIndexOf('\\'));
      }

      if (typeof state.query === 'string') {
        globalQuery = new RegExp(queryText, 'ig');
      } else {
        globalQuery = new RegExp(state.query.source, state.query.flags + 'g');
      }*/
      // eslint-disable-next-line new-cap
      globalQuery = RegExpCommon(o, query, caseInsensitive);
      let matches = value.match(globalQuery);
      let count = matches ? matches.length : 0;

      let countText = count === 1 ? '1 match' : count + ' matches';
      // console.log(matches, count, 'count');
      cm.getWrapperElement().parentNode.querySelector('.CodeMirror-search-count').innerHTML = countText;
    }

    this.$syncOptions = function() {
      // eslint-disable-next-line no-use-before-define
      setCssClass(this.regExpOption, 'checked', this.regExpOption.checked);
      setCssClass(this.wholeWordOption, 'checked', this.wholeWordOption.checked);
      setCssClass(this.caseSensitiveOption, 'checked', this.caseSensitiveOption.checked);

      this.find(false, false);
    };

    this.find = function(skipCurrent, backwards) {
      var value = this.searchInput.value,
        options = {
          skipCurrent: skipCurrent,
          backwards: backwards,
          regExp: this.regExpOption.checked,
          caseSensitive: this.caseSensitiveOption.checked,
          wholeWord: this.wholeWordOption.checked
        };

      // eslint-disable-next-line no-use-before-define
      find(value, options, function(searchCursor) {
        // console.log(value, 'find111');
        var current = searchCursor.matches(false, searchCursor.from());
        // console.log(value, options,current,searchCursor,'current')
        cm.setSelection(current.from, current.to);
      });
    };

    function find(value, options, callback) {
      // console.log('find222');
      var done,
        // eslint-disable-next-line no-unused-vars
        noMatch, searchCursor, next, prev, matches, cursor,
        position,
        val = value,
        o = options,
        is = true,
        caseSensitive = o.caseSensitive,
        // eslint-disable-next-line no-unused-vars
        regExp = o.regExp,
        // eslint-disable-next-line no-unused-vars
        wholeWord = o.wholeWord;

      /* if (regExp || wholeWord) {
        if (options.wholeWord) {
          val = '\\b' + val + '\\b';
        }
        val = RegExp(val);
      }*/
      /* if (regExp) {
        if (!o.caseSensitive) {
          val = RegExp(val?.toLowerCase());
        } else {
          val = RegExp(val);
        }
      }*/

      // eslint-disable-next-line new-cap
      val = RegExpCommon(o, value, !caseSensitive);

      if (o.backwards)
        position = o.skipCurrent ? 'from' : 'to';
      else
        position = o.skipCurrent ? 'to' : 'from';

      cursor = cm.getCursor(position);
      // searchCursor    = cm.getSearchCursor(val, cursor, !caseSensitive);
      // searchCursor    = cm.getSearchCursor(value, cursor, {caseFold: queryCaseInsensitive(val), multiline: true});
      searchCursor = getSearchCursor(cm, val, cursor, {caseFold: !caseSensitive, multiline: true});

      next = searchCursor.findNext.bind(searchCursor),
      prev = searchCursor.findPrevious.bind(searchCursor),
      matches = searchCursor.matches.bind(searchCursor);

      // console.log('cursor', o, value, val, cursor, position, searchCursor);
      // console.log('ooooo',o,prev(),next(),o.backwards)
      // console.log('next()',searchCursor.findNext)
      // console.log('prev()',searchCursor.findPrevious);
      // console.log('111',o.backwards && !prev());
      // console.log('222',!o.backwards && !next());

      if (o.backwards && !prev()) {
        // eslint-disable-next-line callback-return
        is = next();
        // console.log('111111-------');
        if (is) {
          cm.setCursor(cm.doc.size - 1, 0);
          find(value, options, callback);
          done = true;
          // console.log('22222-------');
        }
      // eslint-disable-next-line callback-return
      } else if (!o.backwards && !next()) {
        is = prev();
        // console.log('33333-------', is);
        if (is) {
          // console.log('44444-------');
          cm.setCursor(0, 0);
          find(value, options, callback);
          done = true;
        }
      }

      noMatch = !is && self.searchInput.value;
      // console.log(self.searchInput, val, 'self.searchInput.value');
      setCssClass(self.searchBox, 'ace_nomatch', noMatch);
      // cm.setSelection(searchCursor.from(), searchCursor.to());
      // eslint-disable-next-line no-use-before-define
      activeFun(cm, value, o);
      updateCount(cm, o, value, !caseSensitive);

      if (!done && is) {
        // console.log('55555-------', searchCursor.from(), searchCursor.to());
        // eslint-disable-next-line callback-return
        callback(searchCursor);

      }
    }

    function activeFun(cm, value, o) {
      let state = getSearchState(cm);
      // console.log(state, value, 'activeFun');
      cm.removeOverlay(state.overlay, queryCaseInsensitive(value));
      if (!value) {
        return;
      }
      state.overlay = searchOverlay(value, !o.caseSensitive, o);
      cm.addOverlay(state.overlay);
      // console.log(state.overlay, 'state.overlay');
      // if (cm.showMatchesOnScrollbar) {
      //   if (state.annotate) { state.annotate.clear(); state.annotate = null; }
      //   state.annotate = cm.showMatchesOnScrollbar(searchCursor, queryCaseInsensitive(searchCursor));
      // }
    }

    this.findNext = function() {
      // console.log('findNext');
      this.find(true, false);
    };

    this.findPrev = function() {
      this.find(true, true);
    };

    this.findAll = function() {
      /*
      var range = this.editor.findAll(this.searchInput.value, {
          regExp: this.regExpOption.checked,
          caseSensitive: this.caseSensitiveOption.checked,
          wholeWord: this.wholeWordOption.checked
      });
      */

      var value = this.searchInput.value,
        range,
        noMatch = !range && this.searchInput.value;

      setCssClass(this.searchBox, 'ace_nomatch', noMatch);

      if (cm.showMatchesOnScrollbar)
        cm.showMatchesOnScrollbar(value);

      this.hide();
    };

    this.replace = function() {
      var readOnly = cm.getOption('readOnly'),
        isSelection = !!cm.getSelection();

      if (!readOnly && isSelection)
        cm.replaceSelection(this.replaceInput.value, 'start');
    };

    this.replaceAndFindNext = function() {
      var readOnly = cm.getOption('readOnly');

      if (!readOnly) {
        this.replace();
        this.findNext();
      }
    };

    this.replaceAll = function() {
      var value,
        cursor,
        from = this.searchInput.value,
        to = this.replaceInput.value,
        reg = RegExp(from, 'g');

      if (!cm.getOption('readOnly')) {
        cursor = cm.getCursor();
        value = cm.getValue();
        value = value.replace(reg, to);

        cm.setValue(value);
        cm.setCursor(cursor);
      }
    };

    this.hide = function() {
      this.element.style.display = 'none';
      cm.focus();
    };

    this.isVisible = function() {
      var is = this.element.style.display === '';

      return is;
    };

    this.show = function(value, isReplace) {
      this.element.style.display = '';
      this.replaceBox.style.display = isReplace ? '' : 'none';

      this.isReplace = isReplace;

      if (value)
        this.searchInput.value = value;

      this.searchInput.focus();
      this.searchInput.select();
    };

    this.isFocused = function() {
      var el = document.activeElement;
      return el === this.searchInput || el === this.replaceInput;
    };

    function addStyle() {
      var style = document.createElement('style'),
        css = [
          '.ace_search {',
          'background-color: #ddd;',
          'border: 1px solid #cbcbcb;',
          'border-top: 0 none;',
          'max-width: 320px;',
          'overflow: hidden;',
          'margin: 0;',
          'padding: 4px;',
          'padding-right: 6px;',
          'padding-bottom: 0;',
          'position: absolute;',
          'top: 0px;',
          'z-index: 99;',
          'white-space: normal;',
          '}',
          '.ace_search.left {',
          'border-left: 0 none;',
          'border-radius: 0px 0px 5px 0px;',
          'left: 0;',
          '}',
          '.ace_search.right {',
          'border-radius: 0px 0px 0px 5px;',
          'border-right: 0 none;',
          'right: 0;',
          '}',
          '.ace_search_form, .ace_replace_form {',
          'display: inline-block;',
          'vertical-align: top;',
          'border-radius: 3px;',
          'border: 1px solid #cbcbcb;',
          // 'float: left;',
          'margin-bottom: 4px;',
          'overflow: hidden;',
          '}',
          '.ace_search_form.ace_nomatch {',
          'outline: 1px solid red;',
          '}',
          '.ace_search_field {',
          'background-color: white;',
          'border-right: 1px solid #cbcbcb;',
          'border: 0 none;',
          '-webkit-box-sizing: border-box;',
          '-moz-box-sizing: border-box;',
          'box-sizing: border-box;',
          'float: left;',
          'height: 22px;',
          'outline: 0;',
          'padding: 0 7px;',
          'width: 217px;',
          'margin: 0;',
          '}',
          // '.ace_search_field.find {',
          // 'width: calc(100% - 60px);',
          // '}',
          '.ace_searchbtn,',
          '.ace_replacebtn {',
          'background: #fff;',
          'border: 0 none;',
          'border-left: 1px solid #dcdcdc;',
          'cursor: pointer;',
          'float: left;',
          'height: 22px;',
          'margin: 0;',
          'padding: 0;',
          'position: relative;',
          'width: 60px;',
          '}',
          '.ace_searchbtn:last-child,',
          '.ace_replacebtn:last-child {',
          'border-top-right-radius: 3px;',
          'border-bottom-right-radius: 3px;',
          'width: 30px;',
          '}',
          '.ace_searchbtn:disabled {',
          'background: none;',
          'cursor: default;',
          '}',
          '.ace_searchbtn {',
          'background-position: 50% 50%;',
          'background-repeat: no-repeat;',
          'width: 30px;',
          '}',
          '.ace_searchbtn.prev {',
          'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADFJREFUeNpiSU1NZUAC/6E0I0yACYskCpsJiySKIiY0SUZk40FyTEgCjGgKwTRAgAEAQJUIPCE+qfkAAAAASUVORK5CYII=);    ',
          '}',
          '.ace_searchbtn.next {',
          'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADRJREFUeNpiTE1NZQCC/0DMyIAKwGJMUAYDEo3M/s+EpvM/mkKwCQxYjIeLMaELoLMBAgwAU7UJObTKsvAAAAAASUVORK5CYII=);    ',
          '}',
          '.ace_searchbtn_close {',
          'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==) no-repeat 50% 0;',
          'border-radius: 50%;',
          'border: 0 none;',
          'color: #656565;',
          'cursor: pointer;',
          'float: right;',
          'font: 16px/16px Arial;',
          'height: 14px;',
          'margin: 5px 1px 9px 5px;',
          'padding: 0;',
          'text-align: center;',
          'width: 14px;',
          '}',
          '.ace_searchbtn_close:hover {',
          'background-color: #656565;',
          'background-position: 50% 100%;',
          'color: white;',
          '}',
          '.ace_replacebtn.prev {',
          'width: 54px',
          '}',
          '.ace_replacebtn.next {',
          'width: 27px',
          '}',
          '.ace_button {',
          'margin-left: 2px;',
          'cursor: pointer;',
          '-webkit-user-select: none;',
          '-moz-user-select: none;',
          '-o-user-select: none;',
          '-ms-user-select: none;',
          'user-select: none;',
          'overflow: hidden;',
          'opacity: 0.7;',
          'border: 1px solid rgba(100,100,100,0.23);',
          'padding: 1px;',
          '-moz-box-sizing: border-box;',
          'box-sizing:    border-box;',
          'color: black;',
          '}',
          '.ace_button:hover {',
          'background-color: #eee;',
          'opacity:1;',
          '}',
          '.ace_button:active {',
          'background-color: #ddd;',
          '}',
          '.ace_button.checked {',
          'border-color: #3399ff;',
          'opacity:1;',
          '}',
          '.ace_search_options{',
          'margin-bottom: 3px;',
          'text-align: right;',
          '-webkit-user-select: none;',
          '-moz-user-select: none;',
          '-o-user-select: none;',
          '-ms-user-select: none;',
          'user-select: none;',
          '}'
        ].join('');

      style.setAttribute('data-name', 'js-searchbox');

      style.textContent = css;

      document.head.appendChild(style);
    }

    function addHtml() {
      var elSearch,
        // el      = document.querySelector('.CodeMirror'),
        el = cm.getWrapperElement(),
        div = document.createElement('div'),
        html = [
          '<div class="ace_search right">',
          '<button type="button" action="hide" class="ace_searchbtn_close"></button>',
          '<div class="ace_search_form">',
          '<input class="ace_search_field find" placeholder="Search for" spellcheck="false"></input>',
          '<button type="button" action="findNext" class="ace_searchbtn next"></button>',
          '<button type="button" action="findPrev" class="ace_searchbtn prev"></button>',
          // '<button type="button" action="findAll" class="ace_searchbtn" title="Alt-Enter">All</button>',
          '</div>',
          '<div class="ace_replace_form">',
          '<input class="ace_search_field" placeholder="Replace with" spellcheck="false"></input>',
          '<button type="button" action="replaceAndFindNext" class="ace_replacebtn">Replace</button>',
          '<button type="button" action="replaceAll" class="ace_replacebtn">All</button>',
          '</div>',
          '<div class="ace_search_options">',
          '<span class="CodeMirror-search-count"></span>',
          '<span action="toggleRegexpMode" class="ace_button" title="RegExp Search">.*</span>',
          '<span action="toggleCaseSensitive" class="ace_button" title="CaseSensitive Search">Aa</span>',
          '<span action="toggleWholeWords" class="ace_button" title="Whole Word Search">\\b</span>',
          '</div>',
          '</div>'
        ].join('');

      // console.log(el, 'el');
      div.innerHTML = html;

      elSearch = div.firstChild;

      // el.parentElement.appendChild(elSearch);
      el.appendChild(elSearch);

      return elSearch;
    }
  }


});
