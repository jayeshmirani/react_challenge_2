import React from 'react';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import CollectedTagList from './CollectedTagList';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: {
            video: null,
            tags: []
        }
    }
    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items
        })
        console.log("this is resp",response);
    };

    handleVideoSelect = (video) => {
        this.setState({
            selectedVideo:{
            video : video
        }
    })
        // console.log("video is ", video);
    }

    // called when Show Tags button is pressed
    handleShowTags = async (video) => {
        const response = await youtube.get('/videos', {
            params: {
                id: video.id.videoId
            }
        })

        // console.log("this is tags resp",response);
        // console.log(response.data.items[0].snippet.tags);

        this.setState( (prevState) => {
            return {
                ...prevState,
                selectedVideo:{
                    video: prevState.selectedVideo.video,
                    tags: response.data.items[0].snippet.tags 
                }
            } 
        });
    }

    // used to add tags to local storage
    handleTagSelect = (tagName) => {

        if (localStorage.getItem(tagName) === null) {
            localStorage.setItem(tagName, tagName); // as unique tags should be added, key is also assigned value of tag name
            console.log("item saved in local storage: key",tagName,"name", localStorage.getItem(tagName));
          }
        else{
            console.log("this tag is already saved");
        }


    }



    render() {
        return (
            <div className='ui container' style={{marginTop: '1em'}}>
                <SearchBar handleFormSubmit={this.handleSubmit}/>
                <div className='ui grid'>
                    <div className="ui row">
                        <div className="nine wide column">
                            <VideoDetail handleShowTags= {this.handleShowTags} selectedVideo={this.state.selectedVideo} handleTagSelect={this.handleTagSelect} />
                        </div>
                        <div className="three wide column">
                            <h3>Collected Tags</h3>
                            <CollectedTagList />
                        </div>
                        <div className="four wide column">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;