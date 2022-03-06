const apiURL = "https://artists-men-restful-api.herokuapp.com/api/artists";
const apiURLSingleArtist = "https://artists-men-restful-api.herokuapp.com";

const getArtists = async () => {
  
  const res = await fetch(apiURL);
  const artists = await res.json();

  var content = document.querySelector("#content");
  var card = '<div class="row">';
  var count = 0;
  var margin_class = 'class1';
  for (var i=0; i<artists.length; i += 1) {
      if(count==3) count = 0;
      if(count==0){
        margin_class = 'class0';
      }
      else if(count==1){
        margin_class = 'class1';
      }
      else if(count==2){
        margin_class = 'class2';
      }
      card += '<div class="col-4 d-flex align-items-stretch"><div class="card '+margin_class+'"><img class="card-img-top" src="';
      card += artists[i].photo;
      card += '"alt="Image of ';
      card+= artists[i].name+'"Card image cap"><div class="card-body mb-0 d-flex flex-column"><h5 class="card-title">';
      card += "<a class='artist_uri' href='"+apiURLSingleArtist+artists[i].uri+"' target='_blank' >"+artists[i].name+"</a>";
      card += '</h5><span class="card-text">';
      card += '<h6><i>'+artists[i].genre+'</i> · '+commarize(artists[i].listeners)+' Listeners</h6>';
      card +=  '<p class="artist-info">'+artists[i].info+'</p>';
      card += '<h6>Albums</h6><p class="artist-albums">'+addSpace(artists[i].albums)+'</p>';
      card += '<h6>Top tracks</h6><p class="top-tracks">'+addSpace(artists[i].top_tracks)+'</p>';
      card += '<h6>Similar Artists</h6><p class="top-tracks">'+addSpace(artists[i].similar_to)+'</p>';
      card += '</span></div></div></div>'; //card body end
      count ++;
      
      
  }
  card += '</div>';
  content.innerHTML+=card;
};

//Retrieves artists when page is loaded
getArtists();


// Listeners number formatting 
function commarize(val)
{
	if (val >= 1e6)
	{
		var units = ["M","B","T"];
		var unit = Math.floor((val / 1000).toFixed(0).toString().length);
		var num = (val / ('1e'+(unit+2))).toFixed(3);
		var unitname = units[Math.floor(unit / 3) - 1];
		return num + '' + unitname;
	}
	var parts = val.toString().split(".")
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	return parts.join(".")
}

function addSpace(val){
  let valSentence = '';
  for(let i=0; i<val.length; i ++){
    valSentence += val[i]+"<br>";
  }
  return valSentence;
}

Number.prototype.commarize = commarize

