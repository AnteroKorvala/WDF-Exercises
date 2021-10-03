import React from 'react'
import NewsListItem from './newsListItem'
import './../mostRead.css'

export default function MostRead() {
    return (
        <div className="styleOfThePopular">
            <h2>Luetuimmat</h2>
            <hr></hr>
            <ol>
            <NewsListItem text="Hieno uutinen 1"/>
            <NewsListItem text="Hieno uutinen 2"/>
            <NewsListItem text="Hieno uutinen 3"/>
            <NewsListItem text="Hieno uutinen 4"/>
            <NewsListItem text="Hieno uutinen 5"/>
            <NewsListItem text="Hieno uutinen 6"/>
         </ol>
        </div>
    )
}
