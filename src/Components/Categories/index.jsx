import { useSelector, useDispatch } from 'react-redux';
import { changeCategory } from '../../store/products';
import "./Categories.scss"
import Button from '@mui/material/Button';


function Categories() {

  const currentCategory = useSelector((state) => state.categoriesReducer.currentCategory)
  const dispatch = useDispatch();

  return (
    <>
      <h2 style={{paddingTop: '90px', margin: 0}}>
        Browse our Categories
      </h2>
      <hr />
      <Button style={{fontSize:'20px'}} onClick={() => (dispatch(changeCategory('electronics')))}>Electronics</Button><span> | </span> 
      <Button style={{fontSize:'20px'}} onClick={() => (dispatch(changeCategory('food')))}>Food</Button>
      <div className="categories-title">
        <h1>{currentCategory.title}</h1>
        <h2>{currentCategory.description}</h2>
      </div>

    </>
  );
}

export default Categories;