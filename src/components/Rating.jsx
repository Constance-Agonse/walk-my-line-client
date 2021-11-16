import React, { Component } from 'react'

export default class Rating extends Component {
    render() {
        return (
            <div>
                {"★".repeat(Math.round(Number(this.props.children))).padEnd(5,"☆")}
            </div>
        )
    }
}