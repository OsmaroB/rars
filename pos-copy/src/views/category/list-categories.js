import React,{ useEffect } from 'react';
import { 
  Row,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import FrmCategory from 'containers/forms/FrmCategory';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { GET_CATEGORY } from '../../redux/contants';

const ListCategories = () => {

    const categories = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_CATEGORY});
    },[])
    
    function List(){
        if(categories.payload !== undefined){
            const categoriesData = [];
            categories.payload.map((category)=>{
                categoriesData.push(category);
            })
            const categoryListOrder = categoriesData.sort(function(a, b) {
                let nameA = a.position;
                let nameB = b.position;
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
            });
            const categorieList = categoryListOrder.map((item, index)=>{
                return(
                    <>
                        <FrmCategory 
                            category={{...item, collapse:false}} 
                            key={item.id}
                            index={index+1}
                        />
                    </>
                )
            });
            return categorieList;
        }
        return(
            <>No Hay una lista</>
        )
    }
    return (
        <>
            <Row>
                <Colxx xxs="12">
                    <List />
                </Colxx>
            </Row>      
        </>
    );
};

export default ListCategories;