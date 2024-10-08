class Theatre {

    constructor(id, name, city) {
        this.id = id
        this.name = name
        this.city = city
        this.screens = []
        this.shows = []
    }

    addScreen(screen){
        this.screens.push(screen)
    }

    addShow(show){
        this.shows.push(show)
    }

    getShowsForMovie(movie){
        return this.shows.filter(show => show.movie.id == movie.id)
    }
}

module.exports = Theatre
