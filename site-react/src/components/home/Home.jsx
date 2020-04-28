import React, { Component } from 'react'
import axios from 'axios'

import PageTitle from '../templates/pageTitle/PageTitle'
import Stat from './Stat'
import { baseUrl } from '../../global'

import './Home.css'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: 0,
            categories: 0,
            articles: 0
        }
    }
    componentDidMount() {
        axios
            .get(`${baseUrl}/stats`)
            .then(res => {
                this.setState({
                    users: res.data.users,
                    categories: res.data.categories,
                    articles: res.data.articles
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="home">
                <PageTitle title="Dashboard" subTitle="Base de Conhecimento" icon="fa fa-home" />
                <div className="stats">
                    <Stat title="Categorias" total={this.state.categories} icon="fa fa-folder" iconStyle={{ color: "rgb(213, 77, 80)" }} />
                    <Stat title="Artigos" total={this.state.articles} icon="fa fa-file" iconStyle={{ color: "rgb(59, 196, 128)" }} />
                    <Stat title="Usuários" total={this.state.users} icon="fa fa-users" iconStyle={{ color: "rgb(50, 130, 205)" }} />
                </div>
            </div>
        )
    }
}