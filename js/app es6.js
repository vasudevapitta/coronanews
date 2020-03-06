$(()=>{

const API_KEY = '4b64ca4f39cb4f52a5ff2843d6f01541';
const div = $('#doc');
const country='us';
const url=`https://newsapi.org/v2/everything?q=corona&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
  

fetch(url)
  .then(response => response.json())
  .then(data => {
        $(data).each(function(ind, arrVal){
          createTemplate(arrVal.articles);
        });
});
  
  function createTemplate(data) {
    $(data).each(function(ind, arrVal) {
      const title = arrVal.title?arrVal.title:'';
      const content = arrVal.content?arrVal.content:'';
      const desc = arrVal.description?arrVal.description:'';
      
      const titleSearch = title?title.search('corona'):-1;
      const contentSearch = content?content.search('corona'):-1;
      const descSearch = desc?desc.search('corona'):-1; 
      const isCorona = titleSearch != -1 || contentSearch != -1 || descSearch != -1;
      
       if(isCorona){
          const date = arrVal.publishedAt?arrVal.publishedAt.slice(0,10):'';
          const author = arrVal.author?arrVal.author:'Unknown';

          const readMoreUrl = arrVal.url;
          const img = arrVal.urlToImage;
          const source = arrVal.source.name;

          const template = `<h2>${title}</h2>
          <p>${date}</p>
          <figure>
          <img src="${img}" alt="${title}" class="img">
          <figcaption>${desc}</figcaption>
          </figure>
          <p>${content} <span><a href="${readMoreUrl}" target="_blank" rel="noopener">Read more</a></span></p>
          <h6>Author- ${author}</h6>
          <hr>`;
         $(div).append(template);
       }
    });
  }
   
});
