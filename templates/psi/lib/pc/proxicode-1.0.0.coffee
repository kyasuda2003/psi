String::format = ->
  args = undefined
  args = Array::slice.call(arguments, 0)
  @toString().replace /{(\d+)}/g, (match, number) ->
    if typeof args[number] isnt "undefined"
      args[number]
    else
      match


app.util =
  array2json: (arr, key) ->
    jsn = {}
    for obj of arr
      jsn[arr[obj][key].toString()] = arr[obj]
    jsn

  json2array: (jsn) ->
    $.map jsn, (value, index) ->
      [value]


  getRenderedArr: (arr, size) ->
    
    #var _ref=$.map(app.data.products,function(value, index){return [value];});
    newArr = []
    i = 0

    while i < arr.length
      newArr.push arr.slice(i, i + size)
      i += size
    newArr

  getProducts1RowTable: (numInARow) ->
    _ref = {}
    for cat of app.data.categories
      _ref[cat] = app.data.categories[cat]
      _ref1 = $.map(app.data.products, (value, index) ->
        [value]  if value.categories.indexOf(_ref[cat].id) > -1
      )
      _ref[cat].prodArray = app.util.getRenderedArr(_ref1, numInARow)
    _ref

app.ui =
  popupBlock: (blockId, colour, opac, display) ->
    $("#" + blockId).each (index, val) ->
      $(this).remove()
      return

    $("<div id='" + blockId + "' class='block-window'></div>").css
      height: "100%"
      width: "100%"
      "z-index": "4000"
      opacity: opac
      position: "fixed"
      top: "0"
      left: "0"
      display: ((if display then "block" else "none"))
      "background-color": colour
      "background-image": ((if colour is "white" then "url('" + app.settings.apppath + "img/temp-load.gif')" else ""))
      "background-repeat": "no-repeat"
      "background-position": "center"


  switchView: (obj, win, path) ->
    $(".menu ul li").removeClass "active"
    $(obj).parent().attr class: "active"
    return  if win.location.href.indexOf(path) > -1
    $("body").append app.ui.popupBlock("login-block", "white", "1", false)
    $("#login-block").fadeIn 500, ->
      $.when(app.api.getAllCategories(), app.api.getAllPhotos(), app.api.getAllProducts()).done ->
        win.location.replace win.location.pathname + path
        return

      return

    return

app.api = (->
  _this = undefined
  _this = this
  getAllCategories: ->
    unless $.isEmptyObject(app.data.categories)
      $.Deferred().resolve()
    else
      $.get("{0}{1}/categories/".format(app.settings.apihost, app.settings.apipath)).success (data, textStatus, jqxhr) ->
        app.data.categories = app.util.array2json(data.results, "id")
        return


  getAllPhotos: ->
    unless $.isEmptyObject(app.data.photos)
      $.Deferred().resolve()
    else
      $.get("{0}{1}/photos/".format(app.settings.apihost, app.settings.apipath)).success (data, textStatus, jqxhr) ->
        app.data.photos = app.util.array2json(data.results, "id")
        return


  getAllProducts: ->
    unless $.isEmptyObject(app.data.products)
      $.Deferred().resolve()
    else
      $.get("{0}{1}/products/".format(app.settings.apihost, app.settings.apipath)).success (data, textStatus, jqxhr) ->
        app.data.products = app.util.array2json(data.results, "id")
        return

)()
app.data =
  categories: {}
  photos: {}
  products: {}