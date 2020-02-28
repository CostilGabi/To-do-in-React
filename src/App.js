import React from 'react';
import './assets/sass/style.scss';

class App extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            newItem: "",
            list: []
        };

    }

    componentDidMount() {

        this.hydrateStateWithLocalStorage();

        window.addEventListener(

            "beforeunload",
            this.saveStateToLocalStorage.bind(this)

        );



    }

    componentWillUnmount() {

    window.removeEventListener(

        "beforeunload",
        this.saveStateToLocalStorage.bind(this)

    );

    this.saveStateToLocalStorage();

    }

    hydrateStateWithLocalStorage() {

    for (let key in this.state) {

        if (localStorage.hasOwnProperty(key)) {

        let value = localStorage.getItem(key);

        try {

            value = JSON.parse(value);
            this.setState({ [key]: value });

        } catch (e) {

            this.setState({ [key]: value });

        }

        }

    }

    }

    saveStateToLocalStorage() {

    for (let key in this.state) {

        localStorage.setItem(key, JSON.stringify(this.state[key]));

    }

    }

    updateInput( key, value ) {

        this.setState({ [key]: value });

    }

    addItem() {

        const newItem = {

            id: 1 + Math.random(),
            value: this.state.newItem.slice()

        };

        const list = [...this.state.list];

        list.push(newItem);

        this.setState( {
            list,
            newItem: ""
        });

    }

    deleteItem(id) {

        const list = [...this.state.list];

        const updatedList = list.filter( item => item.id !== id );

        this.setState( { list: updatedList } );

    }

    addItemWKey = (e) => {

        if (e.key === 'Enter') {

             this.addItem()

        }
    }

    resetItem() {

        this.setState( {

            list:[]

        });

    }



    render() {

        return (

            <div className="container">

                <div className="mainapp">

                    <div className="mainapp__add-task">

                        <input
                            type="text"
                            placeholder="Add your to-do..."
                            value={this.state.newItem}
                            onKeyDown={this.addItemWKey}
                            onChange={ e => this.updateInput( "newItem", e.target.value ) }
                        />

                        <button
                        className="tsk-btn"
                        onClick={() => this.addItem()}
                        disabled={!this.state.newItem.length}
                        >
                            Add task
                        </button>

                    </div>

                    <div className="mainapp__todos">

                        <a className="reset" onClick={() => this.resetItem()}>Reset tasks</a>

                        <ul>

                            {this.state.list.map( item => {

                                return (

                                    <li
                                     key={item.id}
                                    >
                                        {item.value}

                                        <button className="delete" onClick={() => this.deleteItem(item.id)}>Done &#10003;</button>

                                    </li>

                                );

                            })}

                        </ul>

                    </div>

                </div>

                <footer>&copy; All copyright reserved. Made by <a href="http://www.costil.space/" target="blank">Costil Gabi</a></footer>

            </div>

        );

    }

}

export default App;
