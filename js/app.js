const apiURL = "https://artists-men-restful-api.herokuapp.com/api/artists";

const getArtists = async () => {
  
  const res = await fetch(apiURL);
  const artists = await res.json();

  var content = document.querySelector("#content");

  for (var i=0; i<artists.length; i += 1) {
      var card = '<div class="card"><img class="card-img-top" src="';
      card += artists[i].photo;
      card += '"alt="Image of ';
      card+= artists[i].name+'"Card image cap"><div class="card-body"><h3 class="card-title">';
      card += artists[i].name;
      card += '</h3><span class="card-text">';
      card += '<h5><i>'+artists[i].genre+'</i> · '+commarize(artists[i].listeners)+' Listeners</h5>';
      card +=  '<p class="artist-info">'+artists[i].info+'</p>';
      card += '<h5>Albums</h5><p class="artist-albums">'+addSpace(artists[i].albums)+'</p>';
      card += '<h5>Top tracks</h5><p class="top-tracks">'+addSpace(artists[i].top_tracks)+'</p>';
      card += '<h5>Similar Artists</h5><p class="top-tracks">'+addSpace(artists[i].similar_to)+'</p>';
      card += '</span></div></div>'; //card body end
      content.innerHTML+=card;
  }

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

