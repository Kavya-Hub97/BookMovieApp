import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom"


const cssStyles = theme => ({
    upcomingMoviesHeader: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    title: {
        color: theme.palette.primary.light,
      },
    gridListForUpcomingMovies:{
        flexWrap: 'nowrap',
        width: '100%'
    },
    gridList:{
        flexGrow: 1,
        cursor: 'pointer'
    },
    formControl: {

        margin: theme.spacing.unit,
        minWidth: 200,
      },
      root: {
        flexGrow: 1,
        background: theme.palette.background.paper
      },
});


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: "",
            upcomingMovies: [{}],
            releasedMovies: [{}],

            genresList: [{}],
            genres: [],

            artists: [],
            artistsList: [{}],

            releasingDateStart: "",
            releasingDateEnd: ""
        }
                this.movieSelectHandler = this.movieSelectHandler.bind(this);


    }
    movieSelectHandler = (movieId) => {
        this.props.history.push('/movie/' + movieId)
    }
    movieNameHandler = event => {
        this.setState({ movieName: event.target.value });
      }
    selectGenreHandler = event => {
        this.setState({ genres: event.target.value });
      }
    selectArtistsHandler= event =>{
        this.setState({ artists: event.target.value });
      }
    releaseDateStartHandler = event => {
        this.setState({ releasingDateStart: event.target.value });
      }
    
    releaseDateEndHandler = event => {
        this.setState({ releasingDateEnd: event.target.value });
      }
    applyChangeHandler = () => {
        let lineString = "?status=RELEASED";
        if (this.state.movieName !== "") {
            lineString += "&title=" + this.state.movieName;
        }
        if (this.state.genres.length > 0) {
            lineString += "&genre=" + this.state.genres.toString();
        }
        if (this.state.artists.length > 0) {
            lineString += "&artists=" + this.state.artists.toString();
        }
        if (this.state.releasingDateStart !== "") {
            lineString += "&start_date=" + this.state.releasingDateStart;
        }
        if (this.state.releasingDateEnd !== "") {
            lineString += "&end_date=" + this.state.releasingDateEnd;
        }
        let that = this;
        let apply = null;
        let xhttpFilter = new XMLHttpRequest();
        xhttpFilter.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
            that.setState({ releasedMovies: JSON.parse(this.responseText).movies });
        }
        }
        xhttpFilter.open("GET", this.props.baseUrl + "movies" + encodeURI(lineString));
        xhttpFilter.setRequestHeader("Cache-Control", "no-cache");
        xhttpFilter.send(apply);
      }
    UNSAFE_componentWillMount() {
        let that = this;
        let newMovies = null;
        let xhttpNew = new XMLHttpRequest();
        
        xhttpNew.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
            that.setState({ upcomingMovies: JSON.parse(this.responseText).movies });
          }
        }
        xhttpNew.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        xhttpNew.setRequestHeader("Cache-Control", "no-cache");
        xhttpNew.send(newMovies);

        let releasedMovie = null;
        let xhttpReleased = new XMLHttpRequest();
        xhttpReleased.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
            that.setState({ releasedMovies: JSON.parse(this.responseText).movies });
          }
        }
        xhttpReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        xhttpReleased.setRequestHeader("Cache-Control", "no-cache");
        xhttpReleased.send(releasedMovie);

        let genres = null;
        let xhttpGenres = new XMLHttpRequest();
        xhttpGenres.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
            that.setState({ genresList: JSON.parse(this.responseText).genres });
         }
        }
        xhttpGenres.open("GET", this.props.baseUrl + "genres");
        xhttpGenres.setRequestHeader("Cache-Control", "no-cache");
        xhttpGenres.send(genres);

        let artists = null;
        let xhttpArtists = new XMLHttpRequest();
        xhttpArtists.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
            that.setState({ artistsList: JSON.parse(this.responseText).artists });
        }
        }
        xhttpArtists.open("GET", this.props.baseUrl + "artists");
        xhttpArtists.setRequestHeader("Cache-Control", "no-cache");
        xhttpArtists.send(artists);

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header urlLink={this.props.baseUrl} showBookShowButton="false" />
                <div className={classes.upcomingMoviesHeader}>
                    <span> Upcoming Movies </span>
                </div>
                <GridList cols={6} className={classes.gridListForUpcomingMovies}>
                    {this.state.upcomingMovies.map(movie => (
                    <GridListTile key={"upcomingMovie" + movie.id}>
                    <img src={movie.poster_url} alt={movie.title} />
                    <GridListTileBar title={movie.title}></GridListTileBar>
                </GridListTile>
                ))}
                </GridList>
                <div className="flex-container">
                    <div className="alignLeft_flexBox">
                        <GridList cols={4} className={classes.gridList}>
                            {this.state.releasedMovies.map(movie => (
                                    <GridListTile  className="gridTile" key={"grid" + movie.id}>
                                    <img src={movie.poster_url} alt={movie.title} onClick={() => this.movieSelectHandler(movie.id)} />
                                        <GridListTileBar
                                            title={movie.title}
                                            subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                        />  
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    <div className="alignRight_flexBox">
                    <Card>
                        <CardContent>
                            <FormControl className={classes.formControl}>
                                <Typography className={classes.title} color="textSecondary">
                                    FIND MOVIES BY
                                </Typography>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="movieName"> Movie Name </InputLabel>
                                <Input id="movieName" onChange={this.movieNameHandler}> </Input>
                            </FormControl>
                            <br/>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="checkbox"> Genres </InputLabel>
                                <Select multiple input={<Input id="checkbox" />} renderValue={selected => selected.join(',')} value={this.state.genres} onChange={this.selectGenreHandler}>
                                    <MenuItem value="0"> None </MenuItem>
                                    {this.state.genresList.map(genre => (
                                        <MenuItem key={"genre" + genre.id} value={genre.genre}>
                                            <Checkbox checked={this.state.genres.indexOf(genre.genre) > - 1} />
                                                <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br/>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="checkbox"> Artists </InputLabel>
                                <Select multiple input={<Input id="checkbox" />} renderValue={selected => selected.join(',')} value={this.state.artists} onChange={this.selectArtistsHandler}>
                                {this.state.artistsList.map(artist => (
                                    <MenuItem key={"artist" + artist.id} value={artist.first_name + " " + artist.last_name}>
                                        <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > - 1} />
                                        <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            
                            <FormControl className={classes.formControl}>
                                <TextField id="releasingDateStart" label="Release Date Start" type="date" defaultValue="" InputLabelProps={{ shrink: true }} onChange={this.releaseDateStartHandler}/>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                            <TextField id="releasingDateEnd" label="Release Date End" type="date" defaultValue="" InputLabelProps={{ shrink: true }} onChange={this.releaseDateEndHandler}/>
                            </FormControl><br /><br />
                            <FormControl className={classes.formControl}>
                                <Button onClick={() => this.applyChangeHandler()} variant="contained" color="primary">
                                        APPLY 
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                    </div>
                 </div>   
            </div>
        )
    }
}

export default (withStyles(cssStyles)(withRouter(Home)));
