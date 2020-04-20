import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import PageTitle from '../templates/pageTitle/PageTitle'
import AdminArticles from './AdminArticles'
import AdminCategories from './AdminCategories'
import AdminUsers from './AdminUsers'

import './AdminPage.css'

export default props => (
    <div className="admin-page">
        <PageTitle title="Administração do Sistema" subTitle="Cadastros & Cia" icon="fa fa-cogs" />
        <div className="admin-page-tabs">
            <Tabs defaultActiveKey="user">
                <Tab eventKey="articles" title="Artigos">
                    <AdminArticles />
                </Tab>

                <Tab eventKey="categories" title="Categorias">
                    <AdminCategories />
                </Tab>

                <Tab eventKey="user" title="Usuários">
                    <AdminUsers />
                </Tab>
            </Tabs>
        </div>
    </div>
)