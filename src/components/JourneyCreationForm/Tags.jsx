import React, { useState } from 'react';
import { TextField, Button, Chip } from '@mui/material';

export const Tags = ({ onChange }) => {
  const [text, setText] = useState();
  const [tags, setTags] = useState([]);

  return (
    <div className="Tags">
      <div className="Tags__top">
        <TextField
          fullWidth
          label="Tag"
          size="small"
          placeholder="Add tag here"
          variant="standard"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button onClick={() => {
          if (text !== '') {
            onChange([...tags, text]);
            setTags([...tags, text]);
            setText(undefined);
          }
        }}>
          Add tag
        </Button>
      </div>
      <div className="Tags__bottom">
        {tags.map((tag) => (<Chip variant="outlined" label={tag} />))}
      </div>
    </div>
  )
}