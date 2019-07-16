import React from 'react'
import './card.css'
import Modal from '../modal'

class Card extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            isLoaded: false,
            isShowing: false,
            description: '',
            startOffset: 0,
            limit: 30,
            documentHeight: 0,
            search: ''
        }
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) })
    }

    componentDidMount() {
        const pokemonDetail = this.state.items.slice();

        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${this.state.startOffset}&limit=${this.state.limit}`)
            .then(res => res.json())

            .then(json => {
                json.results.map(pokemon =>
                    fetch(pokemon.url)
                        .then(res => res.json())
                        .then(json => {
                            pokemonDetail.push(json);

                            this.setState({
                                items: pokemonDetail,
                                isLoaded: true
                            })
                        })
                )
            })

        window.addEventListener('scroll', this.onScrollWindow);
    }

    onScrollWindow = (e) => {
        const doc = document.documentElement
        const clientHeight = doc.clientHeight;
        const documentHeight = doc.getBoundingClientRect().height;

        if (window.scrollY === documentHeight - clientHeight) {
            const offset = this.state.startOffset + this.state.limit;

            const pokemonDetail = this.state.items.slice();

            fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${this.state.limit}`)
                .then(res => res.json())

                .then(json => {
                    json.results.map(pokemon =>
                        fetch(pokemon.url)
                            .then(res => res.json())
                            .then(json => {
                                pokemonDetail.push(json);

                                this.setState({
                                    items: pokemonDetail,
                                    isLoaded: true
                                })
                            })
                    )
                })

            this.setState((prevState) => ({
                ...prevState,
                startOffset: offset
            }));
        }
    }

    openModalHandler = (item) => {
        fetch(item.location_area_encounters)
            .then(res => res.json())

            .then(json => {
                this.setState({
                    isShowing: true,
                    description: json
                })
            })
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false,
            description: ''
        })
    }

    render() {
        var { isLoaded, items } = this.state
        let filteredItems = items.filter((item) => {
            return item.name.toLowerCase().indexOf(this.state.search) !== -1
        })
        if (!isLoaded) {
            return <div className="loading"> Loading . . . </div>
        }
        else {
            return (
                <div>
                    <div className="search-bar-align">
                        <input
                            type="text"
                            value={this.state.search}
                            placeholder="Search pokemon name . . ."
                            onChange={this.updateSearch.bind(this)}
                            className="search-bar"
                        />
                    </div>
                    <div className="base-layout">
                        {filteredItems.map(item => (
                            <div className="content-box" key={item.id}>
                                <div className="content">
                                    <img
                                        alt='pokemon-sprites'
                                        src={item.sprites.front_default}
                                    />
                                </div>
                                <div className="text-align">
                                    <p className="title"> {item.name} </p>
                                    <p> Height : {item.height} </p>
                                    <p> Weight : {item.weight} </p>
                                </div>
                                <div>

                                    <div className="button-align">
                                        {this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null}

                                        <button
                                            className="open-modal-btn"
                                            onClick={() => this.openModalHandler(item)}
                                        >
                                            Area Location
                                    </button>
                                    </div>

                                </div>
                            </div>

                        ))}

                        <Modal
                            className="modal"
                            show={Boolean(this.state.description)}
                            close={this.closeModalHandler}>
                            {this.state.description.length > 0 ? this.state.description.map((data, index) => {
                                return (
                                    <ul key={`${index}-${data.location_area.name}`}>
                                        <li className="list-align">{data.location_area.name.replace(/[-]/g, ' ')}</li>
                                    </ul>
                                )
                            }) : 'No information provided'}
                        </Modal>
                    </div>
                </div>
            )
        }

    }
}

export default Card