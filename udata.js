var uData;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function ($) {

    var Templates = {};


    Templates.datasets = [
        '    {{ total }} résultat(s)',
        '    <ul class="search-results">',
        '        {{#each data}}',
        '        <li class="search-result dataset-result" data-dataset="{{id}}">',
        '            <a href="{{ uri }}" title="{{  organization.name }}"  data-dataset="{{id}}">',
        '',
        '                <div class="result-logo pull-left">',
        '                    <img alt="" src="{{organization.logo}}" width="70" height="70">',
        '                </div>',
        '                    {{#if organization.public_service }}',
        '                        <img alt="certified"',
        '                            class="certified" rel="popover"',
        '                            data-title="{{_ \'certified_public_service\'}}"',
        '                            data-content="{{_ \'the_identity_of_this_public_service_public_is_certified_by_etalab\'}}"',
        '                            data-container="body" data-trigger="hover"/>',
        '                        {{/if}}',
        '                <div class="result-body ellipsis-dot is-truncated" style="word-wrap: break-word;">',
        '                    <h4 class="result-title">{{title}}</h4>',
        '',
        '                    <div class="result-description">',
        '                        {{mdshort description 128}}</div></div>',
        '',
        '                </a><ul class="list-inline result-infos"><a href="{{ url }}" title="{{title}}"></a>',
        '',
        '                    {{#if temporal_coverage }}',
        '                        <li>',
        '                            <span class="" rel="tooltip"',
        '                                data-placement="top" data-container="body"',
        '                                title="{{_ \'temporal_coverage\'}}">',
        '                                <span class="fa fa-calendar fa-fw"></span>',
        '                                {{dt temporal_coverage.start format=\'L\' }} {{_ \'to\'}} {{dt temporal_coverage.end format=\'L\' }}',
        '                            </span>',
        '                        </li>',
        '                    {{/if}}',
        '',
        '                    {{#if frequency }}',
        '                        <li>',
        '                            <span class="" rel="tooltip"',
        '                                data-placement="top" data-container="body"',
        '                                title="{{_ \'Update frequency\' }}">',
        '                                <span class="fa fa-clock-o fa-fw"></span>',
        '                                {{_ frequency }}',
        '                            </span>',
        '                        </li>',
        '                    {{/if}}',
        '',
        '                    {{#if spatial.territories }}',
        '                        <li>',
        '                            <span class="" rel="tooltip"',
        '                                data-placement="top" data-container="body"',
        '                                title="{{_ \'Spatial coverage\'}}">',
        '                                <span class="fa fa-map-marker fa-fw"></span>',
        '                                {{_ spatial.territories.0.name }}',
        '                            </span>',
        '                        </li>',
        '                    {{/if}}',
        '',
        '                    {{#if spatial.granularity }}',
        '                        <li>',
        '                            <span class="" rel="tooltip"',
        '                                data-placement="top" data-container="body"',
        '                                title="{{_ \'Spatial granularity\'}}">',
        '                                <span class="fa fa-bullseye fa-fw"></span>',
        '                                {{_ spatial.granularity }}',
        '                            </span>',
        '                        </li>',
        '                    {{/if}}',
        '',
        '                    <li>',
        '                        <span class="" rel="tooltip"',
        '                            data-placement="top" data-container="body"',
        '                            title="{{_ \'Reuses\'}}">',
        '                            <span class="fa fa-retweet fa-fw"></span>',
        '                            {{default metrics.reuses 0 }}',
        '                        </span>',
        '                    </li>',
        '',
        '                    <li>',
        '                        <span class="" rel="tooltip"',
        '                            data-placement="top" data-container="body"',
        '                            title="{{_ \'Followers\'}}">',
        '                            <span class="fa fa-star fa-fw"></span>',
        '                            {{default metrics.followers 0 }}',
        '                        </span>',
        '                    </li>',
        '',
        '                </ul>',
        '        </li>',
        '    {{/each}}',
        '    </ul>',
        '    <div class="text-center">',
        '        <div class="pagination">',
        '            {{{ paginate page total page_size }}}',
        '        </div>',
        '    </div>'
    ];



    Templates.dataset = [
        '<div class="dataset" data-dataset="{{id}}">',
        '',
        '        <div class=\'dataset-info\'>',
        '            <blockquote>{{md description }}</blockquote>',
        '             {{#if extras.remote_url}}',
        '            <a class="site_link" href="{{extras.remote_url}}" target=_blank>',
        '                Voir le site original',
        '            </a>',
        '             {{/if}}',
        '            <p class="published_on">',
        '                {{_ \'published_on\' }} {{dt created_at}}',
        '                {{_ \'and_modified_on\'}} {{dt last_modified}}',
        '                {{_ \'by\'}} <a title="{{organization.name}}" href="{{organization.uri}}">{{organization.name}}</a>',
        '            </p>',
        '        </div>',
        '',
        '        <div class="resources-list">',
        '            <h3>{{_ \'Resources\'}}</h3>',
        '            {{#each resources}}',
        '            <div data-checkurl="/api/1/datasets/checkurl/" itemtype="http://schema.org/DataDownload" itemscope="itemscope" id="resource-{{id}}">',
        '',
        '                <a href="{{url}}" itemprop="url" target=_blank>',
        '                    <h4>',
        '                        <span data-format="{{format}}">',
        '                            {{format}}',
        '                        </span>',
        '                        {{title}}',
        '                        <p>',
        '                            Dernière modification le {{dt last_modified}}',
        '                        </p>',
        '                    </h4>',
        '                </a>',
        '',
        '            </div>',
        '            {{/each}}',
        '        </div>',
        '',
        '        <div class="meta">',
        '',
        '            <div class="supplier">',
        '                <h3>{{_ \'Supplier\'}}</h3>',
        '                <a title="{{supplier.name}}" href="{{supplier.uri}}"><br>',
        '                    <img  alt="{{supplier.name}}" src="{{fulllogo supplier.logo}}"><br>',
        '                    <span class="name">',
        '                        {{supplier.name}}',
        '                    </span>',
        '                </a>',
        '            </div>',
        '',
        '            <div class="producer">',
        '                <h3>{{_ \'Producer\'}}</h3>',
        '                <a title="{{organization.name}}" href="{{organization.uri}}">',
        '                    <img class="organization-logo producer" alt="{{organization.name}}" src="{{fulllogo organization.logo}}"><br>',
        '                    <span class="name">',
        '                        {{organization.name}}',
        '                    </span>',
        '                </a>',
        '            </div>',
        '',
        '',
        '            <div class="info">',
        '                <h3>{{_ \'Informations\'}}</h3>',
        '                <ul>',
        '                    <li title="{{_ \'License\'}}" rel="tooltip">',
        '                        <i class="fa fa-copyright"></i>',
        '                        <!--a href="http://opendatacommons.org/licenses/odbl/summary/"-->',
        '                        {{_ license}}',
        '                        <!--/a-->',
        '                    </li>',
        '                    <li title="{{_ \'Frequency\'}}" rel="tooltip">',
        '                        <span class="fa fa-clock-o"></span>',
        '                        {{_ frequency}}',
        '                    </li>',
        '                    <li title="{{_ \'Spatial granularity\'}}"  rel="tooltip">',
        '                        <span class="fa fa-bullseye"></span>',
        '                        {{_ spatial.granularity}}',
        '                    </li>',
        '                </ul>',
        '                <ul class="tags">',
        '                    {{#each tags}}',
        '                    <li><a title="{{.}}" href="https://www.data.gouv.fr/fr/search/?tag={{.}}">',
        '                        {{.}}',
        '                    </a>',
        '                </li>',
        '                {{/each}}',
        '            </ul>',
        '        </div>',
        '',
        '',
        '    </div>'
    ];


    Templates.datasetsForm = [
        '<div class="datasetsForm">',
        ' <form action="" method="get">',
        '    <input type="hidden" name="option" value="com_udata"></input>',
        '    <input type="hidden" name="view" value="udata"></input>',
        '    <div><label></label><input type="text" name="q" value="{{q}}" placeholder="Rechercher des données"></input></div>',
        '    <div><label>Organisme</label><select name="organizations">',
        '       {{#each orgs}}',
        '       {{#ifCond id "==" ../organization}}',
        '       <option value="{{id}}" selected>{{name}}</option>',
        '       {{else}}',
        '       <option value="{{id}}">{{name}}</option>',
        '       {{/ifCond}}',
        '       {{/each}}',
        '    </select></div>',
        '    <div><label></label><input type="submit" value="ok"></input></div>',
        '    </form>',
        '</div>',
        '    <br>'
    ];




    Templates.lastdatasets = [
        '<div class="uData-lastdatasets">',
        '      {{#each data}}',
        '      <div class="card dataset-card">',
        '            <a class="card-logo" href="{{ organization.uri }}" target="datagouv">',
        '                <img alt="{{  organization.name }}" src="{{ organization.logo }}" width="70" height="70">',
        '            </a>',
        '        <div class="card-body">',
        '            <h4>',
        '                <a href="{{ url }}" title="{{title}}">',
        '                    {{title}}',
        '                </a>',
        '            </h4>',
        '        </div>',
        '        <footer>',
        '            <ul>',
        '                <li>',
        '                    <a class="btn btn-xs" rel="tooltip" data-placement="top" data-container="body" title="" data-original-title="Réutilisations">',
        '                        <span class="fa fa-retweet fa-fw"></span>',
        '                        {{default metrics.reuses 0 }}',
        '                    </a>',
        '                </li>',
        '                <li>',
        '                    <a class="btn btn-xs" rel="tooltip" data-placement="top" data-container="body" title="" data-original-title="Favoris">',
        '                        <span class="fa fa-star fa-fw"></span>',
        '                        {{default metrics.followers 0 }}',
        '                    </a>',
        '                </li>',
        '            </ul>',
        '        </footer>',
        '        <a class="" href="{{ url }}" title="{{title}}">',
        '            {{trimString description}}',
        '        </a>',
        '        <footer class="">',
        '        <ul>',
        '            {{#if temporal_coverage }}',
        '            <li>',
        '                <a class="btn btn-xs" rel="tooltip"',
        '                    data-placement="top" data-container="body"',
        '                    title="{{_ \'Temporal coverage\' }}">',
        '                    <span class="fa fa-calendar fa-fw"></span>',
        '                    {{dt temporal_coverage.start format=\'L\' }} {{_ \'to\'}} {{dt temporal_coverage.end format=\'L\' }}',
        '                </a>',
        '            </li>',
        '            {{/if}}',
        '',
        '            {{#if spatial.granularity }}',
        '            <li>',
        '                <a class="btn btn-xs" rel="tooltip"',
        '                    data-placement="top" data-container="body"',
        '                    title="{{_ \'Territorial coverage granularity\' }}">',
        '                    <span class="fa fa-bullseye fa-fw"></span>',
        '                    {{_ spatial.granularity }}',
        '                </a>',
        '            </li>',
        '            {{/if}}',
        '',
        '            {{#if frequency }}',
        '            <li>',
        '                <a class="btn btn-xs" rel="tooltip"',
        '                    data-placement="top" data-container="body"',
        '                    title="{{_ \'Frequency\' }}">',
        '                    <span class="fa fa-clock-o fa-fw"></span>',
        '                    {{_ frequency }}',
        '                </a>',
        '            </li>',
        '            {{/if}}',
        '        </ul>',
        '        </footer>',
        '    </div>',
        '    {{/each}}',
        '    </div>'
    ];





    for (var tmpl in Templates) {
        Templates[tmpl] = Templates[tmpl].join("\n");
        Templates[tmpl] = Handlebars.compile(Templates[tmpl]);
    }


    var baseUrl = jQuery('script[src$="/udata.js"]').attr('src').replace('/udata.js', '/');
    var _uData = {};


    uData = function (obj, options) {


        var scrollTop = function () {
            $('html, body').animate({
                scrollTop: jQuery('div.uData-data').offset().top
            }, 250);
        }


        _uData.displayLastDatasets = function () {
            /*  var url = API_ROOT + 'datasets/?sort=-created&' + jQuery.param(options);
            jQuery.getJSON(url, function (data) {
                obj.html(Templates.lastdatasets(data));
            });*/
        };

        _uData.displayDatasets = function () {
            var url = API_ROOT + 'datasets/?' + jQuery.param(options);
            jQuery.getJSON(url, function (data) {
                var params = {
                    q: options.q,
                    organization: options.organization,
                    orgs: _uData.orgs
                };

                var html = Templates.datasetsForm(params) + Templates.datasets(data);
                obj.html(html);
                scrollTop();
            }).fail(function () {
                obj.html('<p class="error">Serveur www.data.gouv.fr injoignable</p>');
            });
        };


        _uData.displayDataset = function () {
            var url = API_ROOT + 'datasets/' + options.dataset + '/';
            jQuery.getJSON(url, function (data) {
                obj.find('.dataset-result[data-dataset="' + options.dataset + '"]')
                    .append(jQuery(Templates.dataset(data)));

                obj.find('div.dataset[data-dataset="' + options.dataset + '"] ').hide().slideDown();
            }).fail(
                function () {
                    oobj.find('.dataset-result[data-dataset="' + options.dataset + '"]')
                        .append('<p class="error">Serveur www.data.gouv.fr injoignable</p>');
                }
            );
        };

        /*    _uData.displayLastReuses = function () {
            var url = API_ROOT + 'reuses/?' + jQuery.param(options);
            jQuery.getJSON(url, function (data) {
                var t = Handlebars.compile($("#reuse-template").html());
                obj.html(t(data));
            });
};*/

        return _uData;
    };


    var API_ROOT = "https://www.data.gouv.fr/api/1/"; //!TODO get from div param



    var checklibs = function () {
        var dependences = {
            'Handlebars': 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.2/handlebars.min.js',
            'i18n': 'https://cdnjs.cloudflare.com/ajax/libs/i18next/1.6.3/i18next-1.6.3.min.js',
            'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js',
            'marked': 'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js',
        };
        var ready = true;
        for (var i in dependences) {
            if (typeof window[i] == 'undefined') {
                if (jQuery('script[src="' + dependences[i] + '"]').length == 0) {
                    jQuery('<script src="' + dependences[i] + '"></script>').appendTo('body');
                }
                ready = false;
            }
        }
        if (ready) {
            start();
        } else {
            setTimeout(checklibs, 100);
        }
    }




    var start = function () {

        var container = _uData.container;

        _uData.lang = lang = 'fr';

        i18n.init({
            resGetPath: baseUrl + 'locales/udata.' + lang + '.json',
            lng: lang,
            load: 'unspecific',
            interpolationPrefix: '{',
            interpolationSuffix: '}',
            fallbackLng: false,
            fallbackOnEmpty: true,
            fallbackOnNull: true,
            nsseparator: '::', // Allow to use real sentences as keys
            keyseparator: '$$', // Allow to use real sentences as keys
        }, function (err, t) { /* loading done */ });

        moment.locale('fr', {
            months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
            monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
            weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
            longDateFormat: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY LT",
                LLLL: "dddd D MMMM YYYY LT"
            },
            calendar: {
                sameDay: "[Aujourd'hui à] LT",
                nextDay: '[Demain à] LT',
                nextWeek: 'dddd [à] LT',
                lastDay: '[Hier à] LT',
                lastWeek: 'dddd [dernier à] LT',
                sameElse: 'L'
            },
            relativeTime: {
                future: "dans %s",
                past: "il y a %s",
                s: "quelques secondes",
                m: "une minute",
                mm: "%d minutes",
                h: "une heure",
                hh: "%d heures",
                d: "un jour",
                dd: "%d jours",
                M: "un mois",
                MM: "%d mois",
                y: "une année",
                yy: "%d années"
            },
            ordinalParse: /\d{1,2}(er|ème)/,
            ordinal: function (number) {
                return number + (number === 1 ? 'er' : 'ème');
            },
            meridiemParse: /PD|MD/,
            isPM: function (input) {
                return input.charAt(0) === 'M';
            },
            // in case the meridiem units are not separated around 12, then implement
            // this function (look at locale/id.js for an example)
            // meridiemHour : function (hour, meridiem) {
            //     return /* 0-23 hour, given meridiem token and hour 1-12 */
            // },
            meridiem: function (hours, minutes, isLower) {
                return hours < 12 ? 'PD' : 'MD';
            },
            week: {
                dow: 1, // Monday is the first day of the week.
                doy: 4 // The week that contains Jan 4th is the first week of the year.
            }
        });

        moment.locale(lang);

        container.each(function () {
            var obj = jQuery(this);
            var ud = uData(obj, obj.data());
            ud.displayLastDatasets();
        });

        var loadDataSets = function () {
            container.each(function () {
                var obj = jQuery(this);
                var ud = uData(obj, obj.data());
                ud.displayDatasets();

            });
        }


        var loadDataSet = function (id) {

            if (jQuery('div.dataset[data-dataset="' + id + '"]').length) {
                jQuery('div.dataset[data-dataset="' + id + '"] ').slideToggle();
            } else {

                container.each(function () {
                    var obj = jQuery(this);
                    var ud = uData(obj, {
                        dataset: id
                    });
                    ud.displayDataset();
                });
            }
        }

        /*   container.each(function () {
            var obj = jQuery(this);
            var ud = uData(obj, obj.data());
            ud.displayLastReuses();
        });*/


        var scrollTop = function () {
            $('html, body').animate({
                scrollTop: jQuery('div.uData-data').offset().top
            }, 250);
        }

        var updateParams = function () {
            var q = container.find('.datasetsForm input[name="q"]').val();
            _uData.container.data('q', q);
            var organization = container.find('.datasetsForm select[name="organizations"] option:selected').val();
            _uData.container.data('organization', organization);
            _uData.container.data('page', 1);
        }


        if (jQuery('div.uData-data').length) {

            var container = jQuery('div.uData-data');
            var setPage = function (p) {
                container.data('page', p);
                loadDataSets();
            }

            container.on('click', 'a[data-page]', function (e) {
                e.preventDefault();
                setPage(jQuery(this).data('page'));
            })
                .on('click', 'a[data-dataset]', function (e) {
                    e.preventDefault();
                    loadDataSet(jQuery(this).data('dataset'));
                })
                .on('click', 'a.reloadDataSets', function (e) {
                    e.preventDefault();
                    loadDataSets();
                }).
            on('click', '.datasetsForm button', function (e) {
                e.preventDefault();
                updateParams();
                loadDataSets();
            }).
            on('change', '.datasetsForm *', function (e) {
                e.preventDefault();
                updateParams();
                loadDataSets();
            });

            setPage(1);
            //loadDataSet('53698ed4a3a729239d203594');
        }

    };

    var jsonfail = function () {
        _uData.container.html('<p class="error">Serveur www.data.gouv.fr injoignable</p>')
    }

    var getOrganizationName = function (org) {
        var url = API_ROOT + 'organizations/' + org + '/';
        jQuery.getJSON(url, function (data) {
            for (var i in _uData.orgs) {
                var o = _uData.orgs[i];
                if (o.id == data.id) {
                    _uData.orgs[i] = data;
                }
            }

            options = _uData.container.data();
            var params = {
                q: options.q,
                organization: options.organization,
                orgs: _uData.orgs
            };

            var html = Templates.datasetsForm(params);
            jQuery('.datasetsForm').replaceWith(html);

        }).fail(jsonfail);
    }

    /* START */

    window._uData = {};
    _uData.container = jQuery('div.uData-data[data-organizations]');
    var orgs = _uData.container.data('organizations').split(',');

    _uData.container.html('<p class="loading">chargement en cours</p>');

    for (var i in orgs) {
        getOrganizationName(orgs[i]);
    }

    _uData.container.data('organization', orgs[0]);
    _uData.container.data('organizations', '');
    _uData.orgs = [];

    for (var i in orgs) {
        _uData.orgs.push({
            id: orgs[i],
            name: orgs[i]
        });
    }

    checklibs();






    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

        switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
        }
    });



    Handlebars.registerHelper('paginate', function (n, total, page_size) {

        var res = '';
        var nPage = Math.ceil(total / page_size);
        if (nPage == 1) return '';
        for (var i = 1; i <= nPage; ++i) {
            res += '<li' + (i == n ? ' class="active"' : '') + ">";
            res += '<a href="#" data-page=' + i + '>' + i + '</a></li>';
        }
        return '<nav><ul class="pagination">' + res + '</ul></nav>';
    });

    Handlebars.registerHelper('taglist', function (tags) {
        var res = '';
        for (var i in tags) {
            res += "<span class='label label-primary' >" + tags[i] + '</span> ';
        }
        return res;
    });

    Handlebars.registerHelper('trimString', function (passedString) {
        if (passedString.length > 150) {
            var theString = passedString.substring(0, 150) + '...';
            return new Handlebars.SafeString(theString);
        } else {
            return passedString;
        }

    });

    Handlebars.registerHelper('truncate', function (str, len) {
        if (str && str.length > len && str.length > 0) {
            var new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = (new_str.length > 0) ? new_str : str.substr(0, len);

            return new Handlebars.SafeString(new_str + '...');
        }
        return str;
    });

    Handlebars.registerHelper('default', function (value, defaultValue) {
        if (value != null) {
            return value
        } else {
            return defaultValue;
        }
    });

    Handlebars.registerHelper('dt', function (value, options) {
        return moment(value).format(options.hash['format'] || 'LLL');
    });

    Handlebars.registerHelper('placeholder', function (url, type) {
        return url ? url : baseUrl + 'img/placeholders/' + type + '.png';
    });

    Handlebars.registerHelper('_', function (value, options) {
        if (!value || typeof value !== 'string') {
            return '';
        }
        options.hash.defaultValue = '???';
        var res = i18n.t(value, options.hash);

        if (res == '???') {
            value = value.charAt(0).toLowerCase() + value.slice(1);
            res = i18n.t(value, options.hash);
            res = res.charAt(0).toUpperCase() + res.slice(1);
        }
        if (res == '???') {
            value = value.charAt(0).toUpperCase() + value.slice(1);
            res = i18n.t(value, options.hash);
            res = res.charAt(0).toLowerCase() + res.slice(1);
        }
        if (res == '???') {
            console.log('i18n "' + value + '" NOT FOUND')
            return value;
        }

        return res;
    });


    Handlebars.registerHelper('md', function (value) {
        return new Handlebars.SafeString(marked(value));
    });



    Handlebars.registerHelper('mdshort', function (value, length) {
        if (!value) {
            return;
        }

        var EXCERPT_TOKEN = '<!--- --- -->',
            DEFAULT_LENGTH = 128;

        if (typeof length == 'undefined') {
            length = DEFAULT_LENGTH;
        }

        var text, ellipsis;
        if (value.indexOf('<!--- excerpt -->')) {
            value = value.split(EXCERPT_TOKEN, 1)[0];
        }
        ellipsis = value.length >= length ? '...' : '';
        text = marked(value.substring(0, length) + ellipsis);
        text = text.replace('<a ', '<span ').replace('</a>', '</span>');
        return new Handlebars.SafeString(text);
    });


    Handlebars.registerHelper('theme', function (value) {
        return new Handlebars.SafeString(baseUrl + '' + value);
    });


    Handlebars.registerHelper('fulllogo', function (value) {
        //   value = value.replace('-100.png', '.png'); // BAD IDEA can be .png or .jpg
        return new Handlebars.SafeString(value);
    });




});