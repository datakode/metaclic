/*! 22-02-2017 */
var Metaclic, MetaclicUtils = {};

MetaclicUtils.baseLayers = {
    "OSM-Fr": {
        title: "OSM-Fr",
        url: "https://tilecache.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
    },
    Positron: {
        title: "Positron",
        url: "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
    },
    Outdoors_OSM: {
        title: "Outdoors (OSM)",
        url: "https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png"
    },
    OSM_Roads: {
        title: "OSM Roads",
        url: "https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}"
    },
    Dark_Matter: {
        title: "Dark Matter",
        url: "https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
    },
    OpenStreetMap: {
        title: "OpenStreetMap",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    },
    Toner: {
        title: "Toner",
        url: "https://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png"
    },
    Landscape: {
        title: "Landscape",
        url: "https://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png"
    },
    Transport: {
        title: "Transport",
        url: "https://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png"
    },
    MapQuest_Open: {
        title: "MapQuest Open",
        url: "https://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png"
    },
    HOTOSM_style: {
        title: "HOTOSM style",
        url: "https://tilecache.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    },
    OpenCycleMap: {
        title: "OpenCycleMap",
        url: "https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
    },
    Watercolor: {
        title: "Watercolor",
        url: "https://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png"
    },
    hikebikemap: {
        title: "hikebikemap",
        url: "https://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png"
    },
    "OSM-monochrome": {
        title: "OSM-monochrome",
        url: "https://www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png"
    },
    Hydda: {
        title: "Hydda",
        url: "https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
    },
    OpenTopoMap: {
        title: "OpenTopoMap",
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
    },
    OpenRiverboatMap: {
        title: "OpenRiverboatMap",
        url: "https://tilecache.openstreetmap.fr/openriverboatmap/{z}/{x}/{y}.png"
    }
}, MetaclicUtils.Templates = {}, MetaclicUtils.Templates.datasets = [ ' {{#ifCond sort "!=" false}}', '    <div class="result-sort"><label>Trier par</label>', '       <select name="sort" class="form-control">', "            {{#each sortTypes}}", '            {{#ifCond id "==" ../sort}}', '            <option value="{{id}}" selected>{{name}}</option>', "            {{else}}", '            <option value="{{id}}">{{name}}</option>', "            {{/ifCond}}", "            {{/each}}", "       </select>", '       <a href="#" class="sortdirection">', '            {{#ifCond sortDesc "==" true}}', '            <i class="fa fa-sort-alpha-desc"></i>', "            {{else}}", '            <i class="fa fa-sort-alpha-asc"></i>', "            {{/ifCond}}", "       </a>", "</div>", "{{/ifCond}}", '<div class="result-count">{{ total }} résultat(s)</div>', '<div class="metaclic-row">', '{{#ifCond facets "!=" undefined}}', '<div class="Metaclic-results">', "{{else}}", '<div class="Metaclic-results Metaclic-results-full">', "{{/ifCond}}", '    <ul class="search-results">', "        {{#each data}}", '        <li class="search-result dataset-result" data-dataset="{{id}}">', '            <a href="{{ page }}" title="{{  organization.name }}"  data-dataset="{{id}}">', "", '                <div class="result-logo">', '                    <img alt="" src="{{organization.logo}}" width="70" height="70">', "                </div>", "                    {{#if organization.public_service }}", '                        <img alt="certified"', '                            class="certified" rel="popover"', "                            data-title=\"{{_ 'certified_public_service'}}\"", "                            data-content=\"{{_ 'the_identity_of_this_public_service_public_is_certified_by_etalab'}}\"", '                            data-container="body" data-trigger="hover"/>', "                        {{/if}}", '                <div class="result-body">', '                    <h4 class="result-title">{{title}}</h4>', "", '                    <div class="result-description">', "                        {{mdshort description 128}}</div></div>", "", '                </a><ul class="result-infos">', "", "                    {{#if temporal_coverage }}", "                        <li>", '                            <span rel="tooltip"', '                                data-placement="top" data-container="body"', "                                title=\"{{_ 'temporal_coverage'}}\">", '                                <span class="fa fa-calendar fa-fw"></span>', "                                {{dt temporal_coverage.start format='L' }} {{_ 'to'}} {{dt temporal_coverage.end format='L' }}", "                            </span>", "                        </li>", "                    {{/if}}", "", "                    {{#if frequency }}", "                        <li>", '                            <span rel="tooltip"', '                                data-placement="top" data-container="body"', "                                title=\"{{_ 'Update frequency' }}\">", '                                <span class="fa fa-clock-o fa-fw"></span>', "                                {{_ frequency }}", "                            </span>", "                        </li>", "                    {{/if}}", "", "                    {{#if spatial.territories }}", "                        <li>", '                            <span rel="tooltip"', '                                data-placement="top" data-container="body"', "                                title=\"{{_ 'Spatial coverage'}}\">", '                                <span class="fa fa-map-marker fa-fw"></span>', "                                {{_ spatial.territories.0.name }}", "                            </span>", "                        </li>", "                    {{/if}}", "", "                    {{#if spatial.granularity }}", "                        <li>", '                            <span rel="tooltip"', '                                data-placement="top" data-container="body"', "                                title=\"{{_ 'Spatial granularity'}}\">", '                                <span class="fa fa-bullseye fa-fw"></span>', "                                {{_ spatial.granularity }}", "                            </span>", "                        </li>", "                    {{/if}}", "", "                    <li>", '                        <span rel="tooltip"', '                            data-placement="top" data-container="body"', "                            title=\"{{_ 'Reuses'}}\">", '                            <span class="fa fa-retweet fa-fw"></span>', "                            {{default metrics.reuses 0 }}", "                        </span>", "                    </li>", "", "                    <li>", '                        <span rel="tooltip"', '                            data-placement="top" data-container="body"', "                            title=\"{{_ 'Followers'}}\">", '                            <span class="fa fa-star fa-fw"></span>', "                            {{default metrics.followers 0 }}", "                        </span>", "                    </li>", "", "                </ul>", "        </li>", "    {{/each}}", "    </ul>", "</div>", '{{#ifCond facets "!=" undefined}}', '<div class="Metaclic-facets">', '{{#ifCond facets.organization "!=" undefined}}', "{{#if facets.organization}}", '<div class="facet-panel">', '    <div class="facet-panel-heading"><i class="fa fa-tags fa-fw"></i> Organisme</div>', "    <ul data-limitlist=5>", "       {{#each facets.organization}}", '       <a href="#" data-addID="{{this.[0]._id.$oid}}">', "       <span>{{this.[1]}}</span>", "       {{this.[0].name}}", "       </a>", "       {{/each}}", "    </ul>", "</div>", "{{/if}}", "{{/ifCond}}", '{{#ifCond facets.tag "!=" undefined}}', "{{#if facets.tag}}", '<div class="facet-panel">', '    <div class="facet-panel-heading"><i class="fa fa-tags fa-fw"></i> Tags</div>', "    <ul data-limitlist=5>", "       {{#each facets.tag}}", '       <a href="#" data-addTag="{{this.[0]}}">', "       <span>{{this.[1]}}</span>", "       {{this.[0]}}", "       </a>", "       {{/each}}", "    </ul>", "</div>", "{{/if}}", "{{/ifCond}}", '{{#ifCond facets.license "!=" undefined}}', "{{#if facets.license}}", '<div class="facet-panel">', '    <div class="facet-panel-heading"><i class="fa fa-copyright fa-fw"></i> Licences</div>', "    <ul data-limitlist=5>", "       {{#each facets.license}}", '       <a href="#" data-addLicense="{{this.[0]._id}}">', "       <span>{{this.[1]}}</span>", "       {{this.[0].title}}", "       </a>", "       {{/each}}", "    </ul>", "</div>", "{{/if}}", "{{/ifCond}}", '{{#ifCond facets.geozone "!=" undefined}}', "{{#if facets.geozone}}", '<div class="facet-panel">', '    <div class="facet-panel-heading"><i class="fa fa-map-marker fa-fw"></i> Couverture spatiale</div>', "    <ul data-limitlist=5>", "       {{#each facets.geozone}}", '       <a class="geozone-to-load" href="#" data-addGeozone="{{this.[0]._id}}">', "       <span>{{this.[1]}}</span>", "       {{this.[0]._id}} ({{this.[0].code}})", "       </a>", "       {{/each}}", "    </ul>", "</div>", "{{/if}}", "{{/ifCond}}", '{{#ifCond facets.granularity "!=" undefined}}', "{{#if facets.granularity}}", '<div class="facet-panel">', '    <div class="facet-panel-heading"><i class="fa fa-bullseye fa-fw"></i> Granularité territoriale</div>', "    <ul data-limitlist=5>", "       {{#each facets.granularity}}", '       <a href="#" data-addGranularity="{{this.[0]}}">', "       <span>{{this.[1]}}</span>", "       {{_ this.[0]}}", "       </a>", "       {{/each}}", "    </ul>", "</div>", "{{/if}}", "{{/ifCond}}", '{{#ifCond facets.format "!=" undefined}}', "{{#if facets.format}}", '<div class="facet-panel">', '    <div class="facet-panel-heading"><i class="fa fa-file fa-fw"></i> Formats</div>', "    <ul data-limitlist=5>", "       {{#each facets.format}}", '       <a href="#" data-addFormat="{{this.[0]}}">', "       <span>{{this.[1]}}</span>", "       {{_ this.[0]}}", "       </a>", "       {{/each}}", "    </ul>", "</div>", "{{/if}}", "{{/ifCond}}", "</div>", "{{/ifCond}}", "</div>", '        <div class="metaclic-pagination">', "            {{{ paginate page total page_size }}}", "        </div>" ], 
MetaclicUtils.Templates.dataset = [ '<div class="dataset" data-dataset="{{id}}">', "", "        <div class='dataset-info'>", "            <blockquote>{{md description }}</blockquote>", "             {{#if extras.remote_url}}", '            <a class="site_link" href="{{extras.remote_url}}" target=_blank>', "                Voir le site original", "            </a>", "             {{/if}}", '            <p class="published_on">', "                {{_ 'published_on' }} {{dt created_at}}", "                {{_ 'and_modified_on'}} {{dt last_modified}}", '                {{_ \'by\'}} <a title="{{organization.name}}" href="{{organization.page}}">{{organization.name}}</a>', "            </p>", "        </div>", "", '        <div class="resources-list">', "            <h3>{{_ 'Resources'}}</h3>", "            {{#each resources}}", '            <div data-checkurl="/api/1/datasets/checkurl/" itemtype="http://schema.org/DataDownload" itemscope="itemscope" id="resource-{{id}}">', "", '                <a href="{{url}}" data-size="{{filesize}}" data-format="{{uppercase format}}" data-map_title="{{../title}}" data-title="{{title}}" data-id="{{id}}" itemprop="url" target=_blank>', "                    <h4>", '                        <span data-format="{{uppercase format}}">', "                            {{uppercase format}}", "                        </span>", "                        {{title}}", "                        <p>", "                            Dernière modification le {{dt last_modified}}", "                        </p>", "                    </h4>", "                </a>", "", "            </div>", "            {{/each}}", "        </div>", "", '        <div class="meta">', "", '            <div class="producer">', "                <h3>{{_ 'Producer'}}</h3>", '                <a title="{{organization.name}}" href="{{organization.page}}">', '                    <img class="organization-logo producer" alt="{{organization.name}}" src="{{fulllogo organization.logo}}"><br>', '                    <span class="name">', "                        {{organization.name}}", "                    </span>", "                </a>", "            </div>", "", "", '            <div class="info">', "                <h3>{{_ 'Informations'}}</h3>", "                <ul>", '                    <li title="{{_ \'License\'}}" rel="tooltip">', '                        <i class="fa fa-copyright"></i>', '                        <!--a href="http://opendatacommons.org/licenses/odbl/summary/"-->', "                        {{_ license}}", "                        <!--/a-->", "                    </li>", '                    <li title="{{_ \'Frequency\'}}" rel="tooltip">', '                        <span class="fa fa-clock-o"></span>', "                        {{_ frequency}}", "                    </li>", '                    <li title="{{_ \'Spatial granularity\'}}"  rel="tooltip">', '                        <span class="fa fa-bullseye"></span>', "                        {{_ spatial.granularity}}", "                    </li>", "                </ul>", '                <ul class="spatial_zones">', "                    {{#each spatial.zones}}", '                    <li data-zone="{{.}}">{{.}}</li>', "                    {{/each}}", "               </ul>", '                <ul class="tags">', "                    {{#each tags}}", '                    <li><a title="{{.}}" href="https://www.data.gouv.fr/fr/search/?tag={{.}}">', "                        {{.}}", "                    </a>", "                </li>", "                {{/each}}", "            </ul>", "        </div>", "", "", "    </div>" ], 
MetaclicUtils.Templates.datasetsForm = [ '<div class="datasetsForm">', ' <form action="" method="get">', '    <input type="hidden" name="option" value="com_metaclic"></input>', '    <input type="hidden" name="view" value="metaclic"></input>', '    <div><label>&nbsp;</label><input type="text" name="q" value="{{q}}" placeholder="Rechercher des données" class="form-control"></input></div>', '        {{#ifCount orgs ">" 1 }}', "    <div>", "        {{else}}", '    <div class="hidden">', "        {{/ifCount}}", "       </div>", "    </form>", '    <div class="selected_facets">', '<ul class="tags">', "   {{#if organization}}", '   {{#ifNotall organization "|"}}', '       <li><a title="{{_ \'fermer\'}}" href="#" class="facet-remove facet-organization" data-removeOrganization="organization"> {{organization_name}} &times;</a></li>', "   {{/ifNotall}}", "   {{/if}}", "   {{#if tags}}", "   {{#each tags}}", '       <li><a title="{{_ \'fermer\'}}" href="#" class="facet-remove facet-tag" data-removeTag="{{.}}"><i class="fa fa-tags fa-fw"></i> {{.}} &times;</a></li>', "   {{/each}}", "   {{/if}}", "   {{#if license}}", '       <li><a title="{{_ \'fermer\'}}" href="#" class="facet-remove facet-license" data-removeParam="license"><i class="fa fa-copyright fa-fw"></i> {{license}} &times;</a></li>', "   {{/if}}", "   {{#if geozone}}", '       <li><a title="{{_ \'fermer\'}}" href="#" class="facet-remove facet-geozone" data-removeParam="geozone"><i class="fa fa-map-marker fa-fw"></i> {{geozone}} &times;</a></li>', "   {{/if}}", "   {{#if granularity}}", '       <li><a title="{{_ \'fermer\'}}" href="#" class="facet-remove facet-granularity" data-removeParam="granularity"><i class="fa fa-bullseye  fa-fw"></i> {{granularity}} &times;</a></li>', "   {{/if}}", "   {{#if format}}", '       <li><a title="{{_ \'fermer\'}}" href="#" class="facet-remove facet-format" data-removeParam="format"><i class="fa fa-file fa-fw"></i> {{format}} &times;</a></li>', "   {{/if}}", "   </div>", "   </ul>", "</div>", "    <br>" ], 
MetaclicUtils.Templates.lastdatasets = [ '<div class="Metaclic-lastdatasets">', "      {{#each data}}", '      <div class="card dataset-card">', '            <a class="card-logo" href="{{ organization.uri }}" target="datagouv">', '                <img alt="{{  organization.name }}" src="{{ organization.logo }}" width="70" height="70">', "            </a>", '        <div class="card-body">', "            <h4>", '                <a href="{{ url }}" title="{{title}}">', "                    {{title}}", "                </a>", "            </h4>", "        </div>", "        <footer>", "            <ul>", "                <li>", '                    <a rel="tooltip" data-placement="top" data-container="body" title="" data-original-title="Réutilisations">', '                        <span class="fa fa-retweet fa-fw"></span>', "                        {{default metrics.reuses 0 }}", "                    </a>", "                </li>", "                <li>", '                    <a rel="tooltip" data-placement="top" data-container="body" title="" data-original-title="Favoris">', '                        <span class="fa fa-star fa-fw"></span>', "                        {{default metrics.followers 0 }}", "                    </a>", "                </li>", "            </ul>", "        </footer>", '        <a href="{{ url }}" title="{{title}}">', "            {{trimString description}}", "        </a>", "        <footer>", "        <ul>", "            {{#if temporal_coverage }}", "            <li>", '                <a rel="tooltip"', '                    data-placement="top" data-container="body"', "                    title=\"{{_ 'Temporal coverage' }}\">", '                    <span class="fa fa-calendar fa-fw"></span>', "                    {{dt temporal_coverage.start format='L' }} {{_ 'to'}} {{dt temporal_coverage.end format='L' }}", "                </a>", "            </li>", "            {{/if}}", "", "            {{#if spatial.granularity }}", "            <li>", '                <a rel="tooltip"', '                    data-placement="top" data-container="body"', "                    title=\"{{_ 'Territorial coverage granularity' }}\">", '                    <span class="fa fa-bullseye fa-fw"></span>', "                    {{_ spatial.granularity }}", "                </a>", "            </li>", "            {{/if}}", "", "            {{#if frequency }}", "            <li>", '                <a rel="tooltip"', '                    data-placement="top" data-container="body"', "                    title=\"{{_ 'Frequency' }}\">", '                    <span class="fa fa-clock-o fa-fw"></span>', "                    {{_ frequency }}", "                </a>", "            </li>", "            {{/if}}", "        </ul>", "        </footer>", "    </div>", "    {{/each}}", "    </div>" ], 
MetaclicUtils.Templates.shareLink = [ '<div class="Metaclic-shareLink">', '<div class="linkDiv"><a href="#">intégrez cet outil de recherche sur votre site&nbsp;<i class="fa fa-share-alt"></i></a></div>', '<div class="hidden">', "   <h4>Vous pouvez intégrer cet outil de recherche de données sur votre site</h4>", "   <p>Pour ceci collez le code suivant dans le code HTML de votre page</p>", "   <pre>", "&lt;script&gt;window.jQuery || document.write(\"&lt;script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js'&gt;&lt;\\/script&gt;\")&lt;/script&gt;", "", "&lt;!-- chargement feuille de style font-awesome --&gt;", '&lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"&gt;', "", '&lt;script src="{{baseUrl}}metaclic.js"&gt;&lt;/script&gt;', '&lt;div class="Metaclic-data"', '   data-q="{{q}}"', '   data-organizations="{{organizationList}}"', '   data-organization="{{organization}}"', '   data-page_size="{{page_size}}"', "&gt&lt;/div&gt", "   </pre>", "   <p>vous pouvez trouver plus d'info sur cet outil et son paramétrage à cette adresse: <a href='https://github.com/datakode/metaclic' target='_blank'>https://github.com/datakode/metaclic</a></p>", "</div>", "</div>" ], 
MetaclicUtils.Templates.shareLinkMap = [ '<div class="MetaclicMap-shareLink">', '<div class="linkDiv"><a href="#">intégrez cette carte à votre site&nbsp;<i class="fa fa-share-alt"></i></a></div>', '<div class="hidden">', "   <h4>Vous pouvez intégrer cet carte sur votre site</h4>", "   <p>Pour ceci collez le code suivant dans le code HTML de votre page</p>", "   <pre>", "&lt;script&gt;window.jQuery || document.write(\"&lt;script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js'&gt;&lt;\\/script&gt;\")&lt;/script&gt;", "", '&lt;script src="{{baseUrl}}metaclic.js"&gt;&lt;/script&gt;', '&lt;div class="Metaclic-map"', "   data-resources='{{jsonencode resources}}'", "   data-title='{{title}}'", "&gt&lt;/div&gt", "   </pre>", "   <p>vous pouvez trouver plus d'info sur cet outil et son paramétrage à cette adresse: <a href='https://github.com/datakode/metaclic' target='_blank'>https://github.com/datakode/metaclic</a></p>", "</div>", "</div>" ], 
MetaclicUtils.Templates.li_resource = [ '<li data-id="{{id}}">', '<a href="{{metadata_url}}">{{title}}</a>', '<i class="fa fa-copyright"></i> {{_ license}}', '<p class="organization" data-id="{{organization.id}}" data-slug="{{organization.slug}}">', '<img alt="{{  organization.name }}" src="{{ organization.logo }}" width="70" height="70">', "<span>{{organization.name}}</span>", "</p>", "</li>" ], 
MetaclicUtils.urlify = function(text) {
    if ("string" != typeof text) return text;
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
};

var data_bool = !0;

jQuery(document).ready(function($) {
    var Templates = MetaclicUtils.Templates, sortTypes = [ {
        id: "title",
        name: "Titre"
    }, {
        id: "created",
        name: "Date de création"
    }, {
        id: "last_modified",
        name: "Date de dernière modification"
    }, {
        id: "followers",
        name: "Favoris"
    }, {
        id: "reuses",
        name: "Réutilisations"
    } ], sortDesc = !1, baseUrl = jQuery('script[src$="/metaclic.js"]')[0].src.replace("/metaclic.js", "/"), _Metaclic = {};
    Metaclic = function(obj, options) {
        options.baseUrl = baseUrl, options.organizationList = [], jQuery.each(_Metaclic.orgs, function(k, v) {
            "-1" == v.id.indexOf("|") && options.organizationList.push(v.id);
        }), options.organizationList = options.organizationList.join(","), "" == options.organization && (options.organization = _Metaclic.orgs[0].id);
        var scrollTop = function() {
            $("html, body").animate({
                scrollTop: jQuery("div.Metaclic-data").offset().top
            }, 250);
        };
        _Metaclic.displayLastDatasets = function() {}, _Metaclic.displayDatasets = function() {
            var options2 = jQuery.extend({}, options);
            "undefined" == typeof options2.sort && (options2.sort = sortTypes[0].id), "string" == typeof options2.sort && (options2.sort = options2.sort.replace("-", ""), 
            sortDesc && (options2.sort = "-" + options2.sort)), delete options2.organizations, 
            delete options2.sharelink, delete options2.sharemaps, delete options2.baseUrl, delete options2.organizationList, 
            void 0 != options2.tags && (options2.tag = options2.tags);
            var url = API_ROOT + "datasets/?" + jQuery.param(options2);
            url = url.replace(/tag%5B%5D/g, "tag"), jQuery.getJSON(url, function(data) {
                var params = {
                    q: options.q,
                    organization: options.organization,
                    orgs: _Metaclic.orgs,
                    sort: options.sort,
                    sortTypes: sortTypes,
                    sortDesc: sortDesc
                };
                void 0 != typeof options.tags && (params.tags = options.tags), void 0 != typeof options.license && (params.license = options.license), 
                void 0 != typeof options.organization_name && (params.organization_name = options.organization_name), 
                void 0 != typeof options.geozone && (params.geozone = options.geozone), void 0 != typeof options.granularity && (params.granularity = options.granularity), 
                void 0 != typeof options.format && (params.format = options.format), data.sort = options.sort, 
                "string" == typeof data.sort && (data.sort = data.sort.replace("-", "")), data.sortDesc = sortDesc, 
                data.sortTypes = sortTypes;
                var html = Templates.datasetsForm(params) + Templates.datasets(data);
                options.sharelink && (html += Templates.shareLink(options)), obj.html(html), updateGeozonesTrans(), 
                updateListLimit(), scrollTop();
            }).fail(function() {
                obj.html('<p class="error">Serveur ' + API_ROOT + " injoignable</p>");
            });
        };
        var addSpatialZoneMap = function(dataset) {
            var bloc = obj.find('.dataset-result[data-dataset="' + options.dataset + '"]'), zones_li = bloc.find("ul.spatial_zones li");
            bloc.find("ul.spatial_zones").hide();
            var list = [], style = function(feature) {
                return {
                    weight: 1,
                    opacity: 1,
                    fillOpacity: .25
                };
            };
            if (zones_li.each(function() {
                list.push(jQuery(this).data("zone"));
            }), list.length) {
                var url = API_ROOT + "spatial/zones/" + list.join(",");
                bloc.find(".info").append(jQuery('<h3>Couverture spatiale</h3><div class="spatial_zones"><div class="map map_zones" id="map' + options.dataset + '_zones"></div></div>'));
                var map = L.map("map" + options.dataset + "_zones", {
                    scrollWheelZoom: !1
                }).setView([ 0, 0 ], 1);
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map), jQuery.getJSON(url, function(data) {
                    var layer = L.geoJson(data, {
                        onEachFeature: function(feature, layer) {
                            var html = "<h4>" + feature.properties.name + "</h4>" + feature.properties.population + " habitants";
                            layer.bindPopup(html);
                        },
                        style: style
                    }).addTo(map);
                    map.fitBounds(layer.getBounds());
                });
            }
        }, addPreviewMap = function(dataset_id, datasetdata) {
            var bloc = obj.find('.dataset-result[data-dataset="' + dataset_id + '"]'), geojson_links = bloc.find('.resources-list a[data-format="JSON"],.resources-list a[data-format="GEOJSON"]');
            geojson_links.each(function() {
                var geojson_link = jQuery(this), map_title = geojson_link.data("map_title"), resource_id = geojson_link.data("id"), mapOptions = (geojson_link.prop("href"), 
                {
                    resources: [ {
                        id: resource_id,
                        dataset: dataset_id
                    } ],
                    title: map_title,
                    sharelink: !0,
                    leaflet_map_options: {
                        scrollWheelZoom: !1
                    }
                });
                MetaclicMap(geojson_link.closest("div"), mapOptions, datasetdata);
            });
        };
        return _Metaclic.displayDataset = function() {
            var url = API_ROOT + "datasets/" + options.dataset + "/";
            jQuery.getJSON(url, function(data) {
                obj.find('.dataset-result[data-dataset="' + options.dataset + '"]').append(jQuery(Templates.dataset(data))), 
                obj.find('div.dataset[data-dataset="' + options.dataset + '"] ').hide().slideDown("slow"), 
                addSpatialZoneMap(options.dataset), addPreviewMap(options.dataset, data);
            }).fail(function() {
                obj.find('.dataset-result[data-dataset="' + options.dataset + '"]').append('<p class="error">Serveur www.data.gouv.fr injoignable</p>');
            });
        }, _Metaclic;
    }, MetaclicMap = function(obj, ori_options, datasetdata) {
        var _MetaclicMap = {}, defaults = {
            title: !1,
            sharelink: !1,
            resources: [],
            leaflet_map_options: {},
            background_layers: [ "OpenStreetMap", "MapQuest_Open", "OpenTopoMap" ]
        }, backgroundLayers = [], loadedLayers = [];
        options = jQuery.extend({}, defaults, ori_options || {});
        var map = null;
        _MetaclicMap.addBackground = function(title, layer, show) {
            backgroundLayers[title] = layer, show === !0 && layer.addTo(map), updateBBoxAndLayerController();
        };
        var initMap = function() {
            obj.append(jQuery('<div class="geojson_preview card card-5"><div class="map map_preview"></div>' + (options.title ? "<h4>" + options.title + "</h4>" : "") + '<ul class="resources"></ul></div>')), 
            map = L.map(obj.find(".map")[0], options.leaflet_map_options).setView([ 0, 0 ], 1), 
            map.attributionControl.setPrefix(""), map.layerController = L.control.layers(backgroundLayers, loadedLayers).addTo(map);
            for (var i in options.background_layers) {
                var bl = options.background_layers[i];
                if ("string" == typeof bl) if (void 0 != MetaclicUtils.baseLayers[bl]) bl = MetaclicUtils.baseLayers[bl]; else try {
                    bl = eval(bl);
                } catch (err) {
                    console.log(err.message);
                }
                var l = L.tileLayer(bl.url), t = bl.title;
                _MetaclicMap.addBackground(t, l, 0 == i);
            }
            if (options.sharelink) {
                ori_options.baseUrl = baseUrl, Template_shareLink = Templates.shareLinkMap;
                var html = Template_shareLink(ori_options);
                obj.find(".geojson_preview").append(html), obj.on("click", '.MetaclicMap-shareLink a[href="#"]', function(e) {
                    jQuery(".MetaclicMap-shareLink .hidden").removeClass("hidden").hide().slideDown("slow"), 
                    jQuery('.MetaclicMap-shareLink  a[href="#"]').fadeOut(), e.preventDefault();
                });
            }
        }, updateBBoxAndLayerController = function() {
            var bounds = null;
            for (var i in loadedLayers) bounds = null === bounds ? loadedLayers[i].getBounds() : bounds.extend(loadedLayers[i].getBounds());
            null != bounds && map.fitBounds(bounds), map.layerController.removeFrom(map), map.layerController = L.control.layers(backgroundLayers, loadedLayers).addTo(map);
        }, default_style = function(feature) {
            return {
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: .5
            };
        }, default_template = function(feature) {
            var html = "";
            return jQuery.each(feature.properties, function(k, v) {
                html += "<tr><th>" + k + "</th><td>" + MetaclicUtils.urlify(v) + "</td></tr>";
            }), html = '<table class="table table-hover table-bordered">' + html + "</table>";
        }, default_pointToLayer = function(feature, latlng, f_marker, featuresCount) {
            if (featuresCount < icons_limit) return f_marker(feature, latlng);
            var geojsonMarkerOptions = {
                radius: 3
            };
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }, default_marker = function(feature, latlng) {
            return L.marker(latlng);
        }, addResource = function(resource, data_dataset) {
            jQuery.each(data_dataset.resources, function(k, val) {
                val.id == resource.id && (resource.data = val, resource.metadata_url = data_dataset.page, 
                resource.title = val.title, resource.license = data_dataset.license, resource.organization = data_dataset.organization);
            }), obj.find(".geojson_loading_" + resource.id).remove(), obj.append(jQuery('<div class="geojson_loading_' + resource.id + ' geojson_loading alert alert-info">' + resource.title + ' - chargement en cours <i class="fa fa-spinner fa-spin"></i></div>')), 
            jQuery.getJSON(resource.data.url, function(data) {
                if (data.features.length > featurelength_limit) return obj.find(".geojson_loading_" + resource.id).slideUp("fast"), 
                !1;
                if (null === map && initMap(), "string" == typeof resource.style) try {
                    var f = eval(resource.style);
                    "function" == typeof f && (resource.style = f);
                } catch (err) {
                    console.log(err.message);
                }
                if ("string" == typeof resource.marker) try {
                    var f = eval(resource.marker);
                    "function" == typeof f && (resource.marker = f);
                } catch (err) {
                    console.log(err.message);
                }
                if ("string" == typeof resource.template) if (jQuery(resource.template).length) resource.template = Handlebars.compile(jQuery(resource.template).first().html()); else try {
                    var f = eval(resource.template);
                    "function" == typeof f && (resource.template = f);
                } catch (err) {
                    console.log(err.message), resource.template = Handlebars.compile(resource.template);
                }
                if ("string" == typeof resource.pointToLayer) try {
                    var f = eval(resource.pointToLayer);
                    "function" == typeof f && (resource.pointToLayer = f);
                } catch (err) {
                    console.log(err.message);
                }
                if ("JSON" == resource.data.format.toUpperCase() || "GEOJSON" == resource.data.format.toUpperCase()) var layer = L.geoJson(data, {
                    onEachFeature: function(feature, layer) {
                        resource.template && layer.bindPopup(resource.template(feature, layer));
                    },
                    pointToLayer: function(feature, layer) {
                        return !!resource.pointToLayer && resource.pointToLayer(feature, layer, resource.marker, data.features.length);
                    },
                    style: resource.style
                });
                return layer.addTo(map), loadedLayers[resource.title] = layer, updateBBoxAndLayerController(), 
                obj.find("ul.resources").append(Templates.li_resource(resource)), obj.find(".geojson_loading_" + resource.id).slideUp("slow"), 
                !0;
            }).fail(function(data) {
                return obj.find(".geojson_loading_" + resource.id).slideUp("fast"), !1;
            });
        }, loadResource = function(resource) {
            var resource_defaults = {
                id: null,
                dataset: null,
                style: default_style,
                template: default_template,
                pointToLayer: default_pointToLayer,
                marker: default_marker
            };
            if (resource = jQuery.extend({}, resource_defaults, resource || {}), null != datasetdata && datasetdata.id == resource.dataset) addResource(resource, datasetdata); else {
                obj.append(jQuery('<div class="geojson_loading_' + resource.id + ' geojson_loading alert alert-info">' + resource.id + ' - chargement en cours <i class="fa fa-spinner fa-spin"></i></div>'));
                var api_dataset_url = API_ROOT + "datasets/" + resource.dataset + "/";
                jQuery.getJSON(api_dataset_url, function(datasetdata) {
                    addResource(resource, datasetdata);
                }).fail(function(data) {
                    return obj.find(".geojson_loading_" + resource.id).slideUp("fast"), !1;
                });
            }
        };
        for (var i in options.resources) {
            var resource = options.resources[i];
            loadResource(resource);
        }
        return _MetaclicMap.map = map, _MetaclicMap;
    };
    var API_ROOT = "https://www.data.gouv.fr/api/1/", contentlength_limit = 25e5, icons_limit = 200, featurelength_limit = 2e5, checklibs = function() {
        var dependences = {
            Handlebars: "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.2/handlebars.min.js",
            i18n: "https://cdnjs.cloudflare.com/ajax/libs/i18next/1.6.3/i18next-1.6.3.min.js",
            moment: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js",
            marked: "https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js",
            L: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"
        }, css = {
            L: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css"
        }, ready = !0;
        for (var i in css) 0 == jQuery('link[href="' + css[i] + '"]').length && jQuery('<link type="text/css" href="' + css[i] + '" rel="stylesheet">').appendTo("head");
        for (var i in dependences) "undefined" == typeof window[i] && (0 == jQuery('script[src="' + dependences[i] + '"]').length && jQuery('<script src="' + dependences[i] + '"></script>').appendTo("body"), 
        ready = !1);
        ready ? start() : setTimeout(checklibs, 100);
    }, start = function() {
        var container = _Metaclic.container;
        _Metaclic.lang = lang = "fr", i18n.init({
            resGetPath: baseUrl + "../locales/metaclic." + lang + ".json",
            lng: lang,
            load: "unspecific",
            interpolationPrefix: "{",
            interpolationSuffix: "}",
            fallbackLng: !1,
            fallbackOnEmpty: !0,
            fallbackOnNull: !0,
            nsseparator: "::",
            keyseparator: "$$"
        }, function(err, t) {}), moment.locale("fr", {
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
                nextDay: "[Demain à] LT",
                nextWeek: "dddd [à] LT",
                lastDay: "[Hier à] LT",
                lastWeek: "dddd [dernier à] LT",
                sameElse: "L"
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
            ordinal: function(number) {
                return number + (1 === number ? "er" : "ème");
            },
            meridiemParse: /PD|MD/,
            isPM: function(input) {
                return "M" === input.charAt(0);
            },
            meridiem: function(hours, minutes, isLower) {
                return hours < 12 ? "PD" : "MD";
            },
            week: {
                dow: 1,
                doy: 4
            }
        }), moment.locale(lang), Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {
            switch (operator) {
              case "==":
                return v1 == v2 ? options.fn(this) : options.inverse(this);

              case "!=":
                return v1 != v2 ? options.fn(this) : options.inverse(this);

              case "===":
                return v1 === v2 ? options.fn(this) : options.inverse(this);

              case "<":
                return v1 < v2 ? options.fn(this) : options.inverse(this);

              case "<=":
                return v1 <= v2 ? options.fn(this) : options.inverse(this);

              case ">":
                return v1 > v2 ? options.fn(this) : options.inverse(this);

              case ">=":
                return v1 >= v2 ? options.fn(this) : options.inverse(this);

              case "&&":
                return v1 && v2 ? options.fn(this) : options.inverse(this);

              case "||":
                return v1 || v2 ? options.fn(this) : options.inverse(this);

              default:
                return options.inverse(this);
            }
        }), Handlebars.registerHelper("ifCount", function(v1, operator, v2, options) {
            var v1 = v1.length;
            switch (operator) {
              case "==":
                return v1 == v2 ? options.fn(this) : options.inverse(this);

              case "!=":
                return v1 != v2 ? options.fn(this) : options.inverse(this);

              case "===":
                return v1 === v2 ? options.fn(this) : options.inverse(this);

              case "<":
                return v1 < v2 ? options.fn(this) : options.inverse(this);

              case "<=":
                return v1 <= v2 ? options.fn(this) : options.inverse(this);

              case ">":
                return v1 > v2 ? options.fn(this) : options.inverse(this);

              case ">=":
                return v1 >= v2 ? options.fn(this) : options.inverse(this);

              case "&&":
                return v1 && v2 ? options.fn(this) : options.inverse(this);

              case "||":
                return v1 || v2 ? options.fn(this) : options.inverse(this);

              default:
                return options.inverse(this);
            }
        }), Handlebars.registerHelper("ifNotall", function(v1, v2, options) {
            return "-1" == v1.indexOf(v2) ? options.fn(this) : options.inverse(this);
        }), Handlebars.registerHelper("paginate", function(n, total, page_size) {
            var res = "", nPage = Math.ceil(total / page_size);
            if (1 == nPage) return "";
            for (var i = 1; i <= nPage; ++i) res += "<li" + (i == n ? ' class="active"' : "") + ">", 
            res += '<a href="#" data-page=' + i + ">" + i + "</a></li>";
            return '<nav><ul class="pagination">' + res + "</ul></nav>";
        }), Handlebars.registerHelper("taglist", function(tags) {
            var res = "";
            for (var i in tags) res += "<span class='label label-primary' >" + tags[i] + "</span> ";
            return res;
        }), Handlebars.registerHelper("trimString", function(passedString) {
            if (passedString.length > 150) {
                var theString = passedString.substring(0, 150) + "...";
                return new Handlebars.SafeString(theString);
            }
            return passedString;
        }), Handlebars.registerHelper("uppercase", function(passedString) {
            return passedString.toUpperCase();
        }), Handlebars.registerHelper("truncate", function(str, len) {
            if (str && str.length > len && str.length > 0) {
                var new_str = str + " ";
                return new_str = str.substr(0, len), new_str = str.substr(0, new_str.lastIndexOf(" ")), 
                new_str = new_str.length > 0 ? new_str : str.substr(0, len), new Handlebars.SafeString(new_str + "...");
            }
            return str;
        }), Handlebars.registerHelper("default", function(value, defaultValue) {
            return null != value ? value : defaultValue;
        }), Handlebars.registerHelper("dt", function(value, options) {
            return moment(value).format(options.hash.format || "LLL");
        }), Handlebars.registerHelper("placeholder", function(url, type) {
            return url ? url : baseUrl + "../img/placeholders/" + type + ".png";
        }), Handlebars.registerHelper("_", function(value, options) {
            if (!value || "string" != typeof value) return "";
            options.hash.defaultValue = "???";
            var res = i18n.t(value, options.hash);
            return "???" == res && (value = value.charAt(0).toLowerCase() + value.slice(1), 
            res = i18n.t(value, options.hash), res = res.charAt(0).toUpperCase() + res.slice(1)), 
            "???" == res && (value = value.charAt(0).toUpperCase() + value.slice(1), res = i18n.t(value, options.hash), 
            res = res.charAt(0).toLowerCase() + res.slice(1)), "???" == res ? (console.info('i18n "' + value + '" NOT FOUND'), 
            value) : res;
        }), Handlebars.registerHelper("md", function(value) {
            return new Handlebars.SafeString(marked(value));
        }), Handlebars.registerHelper("mdshort", function(value, length) {
            if (value) {
                var EXCERPT_TOKEN = "<!--- --- -->", DEFAULT_LENGTH = 128;
                "undefined" == typeof length && (length = DEFAULT_LENGTH);
                var text, ellipsis;
                return value.indexOf("<!--- excerpt -->") && (value = value.split(EXCERPT_TOKEN, 1)[0]), 
                ellipsis = value.length >= length ? "..." : "", text = marked(value.substring(0, length) + ellipsis), 
                text = text.replace("<a ", "<span ").replace("</a>", "</span>"), new Handlebars.SafeString(text);
            }
        }), Handlebars.registerHelper("theme", function(value) {
            return new Handlebars.SafeString(baseUrl + "" + value);
        }), Handlebars.registerHelper("fulllogo", function(value) {
            return new Handlebars.SafeString(value);
        }), Handlebars.registerHelper("jsonencode", function(value) {
            return JSON.stringify(value, null, 4);
        });
        for (var tmpl in Templates) {
            var template_surcharge_id = "metaclic_template_" + tmpl;
            console.info("load template: #" + template_surcharge_id);
            var t = jQuery("#" + template_surcharge_id).first();
            t.length ? (Templates[tmpl] = t.html(), console.info("loaded.")) : console.info("not found, use default template."), 
            "string" != typeof Templates[tmpl] && (Templates[tmpl] = Templates[tmpl].join("\n")), 
            Templates[tmpl] = Handlebars.compile(Templates[tmpl]);
        }
        if (window._Metaclic = {}, container = _Metaclic.container = jQuery("div.Metaclic-data[data-organizations]"), 
        container.length) {
            var orgs = _Metaclic.container.data("organizations").split(","), geozones_trans = {};
            _Metaclic.container.html('<p class="loading">chargement en cours</p>');
            for (var i in orgs) getOrganizationName(orgs[i]);
            _Metaclic.container.data("organizations", ""), _Metaclic.orgs = [];
            for (var i in orgs) _Metaclic.orgs.push({
                id: orgs[i],
                name: orgs[i]
            });
            container.each(function() {
                var obj = jQuery(this), ud = Metaclic(obj, obj.data());
                ud.displayLastDatasets();
            });
            var loadDataSets = function() {
                container.each(function() {
                    var obj = jQuery(this), ud = Metaclic(obj, obj.data());
                    ud.displayDatasets();
                });
            };
            updateGeozonesTrans = function() {
                container.find(".geozone-to-load").each(function() {
                    var obj = jQuery(this);
                    obj.removeClass("geozone-to-load").addClass("geozone-to-update");
                    var k = obj.data("addgeozone");
                    if (void 0 == geozones_trans[k]) {
                        var url = API_ROOT + "spatial/zone/" + k;
                        jQuery.getJSON(url, function(data) {
                            geozones_trans[data.id] = i18n.t(data.properties.name) + " <i>(" + data.properties.code + ")</i>", 
                            updateGeozonesTrans();
                        });
                    }
                }), container.find(".geozone-to-update").each(function() {
                    var obj = jQuery(this), k = obj.data("addgeozone");
                    void 0 != geozones_trans[k] && (obj.removeClass("geozone-to-update"), obj.html(obj.html().replace(k, geozones_trans[k])));
                });
            }, updateListLimit = function() {
                container.find("ul[data-limitlist]").each(function() {
                    var obj = jQuery(this), limit = obj.data("limitlist");
                    if (obj.find(">a").length > limit) {
                        obj.find(">a:nth-child(n+" + (limit + 1) + ")").hide();
                        var openlink = jQuery('<a href="#" class="see-all">voir la suite</a>');
                        obj.find(">a:nth-child(" + limit + ")").after(openlink), openlink.click(function(e) {
                            e.preventDefault(), obj.find(">a").slideDown(), jQuery(this).slideUp();
                        });
                    }
                });
            };
            var loadDataSet = function(id) {
                jQuery('div.dataset[data-dataset="' + id + '"]').length ? jQuery('div.dataset[data-dataset="' + id + '"] ').slideToggle() : container.each(function() {
                    var obj = jQuery(this), ud = Metaclic(obj, {
                        dataset: id
                    });
                    ud.displayDataset();
                });
            }, updateParams = function() {
                var q = container.find('.datasetsForm input[name="q"]').val();
                _Metaclic.container.data("q", q);
                var organization = container.find('.datasetsForm select[name="organizations"] option:selected').val();
                _Metaclic.container.data("organization", organization);
                var sort = container.find('.result-sort select[name="sort"] option:selected').val();
                _Metaclic.container.data("sort", sort), _Metaclic.container.data("page", 1);
            };
            if (jQuery("div.Metaclic-data").length) {
                var container = jQuery("div.Metaclic-data"), setPage = function(p) {
                    container.data("page", p);
                    var organization = jQuery(this).data("addid");
                    if ("undefined" == typeof organization) {
                        var options = _Metaclic.container.data(), exp = /,/g, test = options.organizationList.replace(exp, "|");
                        organization = test, _Metaclic.container.data("organization", organization);
                    }
                    loadDataSets();
                };
                container.on("click", "a[data-page]", function(e) {
                    e.preventDefault(), setPage(jQuery(this).data("page"));
                }).on("click", "a[data-dataset]", function(e) {
                    e.preventDefault(), loadDataSet(jQuery(this).data("dataset"));
                }).on("click", "a.reloadDataSets", function(e) {
                    e.preventDefault(), loadDataSets();
                }).on("click", ".datasetsForm button", function(e) {
                    e.preventDefault(), updateParams(), loadDataSets();
                }).on("change", ".datasetsForm .form-control", function(e) {
                    e.preventDefault(), updateParams(), loadDataSets();
                }).on("click", ".result-sort a.sortdirection", function(e) {
                    e.preventDefault(), sortDesc = !sortDesc, updateParams(), loadDataSets();
                }).on("submit", ".datasetsForm form", function(e) {
                    e.preventDefault(), updateParams(), loadDataSets();
                }).on("click", '.Metaclic-shareLink a[href="#"]', function(e) {
                    jQuery(".Metaclic-shareLink .hidden").removeClass("hidden").hide().slideDown("slow"), 
                    jQuery('.Metaclic-shareLink  a[href="#"]').fadeOut(), e.preventDefault();
                }).on("click", "a[data-addId]", function(e) {
                    var organization = jQuery(this).data("addid");
                    e.preventDefault(), $.each(_Metaclic.orgs, function(index, value) {
                        value.id == organization && _Metaclic.container.data("organization_name", value.name);
                    }), _Metaclic.container.data("organization", organization), loadDataSets();
                }).on("click", "a[data-addTag]", function(e) {
                    var tag = jQuery(this).data("addtag");
                    e.preventDefault();
                    var tags = _Metaclic.container.data("tags");
                    Array.isArray(tags) || (tags = []);
                    for (var unique = !0, index = 0; index < tags.length; index++) {
                        var element = tags[index];
                        element == tag && (unique = !1);
                    }
                    unique && (tags.push(tag), _Metaclic.container.data("tags", tags), loadDataSets());
                }).on("click", "a[data-addLicense]", function(e) {
                    var license = jQuery(this).data("addlicense");
                    e.preventDefault(), _Metaclic.container.data("license", license), loadDataSets();
                }).on("click", "a[data-addGeozone]", function(e) {
                    var geozone = jQuery(this).data("addgeozone");
                    e.preventDefault(), _Metaclic.container.data("geozone", geozone), loadDataSets();
                }).on("click", "a[data-addGranularity]", function(e) {
                    var granularity = jQuery(this).data("addgranularity");
                    e.preventDefault(), _Metaclic.container.data("granularity", granularity), loadDataSets();
                }).on("click", "a[data-addFormat]", function(e) {
                    var format = jQuery(this).data("addformat");
                    e.preventDefault(), _Metaclic.container.data("format", format), loadDataSets();
                }).on("click", "a[data-removeParam]", function(e) {
                    var paramName = jQuery(this).data("removeparam");
                    e.preventDefault(), _Metaclic.container.removeData(paramName), loadDataSets();
                }).on("click", "a[data-removeOrganization]", function(e) {
                    jQuery(this).data("removeorganization");
                    e.preventDefault();
                    var organization = jQuery(this).data("addid"), options = _Metaclic.container.data(), exp = /,/g;
                    organization = options.organizationList.replace(exp, "|"), _Metaclic.container.data("organization", organization), 
                    loadDataSets();
                }).on("click", "a[data-removeTag]", function(e) {
                    e.preventDefault();
                    var tag = jQuery(this).data("removetag"), tags = _Metaclic.container.data("tags"), index = jQuery.inArray(tag, tags);
                    index > -1 && tags.splice(index, 1), _Metaclic.container.data("tags", tags), loadDataSets();
                }), setPage(1);
            }
        }
        jQuery(".Metaclic-map[data-resources]").each(function() {
            MetaclicMap(jQuery(this), jQuery(this).data());
        });
    }, jsonfail = function() {
        _Metaclic.container.html('<p class="error">Serveur ' + API_ROOT + " injoignable</p>");
    }, getOrganizationName = function(org) {
        var url = API_ROOT + "organizations/" + org + "/";
        jQuery.getJSON(url, function(data) {
            for (var i in _Metaclic.orgs) {
                var o = _Metaclic.orgs[i];
                o.id == data.id && (_Metaclic.orgs[i] = data);
            }
            _Metaclic.orgs.sort(function(a, b) {
                return a.name > b.name ? 1 : -1;
            }), options = _Metaclic.container.data();
            var params = {
                q: options.q,
                organization: options.organization,
                orgs: _Metaclic.orgs,
                sort: options.sort,
                sortTypes: sortTypes,
                sortDesc: sortDesc
            }, html = Templates.datasetsForm(params);
            jQuery(".datasetsForm").replaceWith(html);
        }).fail(jsonfail);
    };
    0 == jQuery('link[href$="metaclic.css"]').length && jQuery('<link type="text/css" href="' + baseUrl + 'metaclic.css" rel="stylesheet">').appendTo("head"), 
    checklibs();
});