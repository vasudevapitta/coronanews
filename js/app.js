"use strict";

$(function () {
  var API_KEY = '4b64ca4f39cb4f52a5ff2843d6f01541';
  var div = $('#doc');
  var country = 'us';
  var url = "https://newsapi.org/v2/everything?q=corona&sortBy=publishedAt&language=en&apiKey=".concat(API_KEY);
  var templateStr = '';
    
$.ajax({
  dataType: "json",
  url: url,
  context: document.body
}).done(function(data) {
  $(data).each(function (ind, arrVal) {
      createTemplate(arrVal.articles);
  });
});

function createTitle(arrVal) {
  templateStr += arrVal.title ? "<h2>".concat(arrVal.title, "</h2>") : '';
}

function createDate(arrVal) {
  templateStr += arrVal.publishedAt ? "<p>".concat(arrVal.publishedAt.slice(0,10), "</p>") : '';
}

function createFig(arrVal) {
  templateStr += arrVal.urlToImage ? "<figure>\n      <img src=\"".concat(arrVal.urlToImage, "\" alt=\"").concat(arrVal.title, "\" class=\"img\">\n      <figcaption>").concat(arrVal.description, "</figcaption>\n      </figure>") : '';
}

function createContent(arrVal) {
  templateStr += arrVal.content ? "<p>".concat(arrVal.content, " <span><a href=\"").concat(arrVal.url, "\" target=\"_blank\" rel=\"noopener\">Read more</a></span></p>") : '';
}

function createAuthor(arrVal) {
  templateStr += arrVal.author ? "<h6>Author- ".concat(arrVal.author, "</h6>") : '';
}

function createTemplate(data) {
  $(data).each(function (ind, arrVal) {
    createTitle(arrVal);
    createDate(arrVal);
    createFig(arrVal);
    createContent(arrVal);
    createAuthor(arrVal);
  });
    $(div).html(templateStr);
}
    
});
