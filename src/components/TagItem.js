// used to get all tags for a specific video

import React from 'react';

const TagItem = ({tagName, handleTagSelect}) => {
    return (
        <div className="item">
        <button className="small ui button" onClick={ () => handleTagSelect(tagName)} >{tagName} +</button>
        
        </div>
    )
};
export default TagItem;