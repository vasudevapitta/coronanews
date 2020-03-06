$(()=>{

const API_KEY = '4b64ca4f39cb4f52a5ff2843d6f01541';
const div = $('#doc');
const country='us';
const url=`https://newsapi.org/v2/everything?q=corona&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
var templateStr = '';

fetch(url)
  .then(response => response.json())
  .then(data => {
        $(data).each(function(ind, arrVal){
          createTemplate(arrVal.articles);
        });
});
   
  function createTitle(arrVal){
	  templateStr += arrVal.title?`<h2>${arrVal.title}</h2>`:'';
  }
  
  function createDate(arrVal){
	  templateStr += arrVal.publishedAt?`<p>${arrVal.publishedAt.slice(0,10)}</p>`:'';
  }
  
  function createFig(arrVal){
	  templateStr += arrVal.urlToImage?`<figure>
      <img src="${arrVal.urlToImage}" alt="${arrVal.title}" class="img">
      <figcaption>${arrVal.description}</figcaption>
      </figure>`:'';
  }
  
  function createContent(arrVal){
	  templateStr += arrVal.content?`<p>${arrVal.content} <span><a href="${arrVal.url}" target="_blank" rel="noopener">Read more</a></span></p>`:'';
  }
  
  function createAuthor(arrVal){
	  templateStr += arrVal.author?`<h6>Author- ${arrVal.author}</h6>`:'';
  }
  
  function createTemplate(data) {
	    $(data).each(function(ind, arrVal) {
		    createTitle(arrVal);
		    createDate(arrVal);
		    createFig(arrVal);
			createContent(arrVal);
			createAuthor(arrVal);
	    });
	    $(div).html(templateStr);
  }
   
});
