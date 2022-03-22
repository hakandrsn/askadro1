import React from 'react'

const Search = ({data,words}) => {
    const searchString = words
    const filteredCharacters = data.filter((character)=>{
        return(
            character.firstName.includes(searchString) ||
            character.lastName.includes(searchString) ||
            character.companyName.includes(searchString) 
        )
    })
  return (
    <div>Search</div>
  )
}

export default Search