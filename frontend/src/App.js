import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            gitInfo:null
        }
    }
    componentDidMount() {
        fetch('api/group')
            .then(res=>res.json())
            .then(data=>this.setState({username:data.username}));
        /*
        const {response} = fetch('https://api.github.com',{
            method : 'GET'
        })
        const {result} = {response}.json();
        console.log({result});
        */
    }

    render() {
        const {username} = this.state;
        const {gitInfo} = this.state;
        return (
            <div className={"App"}>
                <button onClick={() => {
                    fetch('https://api.github.com')
                        .then(res=>res.json())
                        .then(json => console.log(json));
                }}>btn 1</button>
                <header className={"App-header"}>
                    {/*{username ? `Hello ${username}` : 'Hello World'}<br/>*/}
                    {gitInfo ? `${gitInfo}` : 'plz click btn'}
                </header>
            </div>
        )
    }
}

export default App;
