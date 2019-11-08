$(document).ready(() => {
    $('#searchForm').on('submit',(e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault(); //stop the form  from actully submit file
    });
    function getMovies(searchText){ //make a request to API
        axios.get('http://www.omdbapi.com/?s='+ searchText +'&apikey=6ba89024')
         .then((response) => {
             let movies = response.data.Search;
             let output = '';
             $.each(movies,(index,movie) => {
                 output += `
                 <div class="col-md-3:>
                    <div class="well text-center" style="margin:15px">
                        <img src="${movie.Poster}">
                        <h5 style="width:300px">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">
                        Movie Details</a>
                    </div>                
                 </div>
                 `
             })
             $('#movies').html(output);
         })
         .catch((err) =>{
             console.log(err);
         });
     }

})

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?i='+ movieId +'&apikey=6ba89024')
         .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>類型:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>上映時間:</strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>電影分級:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB評分:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>導演:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>編劇:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>演員:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>情節:</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">
                        查看更多細節</a>
                        <a href="index.html" class="btn btn-default">回到搜尋</a>
                    </div>
                </div>
            `
            $('#movies').html(output);
         })
         .catch((err) =>{
             console.log(err);
         });
}