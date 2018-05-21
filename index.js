const YOUTUBE = 'https://www.googleapis.com/youtube/v3/search';
const YTKEY = 'AIzaSyCpK2QF6BelFL5T0EGirrSSa1ZlZXpEs7U';

// https://www.googleapis.com/youtube/v3/search?part=snippet&q=dog&key=AIzaSyCpK2QF6BelFL5T0EGirrSSa1ZlZXpEs7U


function submitSearch() {
  $('.js-submitForm').submit(function(event)  {

    event.preventDefault();
    let searchTarget = $(event.currentTarget).find('.js-searchField');
   
    let userSearchTerm = $('input').val();

    searchTarget.val("");

    searchYouTube(userSearchTerm, mapResults);
  });
}


function searchYouTube(userSearchTerm, callback)  {
 
  let query = {
    part: 'snippet',
    q: `${userSearchTerm}`,
    key: `${YTKEY}`
  };
  


  $.getJSON(YOUTUBE, query, callback);
}



function mapResults(tubeData)  {
  
  $('.js-numResults').html(`
    <span class='numResults'>${tubeData.pageInfo.resultsPerPage} of ${tubeData.pageInfo.totalResults}</span>
    `);
  
 const results = tubeData.items.map(
  
    function(item, index) {

      let youTubeWatch = 'https://youtube.com/watch?v=';
      let youTubeChannel = 'https://youtube.com/channel/';
      
      return `
      <div class='result'>
        <div>
        <span class='videoTitle'> <a href='${youTubeWatch}${item.id.videoId}' target='_blank'>${item.snippet.title}</a> </span>
        </div>
        <div>
          <a href='${youTubeWatch}${item.id.videoId}' target='_blank'><img class='videoImage' src='${item.snippet.thumbnails.medium.url}' alt='video thumbnail'/></a>
        </div>
        <div>
          <span><a href='${youTubeChannel}${item.snippet.channelId}' target='_blank'>Click to see more from this channel</a></span>
        </div>
        </div>
      `;
    }
  )
  $('.js-results').html(results);
}


$(submitSearch);





