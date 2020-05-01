import React, { Component } from 'react'
import PageTitle from '../templates/pageTitle/PageTitle'
import Tab from '../templates/tab/Tab'

import AdminArticles from './AdminArticles'
import AdminCategories from './AdminCategories'
import AdminUsers from './AdminUsers'

import './AdminPage.css'

export default class AdminPage extends Component {

    constructor(props) {
        super(props)
        this.state = { activeContentId: '' }
    }

    render() {
        return (
            <div className="admin-page">
                <PageTitle title="Administração do Sistema" subTitle="Cadastros & Cia" icon="fa fa-cogs" />
                <div className="admin-page-tabs">
                    <Tab>
                        <Tab.Item id="1" active title="Artigos">
                            <AdminArticles />
                        </Tab.Item>
                        <Tab.Item id="2" title="Categorias">
                            <AdminCategories />
                        </Tab.Item>
                        <Tab.Item id="3" title="Usuários">
                            <AdminUsers />
                        </Tab.Item>
                    </Tab>
                </div>
            </div>
        )
    }
}
