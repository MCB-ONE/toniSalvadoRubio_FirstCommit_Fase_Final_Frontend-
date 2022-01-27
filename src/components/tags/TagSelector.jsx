/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CgClose } from 'react-icons/cg';
import Select from 'react-select';

const TagSelector = ({ options, defaultSelectedTags }) => {
  // Generate curret candidato tecnologies
  const defaultSelectedOptions = defaultSelectedTags.map((defOp) => {
    return { value: defOp.id, label: defOp.nombre };
  });
  // Generate options to Select component
  const selectOptions = options.map((option) => {
    return { value: option.id, label: option.nombre };
  });
  const [selectedTags, setSelectedTags] = useState(defaultSelectedOptions);

  const handleTagsChange = (e) => {
    setSelectedTags(e);
  };
  const deleteTag = (value) => {
    const newState = selectedTags.filter((tag) => {
      return tag.value !== value;
    });
    setSelectedTags(newState);
  };
  return (
    <div className="col-12 mb-3 tag-selector">
      <label htmlFor="etiquetas" className="form-label">Tecnologías</label>
      <Select className="form-control" placeholder="Escribe para buscar...." name="etiquetas" isMulti options={selectOptions} value={selectedTags} onChange={handleTagsChange} classNamePrefix="tag-select" />
      {
            selectedTags === null ? ''
              : (
                <div id="tag-list" className="tag-list">
                  {selectedTags.map((t) => (
                    <span key={t.value}>
                      {t.label}
                      <CgClose onClick={() => deleteTag(t.value)} />
                    </span>
                  ))}
                </div>
              )
        }
    </div>
  );
};

TagSelector.propTypes = {
  options: PropTypes.array.isRequired,
  defaultSelectedTags: PropTypes.array.isRequired,
};

export default TagSelector;
