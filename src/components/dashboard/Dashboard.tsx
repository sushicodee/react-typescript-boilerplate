import React, { Component } from 'react'
import {IRouter } from './../common/interfaces/routerInterface';
import { getItem } from 'components/utils/localStorage/LocalStorage';
import ProductForm from './product/product-form/ProductForm';
interface IProps {
    history:any;
    match:any;
    location:any;
}

interface IState {

}

export default class Dashboard extends Component<IProps,IState> {

    componentDidMount(){
        console.log(this.props.match.params.name,getItem('token'),getItem('user'))
    }
    render() {
        return (
            <div>
                hello from dash
            </div>
        )
    }
}
