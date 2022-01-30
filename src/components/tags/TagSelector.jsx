/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CgClose } from 'react-icons/cg';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateCandidato, updateCandidatoTags } from '../../store/slices/candidatos';

const TagSelector = ({
  options, defaultSelectedTags, field, setSelectedTecnologias, candidatoId,
}) => {
  const [candidatoData, setCandidatoData] = useState(false);
  if (defaultSelectedTags) {
    defaultSelectedTags = defaultSelectedTags.map((option) => {
      return { value: option.id, label: option.nombre };
    });
  }
  const [selectedTags, setSelectedTags] = useState(defaultSelectedTags);
  const dispatch = useDispatch();

  // Method to format taglist to form data
  const arrayFormat = (array) => {
    const obj = array.reduce(
      (acc, cur) => (
        { ...acc, [cur.value]: {} }
      ), {},
    );
    return obj;
  };

  /* useEffect(() => {
    return () => {
      console.log('Tagsselector destroy');
      const data = {
        id: candidatoId,
        tecnologias: arrayFormat(selectedTags),
      };
      console.log('DATA');
      console.log(data);

      dispatch(updateCandidatoTags(data));
    };
  }, [defaultSelectedTags]); */

  // Generate options to Select component
  const selectOptions = options.map((option) => {
    return { value: option.id, label: option.nombre };
  });
  // Add tag list handler
  const handleTagsChange = (e) => {
    console.log(e);
    setSelectedTags(e);
    console.log('Handler');
    // Sending selected tags to parent component
    if (setSelectedTecnologias)setSelectedTecnologias(e);
    const data = {
      id: candidatoId,
      tecnologias: arrayFormat(e),
    };
    dispatch(updateCandidatoTags(data));
  };

  // Delete tag method
  const deleteTag = (value) => {
    const newState = selectedTags.filter((tag) => {
      return tag.value !== value;
    });
    setSelectedTags(newState);
    console.log(newState);
    const data = {
      id: candidatoId,
      tecnologias: arrayFormat(newState),
    };

    console.log(data);
    dispatch(updateCandidatoTags(data));

    // Sending selected tags to parent component
    if (setSelectedTecnologias)setSelectedTecnologias(newState);
  };
  return (
    <div className="col-12 mb-3 tag-selector">
      {selectOptions ? (
        <>
          <label htmlFor={field} className="form-label capitalize">{field}</label>
          <Select className="form-control" placeholder="Escribe para buscar...." name={field} isMulti options={selectOptions} value={selectedTags} onChange={handleTagsChange} classNamePrefix="tag-select" />
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
        </>
      ) : (
        null
      )}
    </div>
  );
};

TagSelector.propTypes = {
  options: PropTypes.array.isRequired,
  defaultSelectedTags: PropTypes.array,
  field: PropTypes.string,
  setSelectedTecnologias: PropTypes.func,
  candidatoId: PropTypes.number.isRequired,
};

TagSelector.defaultProps = {
  defaultSelectedTags: false,
  field: 'Unset',
  setSelectedTecnologias: null,
};

export default TagSelector;
