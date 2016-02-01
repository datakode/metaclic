var uData;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function ($) {

    var Templates = {};

    var sortTypes = [{
        id: 'title',
        name: 'Titre',
    }, {
        id: 'created',
        name: 'Date de création'
    }, {
        id: 'last_modified',
        name: 'Date de dernière modification'
    }, {
        id: 'followers',
        name: 'Favoris'
    }, {
        id: 'reuses',
        name: 'Réutilisations'
    }];

    var sortDesc = false;


    Templates.datasets = [
        ' <div class="result-count">{{ total }} résultat(s)</div>',
        ' {{#ifCond sort "!=" false}}',
        '    <div class="result-sort form-inline"><label>Trier par</label>',
        '       <select name="sort" class="form-control">',
        '            {{#each sortTypes}}',

        '            {{#ifCond id "==" ../sort}}',
        '            <option value="{{id}}" selected>{{name}}</option>',
        '            {{else}}',
        '            <option value="{{id}}">{{name}}</option>',
        '            {{/ifCond}}',

        '            {{/each}}',
        '       </select>',
        '       <a href="#" class="sortdirection">',
        '            {{#ifCond sortDesc "==" true}}',
        '            <i class="fa fa-sort-alpha-desc"></i>',
        '            {{else}}',
        '            <i class="fa fa-sort-alpha-asc"></i>',
        '            {{/ifCond}}',
        '       </a>',
        '</div>',
        '{{/ifCond}}',
        '    <ul class="search-results">',
        '        {{#each data}}',
        '        <li class="search-result dataset-result" data-dataset="{{id}}">',
        '            <a href="{{ page }}" title="{{  organization.name }}"  data-dataset="{{id}}">',
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
        '                </a><ul class="list-inline result-infos">',
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
        '                {{_ \'by\'}} <a title="{{organization.name}}" href="{{organization.page}}">{{organization.name}}</a>',
        '            </p>',
        '        </div>',
        '',
        '        <div class="resources-list">',
        '            <h3>{{_ \'Resources\'}}</h3>',
        '            {{#each resources}}',
        '            <div data-checkurl="/api/1/datasets/checkurl/" itemtype="http://schema.org/DataDownload" itemscope="itemscope" id="resource-{{id}}">',
        '',
        '                <a href="{{url}}" data-size="{{filesize}}" data-format="{{format}}" data-title="{{title}}" data-id="{{id}}" itemprop="url" target=_blank>',
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
        '            <div class="producer">',
        '                <h3>{{_ \'Producer\'}}</h3>',
        '                <a title="{{organization.name}}" href="{{organization.page}}">',
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
        '                <ul class="spatial_zones">',
        '                    {{#each spatial.zones}}',
        '                    <li data-zone="{{.}}">{{.}}</li>',
        '                    {{/each}}',
        '               </ul>',
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
        '    <div><label></label><input type="text" name="q" value="{{q}}" placeholder="Rechercher des données" class="form-control"></input></div>',
        '        {{#ifCount orgs ">" 1 }}',
        '    <div>',
        '        {{else}}',
        '    <div class="hidden">',
        '        {{/ifCount}}',
        '       <label>Organisme</label><select name="organizations" class="form-control">',
        '       {{#each orgs}}',
        '       {{#ifCond id "==" ../organization}}',
        '       <option value="{{id}}" selected>{{name}}</option>',
        '       {{else}}',
        '       <option value="{{id}}">{{name}}</option>',
        '       {{/ifCond}}',
        '       {{/each}}',
        '    </select></div>',
        '',
        //'    <div><label></label><input type="submit" value="ok"></input></div>',
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



    Templates.shareLink = [
        '<div class="uData-shareLink">',
        '<div class="text-right"><a href="#">intégrez cet outil de recherche sur votre site&nbsp;<i class="fa fa-share-alt"></i></a></div>',
        '<div class="hidden">',
        '   <h4>Vous pouvez intégrer cet outil de recherche de données sur votre site</h4>',
        '   <p>Pour ceci collez le code suivant dans le code HTML de votre page</p>',
        '   <pre>',
        '&lt;script&gt;window.jQuery || document.write("&lt;script src=\'//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js\'&gt;&lt;\\\/script&gt;")&lt;/script&gt;',
        '',
        '&lt;!-- chargement feuille de style bootstrap --&gt;',
        '&lt;link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css"&gt;',
        '&lt;!-- chargement feuille de style font-awesome --&gt;',
        '&lt;link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"&gt;',
        '',
        '&lt;script src="{{baseUrl}}udata.js"&gt;&lt;/script&gt;',
        '&lt;div class="uData-data"',
        '   data-q="{{q}}"',
        '   data-organizations="{{organizationList}}"',
        '   data-organization="{{organization}}"',
        '   data-page_size="{{page_size}}"',
        '&gt&lt;/div&gt',
        '   </pre>',
        "   <p>vous pouvez trouver plus d'info sur cet outil et son paramétrage à cette adresse: <a href='https://github.com/DepthFrance/udata-js' target='_blank'>https://github.com/DepthFrance/udata-js</a></p>",
        '</div>',
        '</div>',
    ];






    var baseUrl = jQuery('script[src$="/udata.js"]').attr('src').replace('/udata.js', '/');

    var _uData = {};


    uData = function (obj, options) {


        options.baseUrl = baseUrl;
        options.organizationList = [];
        jQuery.each(_uData.orgs, function (k, v) {
            options.organizationList.push(v.id);
        });
        options.organizationList = options.organizationList.join(',');

        if (options.organization == '') {
            options.organization = _uData.orgs[0].id;
        }

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
            var options2 = options;

            if (typeof options2.sort == 'undefined') {
                    options2.sort=sortTypes[0].id;
            }

            if (typeof options2.sort == 'string') {
                options2.sort = options2.sort.replace('-', '');
                if (sortDesc) {
                    options2.sort = '-' + options2.sort;
                }
            }

            var url = API_ROOT + 'datasets/?' + jQuery.param(options2);
            jQuery.getJSON(url, function (data) {


                var params = {
                    q: options.q,
                    organization: options.organization,
                    orgs: _uData.orgs,
                    sort: options.sort,
                    sortTypes: sortTypes,
                    sortDesc: sortDesc,
                };


                data.sort = options.sort;
                if (typeof data.sort == 'string') {
                    data.sort = data.sort.replace('-', '');
                }
                data.sortDesc = sortDesc;
                data.sortTypes = sortTypes;


                var html = Templates.datasetsForm(params) + Templates.datasets(data);
                if (options.sharelink) {
                    html += Templates.shareLink(options);
                }
                // console.log(params);
                obj.html(html);
                scrollTop();
            }).fail(function () {
                obj.html('<p class="error">Serveur www.data.gouv.fr injoignable</p>');
            });
        };

        var addSpatialZoneMap = function (dataset) {
            var bloc = obj.find('.dataset-result[data-dataset="' + options.dataset + '"]');
            var zones_li = bloc.find('ul.spatial_zones li');
            bloc.find('ul.spatial_zones').hide();
            var list = [];
            zones_li.each(function () {
                list.push(jQuery(this).data('zone'));
            });
            if (list.length) {
                var url = API_ROOT + 'spatial/zones/' + list.join(',');
                bloc.find('.info').append(jQuery('<h3>Couverture spatiale</h3><div class="spatial_zones"><div class="map map_zones" id="map' + options.dataset + '_zones"></div></div>'));
                var map = L.map('map' + options.dataset + '_zones', {
                    scrollWheelZoom: false
                }).setView([0, 0], 1);
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
                jQuery.getJSON(url, function (data) {
                    var layer = L.geoJson(data, {
                        onEachFeature: function (feature, layer) {
                            var html = '<h4>' + feature.properties.name + '</h4>' + feature.properties.population + ' habitants'
                            layer.bindPopup(html);
                        }
                    }).addTo(map);
                    map.fitBounds(layer.getBounds());
                });

            }
        }

        var urlify = function (text) {
            if ('string' != typeof text) return text;
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, function (url) {
                    return '<a href="' + url + '" target="_blank">' + url + '</a>';
                })
                // or alternatively
                // return text.replace(urlRegex, '<a href="$1">$1</a>')
        }



        var addPreviewMap = function (dataset) {
            var bloc = obj.find('.dataset-result[data-dataset="' + options.dataset + '"]');
            var geojson_links = bloc.find('.resources-list a[data-format="JSON"]');
            //console.log(geojson_links);

            geojson_links.each(function () {
                var geojson_link = jQuery(this);
                var ressource_title = geojson_link.data('title');
                var ressource_id = geojson_link.data('id');
                var geojson_url = geojson_link.prop('href');
                var url = API_ROOT + 'datasets/checkurl/?url=' + encodeURIComponent(geojson_url) + '&group=' + options.dataset;

                jQuery.getJSON(url, function (data) {
                    var contentlength = parseInt(data['content-length']);
                    // console.log(contentlength);
                    // que faire des NaN ???
                    if (isNaN(contentlength) || contentlength <= contentlength_limit) {
                        jQuery.getJSON(geojson_url, function (data) {

                            if (data.features.length > featurelength_limit) {
                                console.warn('feature count excess: ' + data.features.length + ' (max:' + featurelength_limit + ')');
                                return false;
                            }

                            //bloc.find('.dataset .resources-list')
                            geojson_link.closest('div').append(jQuery('<div class="geojson_preview card card-5"><div class="map map_preview" id="map_ressource_' + ressource_id + '"></div><h4>' + ressource_title + '</h4></div>'));
                            var map = L.map('map_ressource_' + ressource_id, {
                                scrollWheelZoom: false
                            }).setView([0, 0], 1);
                            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
                            var layer = L.geoJson(data, {
                                onEachFeature: function (feature, layer) {
                                    var html = '';
                                    jQuery.each(feature.properties, function (k, v) {
                                        html += '<tr><th>' + k + '</th><td>' + urlify(v) + '</td></tr>';
                                    });
                                    html = '<table class="table table-hover table-bordered">' + html + '</table>';

                                    layer.bindPopup(html);
                                }
                            }).addTo(map);
                            map.fitBounds(layer.getBounds());
                            geojson_link.closest('div').find('.geojson_preview').hide().fadeIn('slow');
                        }).fail(
                            function (data) {
                                console.warn("can't load GeoJson: " + geojson_url);
                            });
                    } else {
                        console.warn('content-length excess: ' + contentlength + ' (max:' + contentlength_limit + ')');
                    }

                });

            });
        }


        _uData.displayDataset = function () {
            var url = API_ROOT + 'datasets/' + options.dataset + '/';
            jQuery.getJSON(url, function (data) {
                obj.find('.dataset-result[data-dataset="' + options.dataset + '"]')
                    .append(jQuery(Templates.dataset(data)));

                obj.find('div.dataset[data-dataset="' + options.dataset + '"] ').hide().slideDown('slow');
                addSpatialZoneMap(options.dataset);
                addPreviewMap(options.dataset);
            }).fail(
                function () {
                    obj.find('.dataset-result[data-dataset="' + options.dataset + '"]')
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
    var contentlength_limit = 2.5 * 1000000; //2.5Mo
    var featurelength_limit = 2000; //nb max d'objet geojson



    var checklibs = function () {
        var dependences = {
            'Handlebars': 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.2/handlebars.min.js',
            'i18n': 'https://cdnjs.cloudflare.com/ajax/libs/i18next/1.6.3/i18next-1.6.3.min.js',
            'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js',
            'marked': 'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js',
            'L': 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js',
        };

        var css = {
            'L': 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css',
        };
        var ready = true;
        for (var i in css) {
            if (jQuery('link[href="' + css[i] + '"]').length == 0) {
                jQuery('<link type="text/css" href="' + css[i] + '" rel="stylesheet">').appendTo('head');
            }
        }

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

        /** i18n init  **/
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


        /** momentjs init  **/
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


        /** Handlebars init  **/

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

 Handlebars.registerHelper('ifCount', function (v1, operator, v2, options) {
            var v1=v1.length;
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
                console.warn('i18n "' + value + '" NOT FOUND')
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

        for (var tmpl in Templates) {
            var template_surcharge_id = 'udata_template_' + tmpl;
            console.info('load template: #' + template_surcharge_id);
            var t = jQuery('#' + template_surcharge_id).first();
            if (t.length) {
                Templates[tmpl] = t.html();
                console.info('loaded.');
            } else {
                console.info('not found, use default template.');
            }

            if (typeof Templates[tmpl] != 'string')
                Templates[tmpl] = Templates[tmpl].join("\n");
            Templates[tmpl] = Handlebars.compile(Templates[tmpl]);
        }

        /** init  **/

        window._uData = {};
        container = _uData.container = jQuery('div.uData-data[data-organizations]');
        var orgs = _uData.container.data('organizations').split(',');

        _uData.container.html('<p class="loading">chargement en cours</p>');

        for (var i in orgs) {
            getOrganizationName(orgs[i]);
        }

        //_uData.container.data('organization', orgs[0]);
        _uData.container.data('organizations', '');
        _uData.orgs = [];

        for (var i in orgs) {
            _uData.orgs.push({
                id: orgs[i],
                name: orgs[i]
            });
        }


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
            var sort = container.find('.result-sort select[name="sort"] option:selected').val();
            _uData.container.data('sort', sort);
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
            on('change', '.datasetsForm *, .result-sort *', function (e) {
                e.preventDefault();
                updateParams();
                loadDataSets();
            }).
            on('click', '.result-sort a.sortdirection', function (e) {
                e.preventDefault();
                sortDesc = !sortDesc;
                updateParams();
                loadDataSets();
            }).on('submit', '.datasetsForm form', function (e) {
                e.preventDefault();
                updateParams();
                loadDataSets();
            }).
            on('click', '.uData-shareLink a[href="#"]', function (e) {
                jQuery('.uData-shareLink .hidden').removeClass('hidden').hide().slideDown('slow');
                jQuery('.uData-shareLink  a[href="#"]').fadeOut();
                e.preventDefault();
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

            //tri par nom
            _uData.orgs.sort(function (a, b) {
                if (a.name > b.name)
                  return 1;
                return -1;
            });

            options = _uData.container.data();
            var params = {
                q: options.q,
                organization: options.organization,
                orgs: _uData.orgs,
                sort: options.sort,
                sortTypes: sortTypes,
                sortDesc: sortDesc,
            };

            var html = Templates.datasetsForm(params);
            jQuery('.datasetsForm').replaceWith(html);

        }).fail(jsonfail);
    }

    /* START */
    if (jQuery('link[href$="udata.css"]').length == 0)
                jQuery('<link type="text/css" href="' + baseUrl + 'udata.css" rel="stylesheet">').appendTo('head');

    checklibs();



});