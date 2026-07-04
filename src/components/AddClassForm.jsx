import React from 'react';

const AddClassForm = ({ fields, buttonText }) => {
  // Allowed input types whitelist to prevent prototype pollution or unauthorized input injections
  const allowedInputTypes = ['text', 'number', 'email', 'password', 'date', 'tel', 'url'];

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {Array.isArray(fields) && fields.map((element, index) => {
        // Case 1: It's a row containing multiple fields (nested grid)
        if (element.type === 'row' && Array.isArray(element.fields)) {
          const rowStyles = element.gridTemplate 
            ? { gridTemplateColumns: element.gridTemplate } 
            : {};
            
          return (
            <div className="form-row" style={rowStyles} key={`row-${index}`}>
              {element.fields.map((subField, subIndex) => {
                const targetType = allowedInputTypes.includes(subField.type) ? subField.type : 'text';
                return (
                  <div className="form-group" key={`sub-${subIndex}`}>
                    <label>
                      {subField.required && <span className="required-star"></span>}
                      {subField.label}
                    </label>
                    
                    {subField.type === 'select' && Array.isArray(subField.options) ? (
                      <select defaultValue="">
                        {subField.options.map((opt, oIdx) => (
                          <option key={`opt-${oIdx}`} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input type={targetType} placeholder={subField.placeholder} />
                    )}
                  </div>
                );
              })}
            </div>
          );
        }

        // Case 2: It's a single, standalone field (like a full-width textarea or input)
        const fieldType = allowedInputTypes.includes(element.type) ? element.type : 'text';
        return (
          <div 
            className="form-group" 
            style={element.marginTop ? { marginTop: element.marginTop } : {}} 
            key={`field-${index}`}
          >
            <label>
              {element.required && <span className="required-star"></span>}
              {element.label}
            </label>
            
            {element.type === 'textarea' ? (
              <textarea rows={element.rows || 3} placeholder={element.placeholder}></textarea>
            ) : element.type === 'select' && Array.isArray(element.options) ? (
              <select defaultValue="">
                {element.options.map((opt, oIdx) => (
                  <option key={`opt-single-${oIdx}`} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input type={fieldType} placeholder={element.placeholder} />
            )}
          </div>
        );
      })}

      <button 
        type="submit"
        className="btn-add" 
        style={{ width: '100%', justifyContent: 'center', marginTop: '2rem' }}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AddClassForm;