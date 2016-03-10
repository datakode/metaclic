var uData;


var uDataUtils = {};

uDataUtils.urlify = function (text) {
    if ('string' != typeof text) return text;
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
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

        '<div class="row">',
        '{{#ifCond facets "!=" undefined}}',
        '<div class="col-md-9">',
        '{{else}}',
        '<div class="col-md-12">',
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
        '</div>',

        '{{#ifCond facets "!=" undefined}}',
        '<div class="col-md-3 uData-facets"><br>',

        '{{#ifCond facets.tag "!=" undefined}}',
        '{{#if facets.tag.terms}}',
        '<div class="panel panel-default">',
        '    <div class="panel-heading"><i class="fa fa-tags fa-fw"></i> Tags</div>',
        '    <ul class="list-group" data-limitlist=5>',
        '       {{#each facets.tag.terms}}',

        '       <a class="list-group-item" href="#" data-addTag="{{this.[0]}}">',
        '       <span class="badge">{{this.[1]}}</span>',
        '       {{this.[0]}}',
        '       </a>',
        '       {{/each}}',
        '    </ul>',
        '</div>',
        '{{/if}}',
        '{{/ifCond}}',


        '{{#ifCond facets.license "!=" undefined}}',
        '{{#if facets.license.models}}',
        '<div class="panel panel-default">',
        '    <div class="panel-heading"><i class="fa fa-copyright fa-fw"></i> Licences</div>',
        '    <ul class="list-group" data-limitlist=5>',
        '       {{#each facets.license.models}}',

        '       <a class="list-group-item" href="#" data-addLicense="{{this.[0].id}}">',
        '       <span class="badge">{{this.[1]}}</span>',
        '       {{_ this.[0].id}}',
        '       </a>',
        '       {{/each}}',
        '    </ul>',
        '</div>',
        '{{/if}}',
        '{{/ifCond}}',

        //couverture temporelle

        '{{#ifCond facets.geozone "!=" undefined}}',
        '{{#if facets.geozone.models}}',
        '<div class="panel panel-default">',
        '    <div class="panel-heading"><i class="fa fa-map-marker fa-fw"></i> Couverture spatiale</div>',
        '    <ul class="list-group" data-limitlist=5>',
        '       {{#each facets.geozone.models}}',

        '       <a class="list-group-item geozone-to-load" href="#" data-addGeozone="{{this.[0].id}}">',
        '       <span class="badge">{{this.[1]}}</span>',
        '       {{this.[0].id}}',
        '       </a>',
        '       {{/each}}',
        '    </ul>',
        '</div>',
        '{{/if}}',
        '{{/ifCond}}',



        '{{#ifCond facets.granularity "!=" undefined}}',
        '{{#if facets.granularity.terms}}',
        '<div class="panel panel-default">',
        '    <div class="panel-heading"><i class="fa fa-bullseye fa-fw"></i> Granularité territoriale</div>',
        '    <ul class="list-group" data-limitlist=5>',
        '       {{#each facets.granularity.terms}}',

        '       <a class="list-group-item" href="#" data-addGranularity="{{this.[0]}}">',
        '       <span class="badge">{{this.[1]}}</span>',
        '       {{_ this.[0]}}',
        '       </a>',
        '       {{/each}}',
        '    </ul>',
        '</div>',
        '{{/if}}',
        '{{/ifCond}}',


        '{{#ifCond facets.format "!=" undefined}}',
        '{{#if facets.format.terms}}',
        '<div class="panel panel-default">',
        '    <div class="panel-heading"><i class="fa fa-file fa-fw"></i> Formats</div>',
        '    <ul class="list-group" data-limitlist=5>',
        '       {{#each facets.format.terms}}',

        '       <a class="list-group-item" href="#" data-addFormat="{{this.[0]}}">',
        '       <span class="badge">{{this.[1]}}</span>',
        '       {{_ this.[0]}}',
        '       </a>',
        '       {{/each}}',
        '    </ul>',
        '</div>',
        '{{/if}}',
        '{{/ifCond}}',

        // reuse


        '</div>',
        '{{/ifCond}}',

        '</div>',

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
        '                <a href="{{url}}" data-size="{{filesize}}" data-format="{{uppercase format}}" data-title="{{title}}" data-id="{{id}}" itemprop="url" target=_blank>',
        '                    <h4>',
        '                        <span data-format="{{uppercase format}}">',
        '                            {{uppercase format}}',
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
        '    <p class="selected_assets">',
        '   {{#if tags}}',
        '   {{#each tags}}',
        '       <a href="#" class="btn btn-default btn-sm" data-removeTag="{{.}}"> &times;<i class="fa fa-tags fa-fw"></i> {{.}}</a>',
        '   {{/each}}',
        '   {{/if}}',
        '   {{#if license}}',
        '       <a href="#" class="btn btn-default btn-sm" data-removeParam="license"> &times;<i class="fa fa-copyright fa-fw"></i> {{license}}</a>',
        '   {{/if}}',
        '   {{#if geozone}}',
        '       <a href="#" class="btn btn-default btn-sm" data-removeParam="geozone"> &times;<i class="fa fa-map-marker fa-fw"></i> {{geozone}}</a>',
        '   {{/if}}',
        '   {{#if granularity}}',
        '       <a href="#" class="btn btn-default btn-sm" data-removeParam="granularity"> &times;<i class="fa fa-bullseye  fa-fw"></i> {{granularity}}</a>',
        '   {{/if}}',
        '   {{#if format}}',
        '       <a href="#" class="btn btn-default btn-sm" data-removeParam="format"> &times;<i class="fa fa-file fa-fw"></i> {{format}}</a>',
        '   {{/if}}',
        '   </p>',
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




    Templates.shareLinkMap = [
        '<div class="uDataMap-shareLink">',
        '<div class="text-right"><a href="#">intégrez cette carte à votre site&nbsp;<i class="fa fa-share-alt"></i></a></div>',
        '<div class="hidden">',
        '   <h4>Vous pouvez intégrer cet carte sur votre site</h4>',
        '   <p>Pour ceci collez le code suivant dans le code HTML de votre page</p>',
        '   <pre>',
        '&lt;script&gt;window.jQuery || document.write("&lt;script src=\'//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js\'&gt;&lt;\\\/script&gt;")&lt;/script&gt;',
        '',
        '&lt;script src="{{baseUrl}}udata.js"&gt;&lt;/script&gt;',
        '&lt;div class="uData-map"',
        "   data-ressources='{{jsonencode ressources}}'",
        "   data-leaflet_map_options='{{jsonencode leaflet_map_options}}'",
        "   data-title='{{title}}'",
        '&gt&lt;/div&gt',
        '   </pre>',
        "   <p>vous pouvez trouver plus d'info sur cet outil et son paramétrage à cette adresse: <a href='https://github.com/DepthFrance/udata-js' target='_blank'>https://github.com/DepthFrance/udata-js</a></p>",
        '</div>',
        '</div>',
    ];




    var baseUrl = jQuery('script[src$="/udata.js"]')[0].src.replace('/udata.js', '/');

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
                options2.sort = sortTypes[0].id;
            }

            if (typeof options2.sort == 'string') {
                options2.sort = options2.sort.replace('-', '');
                if (sortDesc) {
                    options2.sort = '-' + options2.sort;
                }
            }

            delete options2.organizations;
            delete options2.sharelink;
            delete options2.sharemaps;
            delete options2.baseUrl;
            delete options2.organizationList;
            if (options2.tags != undefined)
                options2.tag = options2.tags;

            var url = API_ROOT + 'datasets/?' + jQuery.param(options2);
            url = url.replace(/tag%5B%5D/g, 'tag'); // ! a corriger dans l'API pour gerer des vrais get array
            jQuery.getJSON(url, function (data) {


                var params = {
                    q: options.q,
                    organization: options.organization,
                    orgs: _uData.orgs,
                    sort: options.sort,
                    sortTypes: sortTypes,
                    sortDesc: sortDesc,
                };


                if (typeof options.tags != undefined) params.tags = options.tags;

                if (typeof options.license != undefined) params.license = options.license;

                if (typeof options.geozone != undefined) params.geozone = options.geozone;

                if (typeof options.granularity != undefined) params.granularity = options.granularity;

                if (typeof options.format != undefined) params.format = options.format;


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
                updateGeozonesTrans();
                updateListLimit();
                scrollTop();
            }).fail(function () {
                obj.html('<p class="error">Serveur ' + API_ROOT + ' injoignable</p>');
            });
        };

        var addSpatialZoneMap = function (dataset) {
            var bloc = obj.find('.dataset-result[data-dataset="' + options.dataset + '"]');
            var zones_li = bloc.find('ul.spatial_zones li');
            bloc.find('ul.spatial_zones').hide();
            var list = [];
            var style = function (feature) {
                return {
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.25
                };
            };

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
                        },
                        style: style
                    }).addTo(map);
                    map.fitBounds(layer.getBounds());
                });

            }
        }








        var addPreviewMap = function (dataset) {
            var bloc = obj.find('.dataset-result[data-dataset="' + options.dataset + '"]');
            var geojson_links = bloc.find('.resources-list a[data-format="JSON"],.resources-list a[data-format="GEOJSON"]');
            //console.log(geojson_links);

            geojson_links.each(function () {
                var geojson_link = jQuery(this);
                var ressource_title = geojson_link.data('title');
                var ressource_id = geojson_link.data('id');
                var geojson_url = geojson_link.prop('href');
                var url = API_ROOT + 'datasets/checkurl/?url=' + encodeURIComponent(geojson_url) + '&group=' + options.dataset;

                //geojson_link.closest('div').append(jQuery('<div class="geojson_loading alert alert-info">chargement en cours <i class="fa fa-spinner fa-spin"></i></div>'));

                jQuery.getJSON(url, function (data) {
                    var contentlength = parseInt(data['content-length']);
                    // console.log(contentlength);
                    // que faire des NaN ???
                    if (isNaN(contentlength) || contentlength <= contentlength_limit) {

                        var mapOptions = {
                            ressources: [{
                                url: geojson_url,
                                id: ressource_id,
                                title: ressource_title,
                                type: 'geojson',
                                //style: test_style,
                                //template: test_template
                            }],
                            title: ressource_title,
                            sharelink: true,
                            leaflet_map_options: {
                                scrollWheelZoom: false
                            }
                        }

                        uDataMap(geojson_link.closest('div'), mapOptions);

                    } else {
                        //console.warn('content-length excess: ' + contentlength + ' (max:' + contentlength_limit + ')');
                        geojson_link.closest('div').find('.geojson_loading').removeClass('alert-info').addClass('alert alert-warning').html('<strong><i class="fa fa-info-circle"></i> fichier trop important pour être chargé (>' + contentlength_limit / 1000 + 'ko)</strong><br><a href="' + geojson_url + '">' + geojson_url + '</a>');
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

    //////////////////// UDATAMAP

    uDataMap = function (obj, ori_options) {
        var _uDataMap = {};
        var defaults = {
            title: false,
            sharelink: false,
            ressources: [],
            leaflet_map_options: {},
            background_layers: [{
                    title: 'OpenStreetMap',
                    url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                },

                {
                    title: 'MapQuest Open',
                    url: '//otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png'
                },

                {
                    title: 'OpenTopoMap',
                    url: '//{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
                }
            ]
        }

        var backgroundLayers = [];
        var loadedLayers = [];


        options = jQuery.extend({}, defaults, ori_options || {});
        var map = null;


        _uDataMap.addBackground = function (title, layer, show) {
            backgroundLayers[title] = layer;
            if (show === true) layer.addTo(map);
            updateBBoxAndLayerController();

        }

        var initMap = function () {
            obj.append(jQuery('<div class="geojson_preview card card-5"><div class="map map_preview"></div>' + (options.title ? '<h4>' + options.title + '</h4>' : '') + '</div>'));


            map = L.map(obj.find('.map')[0], options.leaflet_map_options).setView([0, 0], 1);
            map.attributionControl.setPrefix('');
            map.layerController = L.control.layers(backgroundLayers, loadedLayers).addTo(map);

            for (var i in options.background_layers) {
                var l = L.tileLayer(options.background_layers[i].url);
                var t = options.background_layers[i].title;
                _uDataMap.addBackground(t, l, i == 0);
            }


            if (options.sharelink) {
                ori_options.baseUrl = baseUrl;
                Template_shareLink = Templates.shareLinkMap;
                var html = Template_shareLink(ori_options);
                obj.find('.geojson_preview').append(html);

                obj.on('click', '.uDataMap-shareLink a[href="#"]', function (e) {
                    jQuery('.uDataMap-shareLink .hidden').removeClass('hidden').hide().slideDown('slow');
                    jQuery('.uDataMap-shareLink  a[href="#"]').fadeOut();
                    e.preventDefault();
                })
            }


        }; //FIN initMap



        var updateBBoxAndLayerController = function () {
            var bounds = null;
            for (var i in loadedLayers) {
                if (null === bounds) {
                    bounds = loadedLayers[i].getBounds();
                } else {
                    bounds = bounds.extend(loadedLayers[i].getBounds());
                }
            }
            if (bounds != null)
                map.fitBounds(bounds);

            map.layerController.removeFrom(map);
            map.layerController = L.control.layers(backgroundLayers, loadedLayers).addTo(map);
        }; // FIN updateBBoxAndLayerController


        var default_style = function (feature) {
            return {
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            }
        };

        var default_template = function (feature) {
            var html = '';
            jQuery.each(feature.properties, function (k, v) {
                html += '<tr><th>' + k + '</th><td>' + uDataUtils.urlify(v) + '</td></tr>';
            });
            html = '<table class="table table-hover table-bordered">' + html + '</table>';
            return html;
        };

        //var default_pointToLayer = false;
        var default_pointToLayer = function (feature, latlng, featuresCount) {

            if (featuresCount < icons_limit) return L.marker(latlng);

            var geojsonMarkerOptions = {
                radius: 3
            };

            return L.circleMarker(latlng, geojsonMarkerOptions);
        };

        var loadRessource = function (ressource) {

            var ressource_defaults = {
                title: '',
                type: 'geojson',
                style: default_style,
                template: default_template,
                pointToLayer: default_pointToLayer
            };

            ressource = jQuery.extend({}, ressource_defaults, ressource || {});

            obj.append(jQuery('<div class="geojson_loading_' + ressource.id + ' geojson_loading alert alert-info">' + ressource.title + ' - chargement en cours <i class="fa fa-spinner fa-spin"></i></div>'));
            jQuery.getJSON(ressource.url, function (data) {

                if (data.features.length > featurelength_limit) {
                    //console.warn('feature count excess: ' + data.features.length + ' (max:' + featurelength_limit + ')');
                    obj.find('.geojson_loading_' + ressource.id) /*.removeClass('alert-info').addClass('alert-warning').html('<strong><i class="fa fa-info-circle"></i> fichier trop important pour être chargé (>' + featurelength_limit + ' objets)</strong><br><a href="' + geojson_url + '">' + geojson_url + '</a>')*/ .slideUp('fast');
                    return false;
                }

                if (null === map) initMap();

                if (typeof ressource.style == 'string') {
                    try {
                        var f = eval(ressource.style);
                        if (typeof f == 'function') ressource.style = f;
                    } catch (err) {
                        console.log(err.message);
                    }
                }


                if (typeof ressource.template == 'string') {
                    if (jQuery(ressource.template).length) {
                        ressource.template = Handlebars.compile(
                            jQuery(ressource.template).first().html()
                        );
                    } else {
                        try {
                            var f = eval(ressource.template);
                            if (typeof f == 'function') ressource.template = f;
                        } catch (err) {
                            console.log(err.message);
                            ressource.template = Handlebars.compile(ressource.template);
                        }
                    }
                }

                if (typeof ressource.pointToLayer == 'string') {
                    try {
                        var f = eval(ressource.pointToLayer);
                        if (typeof f == 'function') ressource.pointToLayer = f;
                    } catch (err) {
                        console.log(err.message);
                    }
                }


                if (ressource.type == 'geojson') {
                    var layer = L.geoJson(data, {
                        onEachFeature: function (feature, layer) {
                            if (ressource.template) layer.bindPopup(ressource.template(feature, layer));
                        },
                        pointToLayer: function (feature, layer) {
                            if (ressource.pointToLayer) {
                                return ressource.pointToLayer(feature, layer, data.features.length);
                            }
                            return false;
                        },
                        style: ressource.style

                    });
                }

                layer.addTo(map);
                loadedLayers[ressource.title] = layer;

                updateBBoxAndLayerController();

                obj.find('.geojson_loading_' + ressource.id).slideUp('slow');
                return true;

            }).fail(function (data) {
                //console.warn("can't load GeoJson: " + geojson_url);
                obj.find('.geojson_loading_' + ressource.id) /*.removeClass('alert-info').addClass('alert alert-danger').html('<strong><i class="fa fa-warning"></i> impossible de charger le fichier</strong><br><a href="' + ressource.url + '">' + ressource.url + '</a>')*/ .slideUp('fast');

                return false;
            });
        }; // FIN loadRessource

        for (var i in options.ressources) {
            var ressource = options.ressources[i];
            loadRessource(ressource);
        }





        _uDataMap.map = map;
        return _uDataMap;
    }; // FIN uDataMap



    //*****************************************************





    var API_ROOT = "https://demo.data.gouv.fr/api/1/"; //!TODO get from div param
    //var API_ROOT = "https://www.data.gouv.fr/api/1/";
    var contentlength_limit = 2.5 * 1000000; //2.5Mo
    var icons_limit = 200;
    var featurelength_limit = 2000 * 100; //nb max d'objet geojson



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
            var v1 = v1.length;
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


        Handlebars.registerHelper('uppercase', function (passedString) {
            return passedString.toUpperCase();
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


        Handlebars.registerHelper('jsonencode', function (value) {

            return JSON.stringify(value, null, 4);
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
        if (container.length) {


            var orgs = _uData.container.data('organizations').split(',');
            var geozones_trans = {};

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


            updateGeozonesTrans = function () {


                container.find('.geozone-to-load').each(function () {

                    var obj = jQuery(this);
                    obj.removeClass('geozone-to-load').addClass('geozone-to-update');
                    var k = obj.data('addgeozone');

                    if (geozones_trans[k] == undefined) {
                        var url = API_ROOT + 'spatial/zone/' + k;
                        jQuery.getJSON(url, function (data) {
                            geozones_trans[data.id] = i18n.t(data.name) + ' <i>(' + data.code + ')</i>';
                            updateGeozonesTrans();
                        });
                    }
                });

                container.find('.geozone-to-update').each(function () {
                    var obj = jQuery(this);
                    var k = obj.data('addgeozone');
                    if (geozones_trans[k] != undefined) {
                        obj.removeClass('geozone-to-update');
                        obj.html(obj.html().replace(k, geozones_trans[k]));
                    }
                });
            };




            updateListLimit = function () {
                container.find('ul[data-limitlist]').each(function () {
                    var obj = jQuery(this);
                    var limit = obj.data('limitlist');
                    if (obj.find('>a').length > limit) {
                        obj.find('>a:nth-child(n+' + (limit + 1) + ')').hide();
                        var openlink = jQuery('<a href="#" class="list-group-item text-right">voir la suite</a>');
                        obj.find('>a:nth-child(' + (limit) + ')').after(openlink);
                        openlink.click(function (e) {
                            e.preventDefault();
                            obj.find('>a').slideDown();
                            jQuery(this).slideUp();


                        });
                    }

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
                    })
                    .on('click', '.datasetsForm button', function (e) {
                        e.preventDefault();
                        updateParams();
                        loadDataSets();
                    })
                    .on('change', '.datasetsForm *, .result-sort *', function (e) {
                        e.preventDefault();
                        updateParams();
                        loadDataSets();
                    })
                    .on('click', '.result-sort a.sortdirection', function (e) {
                        e.preventDefault();
                        sortDesc = !sortDesc;
                        updateParams();
                        loadDataSets();
                    })
                    .on('submit', '.datasetsForm form', function (e) {
                        e.preventDefault();
                        updateParams();
                        loadDataSets();
                    }).
                on('click', '.uData-shareLink a[href="#"]', function (e) {
                    jQuery('.uData-shareLink .hidden').removeClass('hidden').hide().slideDown('slow');
                    jQuery('.uData-shareLink  a[href="#"]').fadeOut();
                    e.preventDefault();
                })
                    .on('click', 'a[data-addTag]', function (e) {
                        var tag = jQuery(this).data('addtag');
                        e.preventDefault();
                        var tags = _uData.container.data('tags');
                        if (!Array.isArray(tags)) tags = [];
                        tags.push(tag);
                        _uData.container.data('tags', tags);
                        loadDataSets();
                    })
                    .on('click', 'a[data-addLicense]', function (e) {
                        var license = jQuery(this).data('addlicense');
                        e.preventDefault();
                        _uData.container.data('license', license);
                        loadDataSets();
                    })
                    .on('click', 'a[data-addGeozone]', function (e) {
                        var geozone = jQuery(this).data('addgeozone');
                        e.preventDefault();
                        _uData.container.data('geozone', geozone);
                        loadDataSets();
                    })
                    .on('click', 'a[data-addGranularity]', function (e) {
                        var granularity = jQuery(this).data('addgranularity');
                        e.preventDefault();
                        _uData.container.data('granularity', granularity);
                        loadDataSets();
                    })
                    .on('click', 'a[data-addFormat]', function (e) {
                        var format = jQuery(this).data('addformat');
                        e.preventDefault();
                        _uData.container.data('format', format);
                        loadDataSets();
                    })
                    .on('click', 'a[data-removeParam]', function (e) {
                        var paramName = jQuery(this).data('removeparam');
                        e.preventDefault();
                        _uData.container.removeData(paramName);
                        loadDataSets();
                    })
                    .on('click', 'a[data-removeTag]', function (e) {
                        e.preventDefault();
                        var tag = jQuery(this).data('removetag');
                        var tags = _uData.container.data('tags');
                        var index = jQuery.inArray(tag, tags);
                        if (index > -1) {
                            tags.splice(index, 1);
                        }
                        _uData.container.data('tags', tags);
                        loadDataSets();
                    });


                setPage(1);
                //loadDataSet('53698ed4a3a729239d203594');
            }
        }



        jQuery('.uData-map[data-ressources]').each(function () {
            uDataMap(jQuery(this), jQuery(this).data())
        });


    };

    var jsonfail = function () {
        _uData.container.html('<p class="error">Serveur ' + API_ROOT + ' injoignable</p>')
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