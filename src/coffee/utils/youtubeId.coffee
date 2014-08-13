window.getYoutubeId = (url) ->

  getLocation = (url) ->
    a = document.createElement("a")
    a.href = url
    return a

  getParam = (search, name) ->
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
    results = regex.exec(location)
    return if results == null then "" else decodeURIComponent(results[1].replace(/\+/g, " "))

  location = getLocation(url)

  if location.hostname == "youtu.be"
    return location.pathname.slice(1)
  else if location.pathname == "/attribution_link"
    return getParam(getParam(location.search("u"), "v"))
  else
    return getParam(location.search, "v")