import { useSelector, useDispatch } from 'react-redux';
import { changeCategory } from '../../store/products';
import { changeCategoryHeading } from '../../store/categories'
import "./Categories.scss"
import Button from '@mui/material/Button';


function Categories() {

  const currentCategory = useSelector((state) => state.categoriesReducer.currentCategory)
  const dispatch = useDispatch();

  function setNewCategory(product){

    dispatch(changeCategoryHeading(product));
    dispatch(changeCategory(product));
  }

  return (
    <>
      <h2 style={{paddingTop: '90px', margin: 0}}>
        Browse our Categories
      </h2>
      <hr />
      <Button style={{fontSize:'20px'}} onClick={() => (setNewCategory('electronics'))}>Electronics</Button><span> | </span> 
      <Button style={{fontSize:'20px'}} onClick={() => (setNewCategory('food'))}>Food</Button>
      <div className="categories-title">
        <h1>{currentCategory.title}</h1>
        <h2>{currentCategory.description}</h2>
      </div>

    </>
  );
}

export default Categories;