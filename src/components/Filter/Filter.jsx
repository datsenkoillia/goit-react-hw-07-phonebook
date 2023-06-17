import { InputLabel, InputField } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import { filtered, selectFilter } from 'redux/contactsSlice';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const changeFilter = event => {
    dispatch(filtered(event.target.value));
  };

  return (
    <InputLabel>
      Find contacts by name
      <InputField type="text" value={filter} onChange={changeFilter} />
    </InputLabel>
  );
};
