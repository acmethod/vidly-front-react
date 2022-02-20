import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { deleteMovie, getMovies } from "../services/movieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 5,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchValue: "",
  };

  async componentDidMount() {
    const { data: apiGenres } = await getGenres();

    const genres = [{ _id: "", name: "All Genres" }, ...apiGenres];

    const { data: apiMovies } = await getMovies();

    this.setState({
      movies: apiMovies,
      genres: genres,
      selectedGenre: genres[0],
    });
  }

  handleDeleteMovie = async (movie) => {
    const originalMovies = this.state.movies;

    const updatedMovies = originalMovies.filter((m) => m._id !== movie._id);

    this.setState({ movies: updatedMovies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      this.setState({ movies: originalMovies });
    }
  };

  handleLikeClick = (movie) => {
    const newMovies = [...this.state.movies];
    const i = newMovies.indexOf(movie);
    newMovies[i] = { ...newMovies[i] };
    newMovies[i].liked = !newMovies[i].liked;
    this.setState({ movies: newMovies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchValue: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };

  handleNewClick = () => {
    this.props.navigate("/movies/new");
  };

  handleSearchChange = (searchValue) => {
    this.setState({
      searchValue: searchValue,
      selectedGenre: null,
      currentpage: 1,
    });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies,
      selectedGenre,
      sortColumn,
      searchValue,
    } = this.state;

    let filtered = movies;

    if (searchValue)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const moviesOnPage = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: moviesOnPage };
  };

  render() {
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } =
      this.state;

    const { data, totalCount } = this.getPageData();

    const { user } = this.props;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <div className="mb-2">
              <button className="btn btn-primary" onClick={this.handleNewClick}>
                New Movie
              </button>
            </div>
          )}
          <span>There are {totalCount} movies in the database </span>
          <div className="mb-2 mt-2">
            <SearchBox
              name="searchBox"
              value={this.state.searchValue}
              label="Search..."
              onChange={this.handleSearchChange}
            />
          </div>
          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onLike={this.handleLikeClick}
            onDelete={this.handleDeleteMovie}
            onSort={this.handleSort}
          ></MoviesTable>
          <Pagination
            totalItems={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

function WithProps(props) {
  return <Movies {...props} navigate={useNavigate()} />;
}

export default WithProps;
