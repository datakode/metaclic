/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var data_bool = true;



jQuery(document).ready(function($) {

    var Templates = MetaclicUtils.Templates;

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






    var baseUrl = jQuery('script[src$="/metaclic.js"]')[0].src.replace('/metaclic.js', '/');

    var _Metaclic = {};


    Metaclic = function(obj, options) {

        //La

        options.baseUrl = baseUrl;
        options.organizationList = [];
        jQuery.each(_Metaclic.orgs, function(k, v) {
            if (v.id.indexOf("|") == "-1") {
                options.organizationList.push(v.id);
            }
        });
        console.log(options.organizationList);
        options.organizationList = options.organizationList.join(',');
        
        if (options.organization == '') {
            options.organization = _Metaclic.orgs[0].id;
        }

        var scrollTop = function() {
            $('html, body').animate({
                scrollTop: jQuery('div.Metaclic-data').offset().top
            }, 250);
        }


        _Metaclic.displayLastDatasets = function() {
            /*  var url = API_ROOT + 'datasets/?sort=-created&' + jQuery.param(options);
            jQuery.getJSON(url, function (data) {
                obj.html(Templates.lastdatasets(data));
            });*/
        };

        _Metaclic.displayDatasets = function() {            
            var options2 = jQuery.extend({}, options);

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

            console.log(options2.organization);
            if(!options2.organization){
                var params = {
                    q: options.q,
                    organization: options.organization,
                    orgs: _Metaclic.orgs,
                    sort: options.sort,
                    sortTypes: sortTypes,
                    sortDesc: sortDesc,
                };
                var html = Templates.datasetsForm(params);

                if (options.sharelink) {
                    html += Templates.shareLink(options);
                }

                obj.html(html);
                updateGeozonesTrans();
                updateListLimit();
                scrollTop();
                return false;
            }
            var url = API_ROOT + 'datasets/?' + jQuery.param(options2);
            url = url.replace(/tag%5B%5D/g, 'tag'); // ! a corriger dans l'API pour gerer des vrais get array
            jQuery.getJSON(url, function(data) {
            
            

                var params = {
                    q: options.q,
                    organization: options.organization,
                    orgs: _Metaclic.orgs,
                    sort: options.sort,
                    sortTypes: sortTypes,
                    sortDesc: sortDesc,
                };


                if (typeof options.tags != undefined) params.tags = options.tags;

                if (typeof options.license != undefined) params.license = options.license;

                if (typeof options.organization_name != undefined) params.organization_name = options.organization_name;

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

                obj.html(html);
                updateGeozonesTrans();
                updateListLimit();
                scrollTop();
            }).fail(function() {
                obj.html('<p class="error">Serveur ' + API_ROOT + ' injoignable</p>');
            });
        };

        var addSpatialZoneMap = function(dataset) {

            var bloc = obj.find('.dataset-result[data-dataset="' + options.dataset + '"]');
            var zones_li = bloc.find('ul.spatial_zones li');
            bloc.find('ul.spatial_zones').hide();
            var list = [];
            var style = function(feature) {
                return {
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.25
                };
            };

            zones_li.each(function() {
                list.push(jQuery(this).data('zone'));
            });
            if (list.length) {
                var url = API_ROOT + 'spatial/zones/' + list.join(',');
                bloc.find('.info').append(jQuery('<h3>Couverture spatiale</h3><div class="spatial_zones"><div class="map map_zones" id="map' + options.dataset + '_zones"></div></div>'));
                var map = L.map('map' + options.dataset + '_zones', {
                    scrollWheelZoom: false
                }).setView([0, 0], 1);
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
                    attribution: ' &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' 
                }).addTo(map);
                jQuery.getJSON(url, function(data) {
                    var layer = L.geoJson(data, {
                        onEachFeature: function(feature, layer) {
                            var html = '<h4>' + feature.properties.name + '</h4>' + feature.properties.population + ' habitants'
                            layer.bindPopup(html);
                        },
                        style: style
                    }).addTo(map);
                    map.fitBounds(layer.getBounds());
                });

            }
        }
        var addPreviewMap = function(dataset_id, datasetdata) {
            var bloc = obj.find('.dataset-result[data-dataset="' + dataset_id + '"]');
            var geojson_links = bloc.find('.resources-list a[data-format="JSON"],.resources-list a[data-format="GEOJSON"]');

            geojson_links.each(function() {
                var geojson_link = jQuery(this);
                var map_title = geojson_link.data('map_title');
                var resource_id = geojson_link.data('id');
                var geojson_url = geojson_link.prop('href');

                /*

-----------------------------------------
DESACTIVATION CHECKURL (car probleme API)
-----------------------------------------


                var url = API_ROOT + 'datasets/checkurl/?url=' + encodeURIComponent(geojson_url) + '&group=' + dataset_id;


                jQuery.getJSON(url, function (data) {
                    var contentlength = parseInt(data['content-length']);
                    // console.log(contentlength); // que faire des NaN ???
                    if (isNaN(contentlength) || contentlength <= contentlength_limit) {

*/
                var mapOptions = {
                    resources: [{
                        id: resource_id,
                        dataset: dataset_id
                    }],

                    title: map_title,
                    sharelink: true,

                    leaflet_map_options: {
                        scrollWheelZoom: false
                    }
                }

                MetaclicMap(geojson_link.closest('div'), mapOptions, datasetdata);
                /*

-----------------------------------------
DESACTIVATION CHECKURL (car probleme API)
-----------------------------------------


                    } else {
                        //console.warn('content-length excess: ' + contentlength + ' (max:' + contentlength_limit + ')');
                        geojson_link.closest('div').find('.geojson_loading').removeClass('alert-info').addClass('alert alert-warning').html('<strong><i class="fa fa-info-circle"></i> fichier trop important pour être chargé (>' + contentlength_limit / 1000 + 'ko)</strong><br><a href="' + geojson_url + '">' + geojson_url + '</a>');
                    }

                });
                */

            });
        }


        _Metaclic.displayDataset = function() {
            var url = API_ROOT + 'datasets/' + options.dataset + '/';
            jQuery.getJSON(url, function(data) {
                obj.find('.dataset-result[data-dataset="' + options.dataset + '"]')
                    .append(jQuery(Templates.dataset(data)));

                obj.find('div.dataset[data-dataset="' + options.dataset + '"] ').hide().slideDown('slow');
                addSpatialZoneMap(options.dataset);
                addPreviewMap(options.dataset, data);
            }).fail(
                function() {
                    obj.find('.dataset-result[data-dataset="' + options.dataset + '"]')
                        .append('<p class="error">Serveur www.data.gouv.fr injoignable</p>');
                }
            );
        };

        /*    _Metaclic.displayLastReuses = function () {
            var url = API_ROOT + 'reuses/?' + jQuery.param(options);
            jQuery.getJSON(url, function (data) {
                var t = Handlebars.compile($("#reuse-template").html());
                obj.html(t(data));
            });
};*/

        return _Metaclic;
    };

    //////////////////// UDATAMAP

    MetaclicMap = function(obj, ori_options, datasetdata) {

        var _MetaclicMap = {};
        var defaults = {
            title: false,
            sharelink: false,
            resources: [],
            leaflet_map_options: {},
            background_layers: ["OSM-Fr","Positron","Outdoors_OSM","Dark_Matter","OpenStreetMap","HOTOSM_style","hikebikemap","OSM-monochrome","Hydda","OpenTopoMap",
"OpenRiverboatMap"]
        }

        var backgroundLayers = [];
        var loadedLayers = [];


        options = jQuery.extend({}, defaults, ori_options || {});
        var map = null;


        _MetaclicMap.addBackground = function(title, layer, show) {
            backgroundLayers[title] = layer;
            if (show === true) layer.addTo(map);
            updateBBoxAndLayerController();

        }

        var initMap = function() {
            obj.append(jQuery('<div class="geojson_preview card card-5"><div class="map map_preview"></div>' + (options.title ? '<h4>' + options.title + '</h4>' : '') + '<ul class="resources"></ul></div>'));


            map = L.map(obj.find('.map')[0], options.leaflet_map_options).setView([0, 0], 1);
            map.attributionControl.setPrefix('');
            map.layerController = L.control.layers(backgroundLayers, loadedLayers).addTo(map);

            for (var i in options.background_layers) {
                var bl = options.background_layers[i];

                if (typeof bl == 'string') {
                    if (MetaclicUtils.baseLayers[bl] != undefined) {
                        bl = MetaclicUtils.baseLayers[bl];
                    } else {
                        try {
                            bl = eval(bl);
                        } catch (err) {
                            console.log(err.message);
                        }
                    }
                }
                var l = L.tileLayer(bl.url,{
                    attribution: ' &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' 
                });
                var t = bl.title;
                _MetaclicMap.addBackground(t, l, i == 0);
            }


            if (options.sharelink) {
                ori_options.baseUrl = baseUrl;
                Template_shareLink = Templates.shareLinkMap;
                var html = Template_shareLink(ori_options);
                obj.find('.geojson_preview').append(html);

                obj.on('click', '.MetaclicMap-shareLink a[href="#"]', function(e) {
                    jQuery('.MetaclicMap-shareLink .hidden').removeClass('hidden').hide().slideDown('slow');
                    jQuery('.MetaclicMap-shareLink  a[href="#"]').fadeOut();
                    e.preventDefault();
                })
            }


        }; //FIN initMap



        var updateBBoxAndLayerController = function() {
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


        var default_style = function(feature) {
            return {
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            }
        };

        var default_template = function(feature) {
            var html = '';
            jQuery.each(feature.properties, function(k, v) {
                html += '<tr><th>' + k + '</th><td>' + MetaclicUtils.urlify(v) + '</td></tr>';
            });
            html = '<table class="table table-hover table-bordered">' + html + '</table>';
            return html;
        };

        //var default_pointToLayer = false;
        var default_pointToLayer = function(feature, latlng, f_marker, featuresCount) {

            if (featuresCount < icons_limit) return f_marker(feature, latlng);

            var geojsonMarkerOptions = {
                radius: 3
            };

            return L.circleMarker(latlng, geojsonMarkerOptions);
        };


        var default_marker = function(feature, latlng) {
            return L.marker(latlng)
        }

        var addResource = function(resource, data_dataset) {

            jQuery.each(data_dataset.resources, function(k, val) {
                if (val.id == resource.id) {
                    resource.data = val;
                    resource.metadata_url = data_dataset.page;
                    resource.title = val.title;
                    resource.license = data_dataset.license;
                    resource.organization = data_dataset.organization;
                }
            })

            obj.find('.geojson_loading_' + resource.id).remove();
            obj.append(jQuery('<div class="geojson_loading_' + resource.id + ' geojson_loading alert alert-info">' + resource.title + ' - chargement en cours <i class="fa fa-spinner fa-spin"></i></div>'));
            jQuery.getJSON(resource.data.url, function(data) {

                if (data.features.length > featurelength_limit) {
                    //console.warn('feature count excess: ' + data.features.length + ' (max:' + featurelength_limit + ')');
                    obj.find('.geojson_loading_' + resource.id) /*.removeClass('alert-info').addClass('alert-warning').html('<strong><i class="fa fa-info-circle"></i> fichier trop important pour être chargé (>' + featurelength_limit + ' objets)</strong><br><a href="' + geojson_url + '">' + geojson_url + '</a>')*/ .slideUp('fast');
                    return false;
                }

                if (null === map) initMap();

                if (typeof resource.style == 'string') {
                    try {
                        var f = eval(resource.style);
                        if (typeof f == 'function') resource.style = f;
                    } catch (err) {
                        console.log(err.message);
                    }
                }


                if (typeof resource.marker == 'string') {
                    try {
                        var f = eval(resource.marker);
                        if (typeof f == 'function') resource.marker = f;
                    } catch (err) {
                        console.log(err.message);
                    }

                }


                if (typeof resource.template == 'string') {
                    if (jQuery(resource.template).length) {
                        resource.template = Handlebars.compile(
                            jQuery(resource.template).first().html()
                        );
                    } else {
                        try {
                            var f = eval(resource.template);
                            if (typeof f == 'function') resource.template = f;
                        } catch (err) {
                            console.log(err.message);
                            resource.template = Handlebars.compile(resource.template);
                        }
                    }
                }

                if (typeof resource.pointToLayer == 'string') {
                    try {
                        var f = eval(resource.pointToLayer);
                        if (typeof f == 'function') resource.pointToLayer = f;
                    } catch (err) {
                        console.log(err.message);
                    }
                }


                if ('JSON' == resource.data.format.toUpperCase() || "GEOJSON" == resource.data.format.toUpperCase()) {
                    var layer = L.geoJson(data, {
                        onEachFeature: function(feature, layer) {
                            if (resource.template) layer.bindPopup(resource.template(feature, layer));
                        },
                        pointToLayer: function(feature, layer) {
                            if (resource.pointToLayer) {
                                return resource.pointToLayer(feature, layer, resource.marker, data.features.length);
                            }
                            return false;
                        },
                        style: resource.style

                    });
                }

                layer.addTo(map);
                loadedLayers[resource.title] = layer;

                updateBBoxAndLayerController();

                obj.find('ul.resources').append(Templates.li_resource(resource));

                obj.find('.geojson_loading_' + resource.id).slideUp('slow');
                return true;

            }).fail(function(data) {
                //console.warn("can't load GeoJson: " + geojson_url);
                obj.find('.geojson_loading_' + resource.id) /*.removeClass('alert-info').addClass('alert alert-danger').html('<strong><i class="fa fa-warning"></i> impossible de charger le fichier</strong><br><a href="' + resource.url + '">' + resource.url + '</a>')*/ .slideUp('fast');

                return false;
            });
        }



        var loadResource = function(resource) {

            var resource_defaults = {
                id: null,
                dataset: null,
                style: default_style,
                template: default_template,
                pointToLayer: default_pointToLayer,
                marker: default_marker
            };

            resource = jQuery.extend({}, resource_defaults, resource || {});


            if (datasetdata != null && datasetdata.id == resource.dataset) {
                addResource(resource, datasetdata);
            } else {

                obj.append(jQuery('<div class="geojson_loading_' + resource.id + ' geojson_loading alert alert-info">' + resource.id + ' - chargement en cours <i class="fa fa-spinner fa-spin"></i></div>'));
                var api_dataset_url = API_ROOT + 'datasets/' + resource.dataset + '/';
                jQuery.getJSON(api_dataset_url, function(datasetdata) {
                    addResource(resource, datasetdata);
                }).fail(function(data) {
                    //console.warn("can't load resource dataset: " + resource.dataset);
                    obj.find('.geojson_loading_' + resource.id) /*.removeClass('alert-info').addClass('alert alert-danger').html('<strong><i class="fa fa-warning"></i> impossible de charger le fichier</strong><br><a href="' + resource.url + '">' + resource.url + '</a>')*/ .slideUp('fast');

                    return false;
                });

            } //else
        }; // FIN loadResource


        for (var i in options.resources) {
            var resource = options.resources[i];
            loadResource(resource);
        }





        _MetaclicMap.map = map;
        return _MetaclicMap;
    }; // FIN MetaclicMap



    //*****************************************************




        //var API_ROOT = "https://next.data.gouv.fr/api/1/"
        //var API_ROOT = "https://demo.data.gouv.fr/api/1/"; //!TODO get from div param
    var API_ROOT = "https://www.data.gouv.fr/api/1/";
    var contentlength_limit = 2.5 * 1000000; //2.5Mo
    var icons_limit = 200;
    var featurelength_limit = 2000 * 100; //nb max d'objet geojson



    var checklibs = function() {
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




    var start = function() {

        var container = _Metaclic.container;

        /** i18n init  **/
        _Metaclic.lang = lang = 'fr';

        i18n.init({
            resGetPath: baseUrl + '../locales/metaclic.' + lang + '.json',
            lng: lang,
            load: 'unspecific',
            interpolationPrefix: '{',
            interpolationSuffix: '}',
            fallbackLng: false,
            fallbackOnEmpty: true,
            fallbackOnNull: true,
            nsseparator: '::', // Allow to use real sentences as keys
            keyseparator: '$$', // Allow to use real sentences as keys
        }, function(err, t) { /* loading done */ });


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
            ordinal: function(number) {
                return number + (number === 1 ? 'er' : 'ème');
            },
            meridiemParse: /PD|MD/,
            isPM: function(input) {
                return input.charAt(0) === 'M';
            },
            // in case the meridiem units are not separated around 12, then implement
            // this function (look at locale/id.js for an example)
            // meridiemHour : function (hour, meridiem) {
            //     return /* 0-23 hour, given meridiem token and hour 1-12 */
            // },
            meridiem: function(hours, minutes, isLower) {
                return hours < 12 ? 'PD' : 'MD';
            },
            week: {
                dow: 1, // Monday is the first day of the week.
                doy: 4 // The week that contains Jan 4th is the first week of the year.
            }
        });

        moment.locale(lang);


        /** Handlebars init  **/

        Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {

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

        Handlebars.registerHelper('ifCount', function(v1, operator, v2, options) {
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

        Handlebars.registerHelper('ifNotall', function(v1, v2, options) {
            if (v1.indexOf(v2) == "-1") {
                return options.fn(this);
            }
            return options.inverse(this);
        });


        Handlebars.registerHelper('paginate', function(n, total, page_size) {

            var res = '';
            var nPage = Math.ceil(total / page_size);
            if (nPage == 1) return '';
            for (var i = 1; i <= nPage; ++i) {
                res += '<li' + (i == n ? ' class="active"' : '') + ">";
                res += '<a href="#" data-page=' + i + '>' + i + '</a></li>';
            }
            return '<nav><ul class="pagination">' + res + '</ul></nav>';
        });

        Handlebars.registerHelper('taglist', function(tags) {
            var res = '';
            for (var i in tags) {
                res += "<span class='label label-primary' >" + tags[i] + '</span> ';
            }
            return res;
        });

        Handlebars.registerHelper('trimString', function(passedString) {
            if (passedString.length > 150) {
                var theString = passedString.substring(0, 150) + '...';
                return new Handlebars.SafeString(theString);
            } else {
                return passedString;
            }

        });


        Handlebars.registerHelper('uppercase', function(passedString) {
            return passedString.toUpperCase();
        });

        Handlebars.registerHelper('truncate', function(str, len) {
            if (str && str.length > len && str.length > 0) {
                var new_str = str + " ";
                new_str = str.substr(0, len);
                new_str = str.substr(0, new_str.lastIndexOf(" "));
                new_str = (new_str.length > 0) ? new_str : str.substr(0, len);

                return new Handlebars.SafeString(new_str + '...');
            }
            return str;
        });

        Handlebars.registerHelper('default', function(value, defaultValue) {
            if (value != null) {
                return value
            } else {
                return defaultValue;
            }
        });

        Handlebars.registerHelper('dt', function(value, options) {
            return moment(value).format(options.hash['format'] || 'LLL');
        });

        Handlebars.registerHelper('placeholder', function(url, type) {
            return url ? url : baseUrl + '../img/placeholders/' + type + '.png';
        });

        Handlebars.registerHelper('_', function(value, options) {
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
                console.info('i18n "' + value + '" NOT FOUND');
                return value;
            }

            return res;
        });


        Handlebars.registerHelper('md', function(value) {
            return new Handlebars.SafeString(marked(value));
        });



        Handlebars.registerHelper('mdshort', function(value, length) {
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


        Handlebars.registerHelper('theme', function(value) {
            return new Handlebars.SafeString(baseUrl + '' + value);
        });


        Handlebars.registerHelper('fulllogo', function(value) {
            //   value = value.replace('-100.png', '.png'); // BAD IDEA can be .png or .jpg
            return new Handlebars.SafeString(value);
        });


        Handlebars.registerHelper('jsonencode', function(value) {

            return JSON.stringify(value, null, 4);
        });

        for (var tmpl in Templates) {
            var template_surcharge_id = 'metaclic_template_' + tmpl;
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

        window._Metaclic = {};
        container = _Metaclic.container = jQuery('div.Metaclic-data[data-organizations]');
        if (container.length) {


            var orgs = _Metaclic.container.data('organizations').split(',');
            var geozones_trans = {};

            _Metaclic.container.html('<p class="loading">chargement en cours</p>');

            for (var i in orgs) {
                getOrganizationName(orgs[i]);
            }


            //_Metaclic.container.data('organization', orgs[0]);
            _Metaclic.container.data('organizations', '');
            _Metaclic.orgs = [];

            for (var i in orgs) {
                _Metaclic.orgs.push({
                    id: orgs[i],
                    name: orgs[i]
                });

            }

            container.each(function() {
                var obj = jQuery(this);
                var ud = Metaclic(obj, obj.data());
                ud.displayLastDatasets();
            });

            var loadDataSets = function() {
                container.each(function() {
                    var obj = jQuery(this);
                    var ud = Metaclic(obj, obj.data());
                    ud.displayDatasets();
                });

            }


            updateGeozonesTrans = function() {


                container.find('.geozone-to-load').each(function() {

                    var obj = jQuery(this);
                    obj.removeClass('geozone-to-load').addClass('geozone-to-update');
                    var k = obj.data('addgeozone');

                    if (geozones_trans[k] == undefined) {
                        var url = API_ROOT + 'spatial/zone/' + k;
                        jQuery.getJSON(url, function(data) {
                            geozones_trans[data.id] = i18n.t(data.properties.name) + ' <i>(' + data.properties.code + ')</i>';
                            updateGeozonesTrans();
                        });
                    }
                });

                container.find('.geozone-to-update').each(function() {
                    var obj = jQuery(this);
                    var k = obj.data('addgeozone');
                    if (geozones_trans[k] != undefined) {
                        obj.removeClass('geozone-to-update');
                        obj.html(obj.html().replace(k, geozones_trans[k]));
                    }
                });
            };




            updateListLimit = function() {
                container.find('ul[data-limitlist]').each(function() {
                    var obj = jQuery(this);
                    var limit = obj.data('limitlist');
                    if (obj.find('>a').length > limit) {
                        obj.find('>a:nth-child(n+' + (limit + 1) + ')').hide();
                        var openlink = jQuery('<a href="#" class="see-all">voir la suite</a>');
                        obj.find('>a:nth-child(' + (limit) + ')').after(openlink);
                        openlink.click(function(e) {
                            e.preventDefault();
                            obj.find('>a').slideDown();
                            jQuery(this).slideUp();


                        });
                    }

                });

            }


            var loadDataSet = function(id) {

                if (jQuery('div.dataset[data-dataset="' + id + '"]').length) {
                    jQuery('div.dataset[data-dataset="' + id + '"] ').slideToggle();
                } else {

                    container.each(function() {
                        var obj = jQuery(this);
                        var ud = Metaclic(obj, {
                            dataset: id
                        });
                        ud.displayDataset();
                    });
                }


            }

            /*   container.each(function () {
            var obj = jQuery(this);
            var ud = Metaclic(obj, obj.data());
            ud.displayLastReuses();
        });*/


            var scrollTop = function() {
                $('html, body').animate({
                    scrollTop: jQuery('div.Metaclic-data').offset().top
                }, 250);
            }

            var updateParams = function() {
                var q = container.find('.datasetsForm input[name="q"]').val();
                _Metaclic.container.data('q', q);
                var organization = container.find('.datasetsForm select[name="organizations"] option:selected').val();
                _Metaclic.container.data('organization', organization);
                var sort = container.find('.result-sort select[name="sort"] option:selected').val();
                _Metaclic.container.data('sort', sort);
                _Metaclic.container.data('page', 1);
            }


            if (jQuery('div.Metaclic-data').length) {

                var container = jQuery('div.Metaclic-data');
                var setPage = function(p) {
                    container.data('page', p);
                    var organization = jQuery(this).data('addid');
                    if (typeof organization === "undefined") {
                        var options = _Metaclic.container.data();
                        var exp = /,/g;
                        var test = options.organizationList.replace(exp, "|");
                        organization = test;
                        _Metaclic.container.data('organization', organization);
                    }

                    loadDataSets();
                }

                

                container.on('click', 'a[data-page]', function(e) {
                        e.preventDefault();
                        setPage(jQuery(this).data('page'));
                    })
                    .on('click', 'a[data-dataset]', function(e) {
                        e.preventDefault();
                        loadDataSet(jQuery(this).data('dataset'));
                    })
                    .on('click', 'a.reloadDataSets', function(e) {
                        e.preventDefault();
                        loadDataSets();
                    })
                    .on('click', '.datasetsForm button', function(e) {                        
                        e.preventDefault();
                        updateParams();
                        loadDataSets();
                    })
                    .on('change', '.datasetsForm .form-control', function(e) {
                        e.preventDefault();
                        updateParams();
                        loadDataSets();
                    })
                    .on('keyup', '#metaclic-autocomplete-input', function(e) {
                        	var key_code=e.keyCode;
                        	var organizations = container[0].dataset.organizations;
                        	organizations=organizations.split(",");
                        	//console.log(JSON.parse('{}'));
                        	$('#metaclic-autocomplete-list').empty();
                        	var research =$('#metaclic-autocomplete-input').val();
                              var jqxhr = $.get("https://www.data.gouv.fr/api/1/organizations/suggest/?q="+research+"&size=10");
                            	  jqxhr.done(function(result) {
                            	    result.forEach(function(element) {
                            		  if(key_code==13){
                            		  	if(research==element.name){
                            		  		$('#metaclic-autocomplete-input').val("");
                            		  		var is_unique=true;
                            		  		 organizations.forEach(function(organization) {
                            		  		 	if(organization.id==element.id){
                            		  		 		is_unique=false;
                            		  		 	}
                            		  		 });
                            		  		 if(is_unique){
                            		  		 	organizations.push(element.id);
                            		  		 	if(_Metaclic.orgs.length==1){
                            		  		 	    if (_Metaclic.orgs[0].id=="") {
                            		  		 	       _Metaclic.orgs=[]
                            		  		 	    }
                            		  		 	}
                            		  		 	 _Metaclic.orgs.push(element);
                            		  		 	container[0].dataset.organizations=organizations.toString();
                            		  		 	var exp = /,/g;
                                                var organization = container[0].dataset.organizations.replace(exp, "|");
                                                _Metaclic.container.data('organization', organization);
                                                loadDataSets();
                            		  		 }
                            		  	}
                            		  } else {
                            		  	$('#metaclic-autocomplete-list').append('<option value="'+element.name+'" />')
                            		  }
                            		});
                            	  })
                            	  jqxhr.fail(function() {
                            	    alert( "error" );
                            	  })
                    })
                    .on('click', '.result-sort a.sortdirection', function(e) {
                        e.preventDefault();
                        sortDesc = !sortDesc;
                        updateParams();
                        loadDataSets();
                    })
                    .on('submit', '.datasetsForm form', function(e) {
                        e.preventDefault();
                        updateParams();
                        loadDataSets();
                    }).
                on('click', '.Metaclic-shareLink a[href="#"]', function(e) {
                        jQuery('.Metaclic-shareLink .hidden').removeClass('hidden').hide().slideDown('slow');
                        jQuery('.Metaclic-shareLink  a[href="#"]').fadeOut();
                        e.preventDefault();
                    })
                    .on('click', 'a[data-addId]', function(e) {
                        var organization = jQuery(this).data('addid');
                        e.preventDefault();
                        $.each(_Metaclic.orgs, function(index, value) {
                            if (value.id == organization) {
                                _Metaclic.container.data("organization_name", value.name);
                            }
                        });
                        _Metaclic.container.data('organization', organization);
                        loadDataSets();
                    })
                    .on('click', 'a[data-addTag]', function(e) {
                        var tag = jQuery(this).data('addtag');
                        e.preventDefault();
                        var tags = _Metaclic.container.data('tags');
                        if (!Array.isArray(tags)) tags = [];
                        var unique = true;
                        for (var index = 0; index < tags.length; index++) {
                            var element = tags[index];
                            if (element == tag) {
                                unique = false;
                            }
                        }
                        if (unique) {
                            tags.push(tag);
                            _Metaclic.container.data('tags', tags);
                            loadDataSets();
                        }
                    })
                    .on('click', 'a[data-addLicense]', function(e) {
                        var license = jQuery(this).data('addlicense');
                        e.preventDefault();
                        _Metaclic.container.data('license', license);
                        loadDataSets();
                    })
                    .on('click', 'a[data-addGeozone]', function(e) {
                        var geozone = jQuery(this).data('addgeozone');
                        e.preventDefault();
                        _Metaclic.container.data('geozone', geozone);
                        loadDataSets();
                    })
                    .on('click', 'a[data-addGranularity]', function(e) {
                        var granularity = jQuery(this).data('addgranularity');
                        e.preventDefault();
                        _Metaclic.container.data('granularity', granularity);
                        loadDataSets();
                    })
                    .on('click', 'a[data-addFormat]', function(e) {
                        var format = jQuery(this).data('addformat');
                        e.preventDefault();
                        _Metaclic.container.data('format', format);
                        loadDataSets();
                    })
                    .on('click', 'a[data-removeParam]', function(e) {
                        var paramName = jQuery(this).data('removeparam');
                        e.preventDefault();
                        _Metaclic.container.removeData(paramName);
                        loadDataSets();
                    })
                    .on('click', 'a[data-removeOrganization]', function(e) {
                        var paramName = jQuery(this).data('removeorganization');
                        e.preventDefault();
                        var organization = jQuery(this).data('addid');
                        var options = _Metaclic.container.data();
                        var exp = /,/g;
                        organization = options.organizationList.replace(exp, "|");
                        _Metaclic.container.data('organization', organization);
                        loadDataSets();
                    })
                    .on('click', 'a[data-removeTag]', function(e) {
                        e.preventDefault();
                        var tag = jQuery(this).data('removetag');
                        var tags = _Metaclic.container.data('tags');
                        var index = jQuery.inArray(tag, tags);
                        if (index > -1) {
                            tags.splice(index, 1);
                        }
                        _Metaclic.container.data('tags', tags);
                        loadDataSets();
                    });


                setPage(1);
                //loadDataSet('53698ed4a3a729239d203594');
            }
        }



        jQuery('.Metaclic-map[data-resources]').each(function() {
            MetaclicMap(jQuery(this), jQuery(this).data())
        });


    };

    var jsonfail = function() {
        _Metaclic.container.html('<p class="error">Serveur ' + API_ROOT + ' injoignable</p>')
    }

    var getOrganizationName = function(org) {
        var url = API_ROOT + 'organizations/' + org + '/';
        jQuery.getJSON(url, function(data) {
            for (var i in _Metaclic.orgs) {
                var o = _Metaclic.orgs[i];
                if (o.id == data.id) {
                    _Metaclic.orgs[i] = data;
                }
            }

            //tri par nom
            _Metaclic.orgs.sort(function(a, b) {
                if (a.name > b.name)
                    return 1;
                return -1;
            });
            //ICI
            options = _Metaclic.container.data();

            var params = {
                q: options.q,
                organization: options.organization,
                orgs: _Metaclic.orgs,
                sort: options.sort,
                sortTypes: sortTypes,
                sortDesc: sortDesc,
            };

            var html = Templates.datasetsForm(params);
            jQuery('.datasetsForm').replaceWith(html);

        }).fail(jsonfail);
    }

    /* START */
    if (jQuery('link[href$="metaclic.css"]').length == 0)
        jQuery('<link type="text/css" href="' + baseUrl + 'metaclic.css" rel="stylesheet">').appendTo('head');

    checklibs();


    
});