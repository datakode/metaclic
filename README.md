# udata-js

##  demo
http://depthfrance.github.io/udata-js/exemples/exemple.html

## utilisation
```
       <script>window.jQuery || document.write("<script src='//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js'><\/script>")</script>

        <!-- chargement feuille de style bootstrap -->
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css">
        <!-- chargement feuille de style font-awesome -->
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">

        <div
          class="uData-data"
          data-organizations="534fffb3a3a7292c64a78129,551959f6c751df6682057c91,534fffb9a3a7292c64a7814f,558bef88c751df1fd9a453b9,55896c18c751df5864a453b9,558bf578c751df2f9ea453ea,534fff4ea3a7292c64a77cab"
          data-organization="551959f6c751df6682057c91"
          data-q="eau"
          data-page_size="5">
        </div>
```
paramètres:
  - data-organizations: ID des organisations proposées dans le menu déroulant
  - data-organization: ID de l'organisation selectionnée (optionnel)
  - data-q: recherche initiale (optionnel)
  - data-page_size: nombre de résultat par page (optionnel)
  - data-sort: tri des résulats, valeurs possibles ['title','created','last_modified','followers','reuses',false] si false le menu est masqué (optionnel, default: title)
  - data-sharelink: boolean si true, affiche le lien de partage (optionnel, default: false)

l'ensemble des paramètres de l'API uData [GET /datasets/](https://www.data.gouv.fr/fr/apidoc/#!/datasets/list_datasets) sont utilisables

ex: `data-tag='transport'`

## personnalisation

Vous pouvez personnaliser l'affichage en utilisant des templates [handlebars](http://handlebarsjs.com/)
voici les identifiants et templates par défaut utilisés:

 - **udata_template_datasetsForm** (affichage du formulaire de recherche)
```
<script id='udata_template_datasetsForm' type="text/x-handlebars-template">
        <div class="datasetsForm">
                <form action="" method="get">
                        <div><label></label><input type="text" name="q" value="{{q}}" placeholder="Rechercher des données" class="form-control"></input></div>
                        {{#ifCount orgs ">" 1 }}
                        <div>
                        {{else}}
                        <div class="hidden">
                                {{/ifCount}}
                                <label>Organisme</label><select name="organizations" class="form-control">
                                {{#each orgs}}
                                {{#ifCond id "==" ../organization}}
                                <option value="{{id}}" selected>{{name}}</option>
                                {{else}}
                                <option value="{{id}}">{{name}}</option>
                                {{/ifCond}}
                                {{/each}}
                        </select></div>
                </form>
        </div>
        <br>
</script>
```

 - **udata_template_datasets** (affichage de la liste résultat)
```
<script id='udata_template_datasets' type="text/x-handlebars-template">
        <div class="result-count">{{ total }} résultat(s)</div>
        {{#ifCond sort "!=" false}}
        <div class="result-sort form-inline"><label>Trier par</label>
                <select name="sort" class="form-control">
                    {{#each sortTypes}}

                    {{#ifCond id "==" ../sort}}
                    <option value="{{id}}" selected>{{name}}</option>
                    {{else}}
                    <option value="{{id}}">{{name}}</option>
                    {{/ifCond}}

                    {{/each}}
                </select>
                <a href="#" class="sortdirection">
                    {{#ifCond sortDesc "==" true}}
                    <i class="fa fa-sort-alpha-desc"></i>
                    {{else}}
                    <i class="fa fa-sort-alpha-asc"></i>
                    {{/ifCond}}
                </a>
        </div>
        {{/ifCond}}
        <ul class="search-results">
                {{#each data}}
                <li class="search-result dataset-result" data-dataset="{{id}}">
                    <a href="{{ page }}" title="{{  organization.name }}"  data-dataset="{{id}}">

                        <div class="result-logo pull-left">
                            <img alt="" src="{{organization.logo}}" width="70" height="70">
                        </div>
                        {{#if organization.public_service }}
                        <img alt="certified" class="certified" rel="popover" data-title="{{_ 'certified_public_service'}}" data-content="{{_ 'the_identity_of_this_public_service_public_is_certified_by_etalab'}}" data-container="body" data-trigger="hover"/>
                        {{/if}}
                        <div class="result-body ellipsis-dot is-truncated" style="word-wrap: break-word;">
                            <h4 class="result-title">{{title}}</h4>

                            <div class="result-description">
                                {{mdshort description 128}}
                            </div>
                        </div>

                        </a>
                        <ul class="list-inline result-infos">
                                {{#if temporal_coverage }}
                                <li>
                                    <span class="" rel="tooltip"
                                    data-placement="top" data-container="body"
                                    title="{{_ 'temporal_coverage'}}">
                                    <span class="fa fa-calendar fa-fw"></span>
                                    {{dt temporal_coverage.start format='L' }} {{_ 'to'}} {{dt temporal_coverage.end format='L' }}
                                    </span>
                                </li>
                                {{/if}}

                                {{#if frequency }}
                                <li>
                                        <span class="" rel="tooltip"
                                        data-placement="top" data-container="body"
                                        title="{{_ 'Update frequency' }}">
                                        <span class="fa fa-clock-o fa-fw"></span>
                                        {{_ frequency }}
                                        </span>
                                </li>
                                {{/if}}

                                {{#if spatial.territories }}
                                <li>
                                        <span class="" rel="tooltip"
                                        data-placement="top" data-container="body"
                                        title="{{_ 'Spatial coverage'}}">
                                        <span class="fa fa-map-marker fa-fw"></span>
                                        {{_ spatial.territories.0.name }}
                                </span>
                                </li>
                                {{/if}}

                                {{#if spatial.granularity }}
                                <li>
                                        <span class="" rel="tooltip"
                                        data-placement="top" data-container="body"
                                        title="{{_ 'Spatial granularity'}}">
                                        <span class="fa fa-bullseye fa-fw"></span>
                                        {{_ spatial.granularity }}
                                </span>
                                </li>
                                {{/if}}

                                <li>
                                        <span class="" rel="tooltip"
                                        data-placement="top" data-container="body"
                                        title="{{_ 'Reuses'}}">
                                        <span class="fa fa-retweet fa-fw"></span>
                                        {{default metrics.reuses 0 }}
                                </span>
                                </li>

                                <li>
                                        <span class="" rel="tooltip"
                                        data-placement="top" data-container="body"
                                        title="{{_ 'Followers'}}">
                                        <span class="fa fa-star fa-fw"></span>
                                        {{default metrics.followers 0 }}
                                </span>
                                </li>

                        </ul>
                </li>
                {{/each}}
        </ul>
        <div class="text-center">
                <div class="pagination">
                    {{{ paginate page total page_size }}}
                </div>
        </div>
</script>
```
 - **udata_template_dataset** (affichage de la fiche)
```
<script id='udata_template_dataset' type="text/x-handlebars-template">
        <div class="dataset" data-dataset="{{id}}">

                <div class='dataset-info'>
                    <blockquote>{{md description }}</blockquote>
                    {{#if extras.remote_url}}
                    <a class="site_link" href="{{extras.remote_url}}" target=_blank>
                        Voir le site original
                </a>
                {{/if}}
                <p class="published_on">
                        {{_ 'published_on' }} {{dt created_at}}
                        {{_ 'and_modified_on'}} {{dt last_modified}}
                        {{_ 'by'}} <a title="{{organization.name}}" href="{{organization.page}}">{{organization.name}}</a>
                </p>
        </div>

        <div class="resources-list">
                <h3>{{_ 'Resources'}}</h3>
                {{#each resources}}
                <div data-checkurl="/api/1/datasets/checkurl/" itemtype="http://schema.org/DataDownload" itemscope="itemscope" id="resource-{{id}}">

                        <a href="{{url}}" data-size="{{filesize}}" data-format="{{format}}" data-title="{{title}}" data-id="{{id}}" itemprop="url" target=_blank>
                            <h4>
                                <span data-format="{{format}}">
                                    {{format}}
                                </span>
                                {{title}}
                                <p>Dernière modification le {{dt last_modified}}</p>
                            </h4>
                        </a>
                </div>
        {{/each}}
        </div>

        <div class="meta">
                <div class="producer">
                        <h3>{{_ 'Producer'}}</h3>
                        <a title="{{organization.name}}" href="{{organization.page}}">
                            <img class="organization-logo producer" alt="{{organization.name}}" src="{{fulllogo organization.logo}}"><br>
                            <span class="name">{{organization.name}}</span>
                        </a>
                </div>


                <div class="info">
                        <h3>{{_ 'Informations'}}</h3>
                        <ul>
                                <li title="{{_ 'License'}}" rel="tooltip">
                                        <i class="fa fa-copyright"></i>
                                        <!--a href="http://opendatacommons.org/licenses/odbl/summary/"-->{{_ license}}<!--/a-->
                                </li>
                                <li title="{{_ 'Frequency'}}" rel="tooltip">
                                        <span class="fa fa-clock-o"></span>
                                        {{_ frequency}}
                                </li>
                                <li title="{{_ 'Spatial granularity'}}"  rel="tooltip">
                                        <span class="fa fa-bullseye"></span>
                                        {{_ spatial.granularity}}
                                </li>
                        </ul>
                        <ul class="spatial_zones">
                                {{#each spatial.zones}}
                                <li data-zone="{{.}}">{{.}}</li>
                                {{/each}}
                        </ul>
                        <ul class="tags">
                                {{#each tags}}
                                <li><a title="{{.}}" href="https://www.data.gouv.fr/fr/search/?tag={{.}}">{{.}}</a></li>
                                {{/each}}
                        </ul>
                </div>

        </div>
</script>
```
##  exemple de personnalisation
http://depthfrance.github.io/udata-js/exemples/exemple2.html


## Integration carte simple

http://depthfrance.github.io/udata-js/exemples/exemple_map.html
http://depthfrance.github.io/udata-js/exemples/exemple_map2.html
http://depthfrance.github.io/udata-js/exemples/exemple_map3.html