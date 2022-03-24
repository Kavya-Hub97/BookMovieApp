import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Details.css';
import Typography from '@material-ui/core/Typography';
import {Link, withRouter} from 'react-router-dom';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                genres: [],
                trailer_url: "",
                artists: []
            },
            icons: [{
                id: 1,
                stateId: "star1",
                color: "black"
            },
                {
                    id: 2,
                    stateId: "star2",
                    color: "black"
                },
                {
                    id: 3,
                    stateId: "star3",
                    color: "black"
                },
                {
                    id: 4,
                    stateId: "star4",
                    color: "black"
                },
                {
                    id: 5,
                    stateId: "star5",
                    color: "black"
                }]
        }

    }

    starHandler = (id) => {
        var iconList = [];
        for (let star of this.state.icons) {
            let rateColor = star;
            if (star.id <= id) {
                rateColor.color = "yellow";
            } else {
                rateColor.color = "black";
            }
            iconList.push(rateColor);
        }
        this.setState({icons: iconList});
    }
    selectArtistsHandler = (url) => {
        window.location = url;
    }

    UNSAFE_componentWillMount() {
        let that = this;
        let movieDetails = null;
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                that.setState({movie: JSON.parse(this.responseText)});
            }
        }

        xhttp.open("GET", this.props.baseUrl + "movies/" + this.props.match.params.id);
        xhttp.setRequestHeader("Cache-Control", "no-cache");
        xhttp.send(movieDetails);

    }
        render()
        {
            let movie = this.state.movie;
            const youtubeOpts = {
                height: '300',
                width: '700',
                playerVars: {
                    autoplay: 1
                }
            }
            return (
                <div className="details">
                    <Header id={this.props.match.params.id} urlLink={this.props.baseUrl} showBookShowButton="true"/>
                    <div className="back_Button">
                        <Typography>
                            <Link to="/">  &#60; Back to Home</Link>
                        </Typography>
                    </div>
                    <div className="flex-container">
                        <div className="left">
                            <img src={movie.poster_url} alt={movie.title}/>
                        </div>
                        <div className="middle">
                            <Typography variant="headline" component="h2">{movie.title}</Typography>


                        <div>
                            <Typography nowrap><span text="bold" className="type">Genre: </span>{this.state.movie.genres.join(', ')}
                            </Typography>
                        </div>

                        <div>
                            <Typography nowrap><span text="bold" className="type">Duration:</span>{this.state.movie.duration}</Typography>
                        </div>

                        <div>
                            <Typography><span text="bold" className="type">Release Date:</span>{new Date(this.state.movie.release_date).toDateString()}
                            </Typography>
                        </div>

                        <div>
                            <Typography><span text="bold" className="type">Rating:</span>{this.state.movie.critics_rating}
                            </Typography>
                        </div>

                        <div className="plotMargin">
                            <Typography><span text="bold" className="type">Plot:</span> <a
                                href={this.state.movie.wiki_url}>(Wiki Link)</a></Typography><br /><br />
                        </div>
                        <div className="trailer">
                            <Typography><span text="bold" className="type">Trailer:</span></Typography>
                            <YouTube videoId={movie.trailer_url.split("?v=")[1]} opts={youtubeOpts}/><br /><br />
                        </div>
                        </div>
                        <div className="right">
                            <Typography> <span className="bold">Rate this movie: </span></Typography>
                            {this.state.icons.map(star => (
                                <StarBorderIcon className={star.color} key={"star" + star.id}
                                                onClick={() => this.starHandler(star.id)}/>
                            ))}
                            <div className="bold bottomMargin plotMargin"><Typography><span
                                className="bold">Artists:</span></Typography></div>
                            <GridList rowHeight={160} column={2}>
                                {this.state.movie.artists.map(artist => (
                                    <GridListTile className="gridTile"
                                                  onClick={() => this.selectArtistsHandler(artist.wiki_url)}
                                                  key={artist.id}>
                                        <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name}/>
                                        <GridListTileBar title={artist.first_name + " " + artist.last_name}/>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>

                    </div>
                </div>

            );
        }
}
export default (withRouter(Details));