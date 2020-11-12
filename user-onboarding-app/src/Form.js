import React from 'react';

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    };

    const onChange = (evt) => {
        const { name, value, checked, type,} = evt.target;
        const checkboxValue = type === 'checkbox' ? checked : value;
        change(name, checkboxValue);   
    }

    return (
     <form className="form container" onSubmit={onSubmit}>
      <div className="form-group submit">
        <h2>New User</h2>

        <div className="errors">
          <div>{errors.username}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
        </div>
     </div>
        <div className='form-group inputs'>
            <h4>General Information</h4>
            <label>
                Username&nbsp;
                <input
                    value={values.username}
                    onChange={onChange}
                    name="username"
                    type="text"
                />
            </label>
            <label>
                Email
                <input
                    value={values.email}
                    onChange={onChange}
                    name="email"
                    type="text"
                />
            </label>
            <label>
                Password
                <input
                    value={values.password} 
                    onChange={onChange}
                    name='password'
                    type='text'
                />
            </label>
        </div>
        <div className="form-group checkboxes">
            <label>
                Terms of Service
                <input
                    type="checkbox"
                    name="terms"
                    checked={values.terms}
                    onChange={onChange}
                />
            </label>
        </div>
        <div className='button-group'>
        <button disabled={disabled}>submit</button>
        </div>
    </form>
     );
}