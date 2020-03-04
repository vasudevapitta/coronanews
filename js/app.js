"use strict";

$(function () {
  var API_KEY = '4b64ca4f39cb4f52a5ff2843d6f01541';
  var div = $('#doc');
  var country = 'us';
  var url = "https://newsapi.org/v2/everything?q=corona&sortBy=publishedAt&language=en&apiKey=".concat(API_KEY);

$.ajax({
  dataType: "json",
  url: url,
  context: document.body
}).done(function(data) {
  $(data).each(function (ind, arrVal) {
      createTemplate(arrVal.articles);
  });
});

  function createTemplate(data) {
    $(data).each(function (ind, arrVal) {
      var title = arrVal.title;
      var content = arrVal.content ? arrVal.content : 'null';
      var desc = arrVal.description;
      
      var titleSearch = title.search('corona');
      var contentSearch = content.search('corona');
      var descSearch = desc.search('corona');	
      var isCorona = titleSearch != -1 || contentSearch != -1 || descSearch != -1;
      
      if (isCorona) {
        var date = arrVal.publishedAt ? arrVal.publishedAt.slice(0, 10) : '';
        var author = arrVal.author ? arrVal.author : 'Unknown';
        var readMoreUrl = arrVal.url;
        var img = arrVal.urlToImage;
        var source = arrVal.source.name;
        var template = "<h2>".concat(title, "</h2>\n <p>").concat(date, "</p>\n <figure>\n <img src=\"").concat(img, "\" alt=\"").concat(title, "\" class=\"img\">\n <figcaption>").concat(desc, "</figcaption>\n </figure>\n  <p>").concat(content, " <span><a href=\"").concat(readMoreUrl, "\" target=\"_blank\" rel=\"noopener\">Read more</a></span></p>\n  <h6>Author ").concat(author, "</h6>\n <hr>");
        $(div).append(template);
      }
    });
  }
});
