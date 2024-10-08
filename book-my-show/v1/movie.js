class Movie {
    constructor(id, title, duration, genre, language, ratings) {
        this.id = id
        this.title = title
        this.duration = duration
        this.genre = genre
        this.language = language
        this.ratings = ratings
        this.shows = []
    }

    addShow(show){
        this.shows.push(show)
    }

    getShows(){
        return this.shows
    }

}

module.exports = Movie
