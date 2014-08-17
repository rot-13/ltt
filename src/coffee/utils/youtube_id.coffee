window.getYoutubeId = (url) ->

  getLocation = (url) ->
    a = document.createElement("a")
    a.href = url
    return a

  getParam = (search, name) ->
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
    results = regex.exec(location)
    return if results == null then "" else decodeURIComponent(results[1].replace(/\+/g, " "))

  urlLocation = getLocation(url)

  if urlLocation.hostname == "youtu.be"
    return urlLocation.pathname.slice(1)
  else if urlLocation.pathname == "/attribution_link"
    return getParam(getParam(urlLocation.search("u"), "v"))
  else
    return getParam(urlLocation.search, "v")